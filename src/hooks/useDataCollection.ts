import { useState, useCallback } from 'react';
import { DataCollectionService } from '../lib/services/data-collection';
import { Founder } from '../lib/types/database';

export function useDataCollection(
  supabaseUrl: string,
  supabaseKey: string,
  perplexityApiKey: string
) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const service = new DataCollectionService(supabaseUrl, supabaseKey, perplexityApiKey);

  const enrichFounderProfile = useCallback(async (founderData: Partial<Founder>) => {
    setLoading(true);
    setError(null);
    try {
      const enrichedData = await service.enrichFounderProfile(founderData);
      return enrichedData;
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Unknown error occurred'));
      throw err;
    } finally {
      setLoading(false);
    }
  }, [service]);

  const collectFounderData = useCallback(async (searchCriteria: {
    location?: string;
    industry?: string;
    tags?: string[];
  }) => {
    setLoading(true);
    setError(null);
    try {
      const founders = await service.collectFounderData(searchCriteria);
      return founders;
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Unknown error occurred'));
      throw err;
    } finally {
      setLoading(false);
    }
  }, [service]);

  const discoverFounders = useCallback(async (criteria: {
    location?: string;
    industry?: string;
    stage?: string;
    diversity?: string[];
  }) => {
    setLoading(true);
    setError(null);
    try {
      const results = await service.discoverFounders(criteria);
      return results;
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Unknown error occurred'));
      throw err;
    } finally {
      setLoading(false);
    }
  }, [service]);

  const updateFounderProfile = useCallback(async (founderId: string, updates: Partial<Founder>) => {
    setLoading(true);
    setError(null);
    try {
      await service.updateFounderProfile(founderId, updates);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Unknown error occurred'));
      throw err;
    } finally {
      setLoading(false);
    }
  }, [service]);

  const addFounderTag = useCallback(async (founderId: string, tagName: string, confidenceScore: number) => {
    setLoading(true);
    setError(null);
    try {
      await service.addFounderTag(founderId, tagName, confidenceScore);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Unknown error occurred'));
      throw err;
    } finally {
      setLoading(false);
    }
  }, [service]);

  return {
    loading,
    error,
    enrichFounderProfile,
    collectFounderData,
    discoverFounders,
    updateFounderProfile,
    addFounderTag
  };
} 