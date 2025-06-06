export interface Founder {
  id: string;
  first_name: string;
  last_name: string;
  email?: string;
  linkedin_url?: string;
  city?: string;
  state?: string;
  country: string;
  bio?: string;
  created_at: string;
  updated_at: string;
}

export interface Startup {
  id: string;
  name: string;
  description?: string;
  website?: string;
  industry?: string;
  stage?: string;
  founded_date?: string;
  status?: string;
  created_at: string;
  updated_at: string;
}

export interface FounderStartup {
  id: string;
  founder_id: string;
  startup_id: string;
  role?: string;
  is_current: boolean;
  start_date?: string;
  end_date?: string;
  created_at: string;
  updated_at: string;
}

export interface DiversityMetrics {
  id: string;
  founder_id: string;
  gender?: string;
  ethnicity?: string;
  is_lgbtqi?: boolean;
  is_neurodivergent?: boolean;
  age_range?: string;
  is_migrant?: boolean;
  migrant_origin_country?: string;
  created_at: string;
  updated_at: string;
}

export interface Tag {
  id: string;
  name: string;
  category?: string;
  description?: string;
  created_at: string;
  updated_at: string;
}

export interface FounderTag {
  founder_id: string;
  tag_id: string;
  confidence_score?: number;
  source?: string;
  created_at: string;
  updated_at: string;
}

export interface Database {
  public: {
    Tables: {
      founders: {
        Row: Founder;
        Insert: Omit<Founder, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<Founder, 'id' | 'created_at' | 'updated_at'>>;
      };
      startups: {
        Row: Startup;
        Insert: Omit<Startup, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<Startup, 'id' | 'created_at' | 'updated_at'>>;
      };
      founder_startups: {
        Row: FounderStartup;
        Insert: Omit<FounderStartup, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<FounderStartup, 'id' | 'created_at' | 'updated_at'>>;
      };
      diversity_metrics: {
        Row: DiversityMetrics;
        Insert: Omit<DiversityMetrics, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<DiversityMetrics, 'id' | 'created_at' | 'updated_at'>>;
      };
      tags: {
        Row: Tag;
        Insert: Omit<Tag, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<Tag, 'id' | 'created_at' | 'updated_at'>>;
      };
      founder_tags: {
        Row: FounderTag;
        Insert: Omit<FounderTag, 'created_at' | 'updated_at'>;
        Update: Partial<Omit<FounderTag, 'created_at' | 'updated_at'>>;
      };
    };
  };
} 