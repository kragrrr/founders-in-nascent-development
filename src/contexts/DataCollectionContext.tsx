import React, { createContext, useContext, ReactNode } from 'react';
import { useDataCollection } from '../hooks/useDataCollection';

interface DataCollectionContextType {
  loading: boolean;
  error: Error | null;
  enrichFounderProfile: (founderData: any) => Promise<any>;
  collectFounderData: (searchCriteria: {
    location?: string;
    industry?: string;
    tags?: string[];
  }) => Promise<any[]>;
  discoverFounders: (criteria: {
    location?: string;
    industry?: string;
    stage?: string;
    diversity?: string[];
  }) => Promise<any[]>;
  updateFounderProfile: (founderId: string, updates: any) => Promise<void>;
  addFounderTag: (founderId: string, tagName: string, confidenceScore: number) => Promise<void>;
}

const DataCollectionContext = createContext<DataCollectionContextType | undefined>(undefined);

interface DataCollectionProviderProps {
  children: ReactNode;
  supabaseUrl: string;
  supabaseKey: string;
  perplexityApiKey: string;
}

export function DataCollectionProvider({
  children,
  supabaseUrl,
  supabaseKey,
  perplexityApiKey
}: DataCollectionProviderProps) {
  const dataCollection = useDataCollection(supabaseUrl, supabaseKey, perplexityApiKey);

  return (
    <DataCollectionContext.Provider value={dataCollection}>
      {children}
    </DataCollectionContext.Provider>
  );
}

export function useDataCollectionContext() {
  const context = useContext(DataCollectionContext);
  if (context === undefined) {
    throw new Error('useDataCollectionContext must be used within a DataCollectionProvider');
  }
  return context;
} 