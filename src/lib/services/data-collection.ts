import { Database } from '../types/database';
import { createClient } from '@supabase/supabase-js';

type Founder = Database['public']['Tables']['founders']['Row'];
type Startup = Database['public']['Tables']['startups']['Row'];
type FounderStartup = Database['public']['Tables']['founder_startups']['Row'];
type DiversityMetrics = Database['public']['Tables']['diversity_metrics']['Row'];
type Tag = Database['public']['Tables']['tags']['Row'];
type FounderTag = Database['public']['Tables']['founder_tags']['Row'];

interface FounderDiscoveryResult {
  name: string;
  role: string;
  company: string;
  location: string;
  description: string;
  linkedinUrl?: string;
  confidence: number;
}

export class DataCollectionService {
  private supabase;
  private perplexityApiKey: string;

  constructor(supabaseUrl: string, supabaseKey: string, perplexityApiKey: string) {
    this.supabase = createClient<Database>(supabaseUrl, supabaseKey);
    this.perplexityApiKey = perplexityApiKey;
  }

  async discoverFounders(criteria: {
    location?: string;
    industry?: string;
    stage?: string;
    diversity?: string[];
  }): Promise<FounderDiscoveryResult[]> {
    const query = this.buildDiscoveryQuery(criteria);
    
    try {
      const response = await fetch('https://api.perplexity.ai/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.perplexityApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'sonar-pro',
          messages: [{ 
            role: 'user', 
            content: query 
          }],
          search_domain_filter: ['linkedin.com', 'crunchbase.com', 'startupdaily.net', 'startupaus.org'],
          max_citations: 15
        })
      });

      const data = await response.json();
      return this.parseDiscoveryResults(data);
    } catch (error) {
      console.error('Error discovering founders:', error);
      throw error;
    }
  }

  private buildDiscoveryQuery(criteria: {
    location?: string;
    industry?: string;
    stage?: string;
    diversity?: string[];
  }): string {
    let query = 'Find Australian startup founders who are ';

    if (criteria.diversity && criteria.diversity.length > 0) {
      query += criteria.diversity.join(' or ') + ' ';
    }

    if (criteria.industry) {
      query += `in the ${criteria.industry} industry `;
    }

    if (criteria.stage) {
      query += `at ${criteria.stage} stage `;
    }

    if (criteria.location) {
      query += `based in ${criteria.location} `;
    }

    query += '. For each founder, provide: their full name, current role, company name, location, brief description of their work, and LinkedIn URL if available. Format the response as a JSON array of objects with these fields: name, role, company, location, description, linkedinUrl, confidence (0-1).';

    return query;
  }

  private parseDiscoveryResults(perplexityResponse: any): FounderDiscoveryResult[] {
    try {
      const content = perplexityResponse.choices[0].message.content;
      // Extract JSON array from the response
      const jsonMatch = content.match(/\[\s*\{.*\}\s*\]/s);
      if (!jsonMatch) {
        throw new Error('No valid JSON found in response');
      }
      return JSON.parse(jsonMatch[0]);
    } catch (error) {
      console.error('Error parsing discovery results:', error);
      throw error;
    }
  }

  async enrichFounderProfile(founderData: Partial<Founder>): Promise<Founder> {
    if (!founderData.first_name || !founderData.last_name) {
      throw new Error('Founder name is required for enrichment');
    }

    const query = `Research ${founderData.first_name} ${founderData.last_name} entrepreneur Australia startup background projects`;
    
    try {
      const response = await fetch('https://api.perplexity.ai/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.perplexityApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'sonar-pro',
          messages: [{ role: 'user', content: query }],
          search_domain_filter: ['linkedin.com', 'crunchbase.com', 'github.com'],
          max_citations: 10
        })
      });

      const data = await response.json();
      return this.extractInsights(data, founderData);
    } catch (error) {
      console.error('Error enriching founder profile:', error);
      throw error;
    }
  }

  private async extractInsights(perplexityResponse: any, founderData: Partial<Founder>): Promise<Founder> {
    const insights = perplexityResponse.choices[0].message.content;
    
    // Extract LinkedIn URL if present
    const linkedinMatch = insights.match(/linkedin\.com\/in\/[a-zA-Z0-9-]+/);
    if (linkedinMatch) {
      founderData.linkedin_url = `https://www.${linkedinMatch[0]}`;
    }

    // Extract location information
    const locationMatch = insights.match(/based in ([^,.]+)/i);
    if (locationMatch) {
      const location = locationMatch[1].trim();
      const [city, state] = location.split(',').map(s => s.trim());
      if (city) founderData.city = city;
      if (state) founderData.state = state;
    }

    // Extract bio information
    const bioMatch = insights.match(/background:([^.]+)/i);
    if (bioMatch) {
      founderData.bio = bioMatch[1].trim();
    }

    return founderData as Founder;
  }

  async collectFounderData(searchCriteria: {
    location?: string;
    industry?: string;
    tags?: string[];
  }): Promise<Founder[]> {
    let query = this.supabase
      .from('founders')
      .select(`
        *,
        founder_startups (
          *,
          startups (*)
        ),
        diversity_metrics (*),
        founder_tags (
          *,
          tags (*)
        )
      `);

    if (searchCriteria.location) {
      query = query.ilike('city', `%${searchCriteria.location}%`);
    }

    if (searchCriteria.industry) {
      query = query.eq('founder_startups.startups.industry', searchCriteria.industry);
    }

    if (searchCriteria.tags && searchCriteria.tags.length > 0) {
      query = query.in('founder_tags.tags.name', searchCriteria.tags);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Error collecting founder data:', error);
      throw error;
    }

    return data as Founder[];
  }

  async updateFounderProfile(founderId: string, updates: Partial<Founder>): Promise<void> {
    const { error } = await this.supabase
      .from('founders')
      .update(updates)
      .eq('id', founderId);

    if (error) {
      console.error('Error updating founder profile:', error);
      throw error;
    }
  }

  async addFounderTag(founderId: string, tagName: string, confidenceScore: number): Promise<void> {
    // First, ensure the tag exists
    const { data: tag, error: tagError } = await this.supabase
      .from('tags')
      .upsert({ name: tagName })
      .select()
      .single();

    if (tagError) {
      console.error('Error creating tag:', tagError);
      throw tagError;
    }

    // Then, create the founder-tag relationship
    const { error: relationError } = await this.supabase
      .from('founder_tags')
      .upsert({
        founder_id: founderId,
        tag_id: tag.id,
        confidence_score: confidenceScore,
        source: 'ai_analysis'
      });

    if (relationError) {
      console.error('Error creating founder-tag relationship:', relationError);
      throw relationError;
    }
  }
} 