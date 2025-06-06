import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { X, Search, Zap } from "lucide-react";
import { useDataCollectionContext } from '@/contexts/DataCollectionContext';
import { Founder } from '@/lib/types/database';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface FounderSearchProps {
  onSearchResults: (founders: Founder[]) => void;
}

export function FounderSearch({ onSearchResults }: FounderSearchProps) {
  const { collectFounderData, discoverFounders, loading, error } = useDataCollectionContext();
  const [searchQuery, setSearchQuery] = useState('');
  const [location, setLocation] = useState('');
  const [industry, setIndustry] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [discoveryResults, setDiscoveryResults] = useState<any[]>([]);
  const [selectedDiversity, setSelectedDiversity] = useState<string[]>([]);
  const [stage, setStage] = useState('');

  const handleSearch = async () => {
    try {
      const results = await collectFounderData({
        location: location || undefined,
        industry: industry || undefined,
        tags: selectedTags.length > 0 ? selectedTags : undefined
      });
      onSearchResults(results);
    } catch (err) {
      console.error('Search failed:', err);
    }
  };

  const handleDiscovery = async () => {
    try {
      const results = await discoverFounders({
        location: location || undefined,
        industry: industry || undefined,
        stage: stage || undefined,
        diversity: selectedDiversity.length > 0 ? selectedDiversity : undefined
      });
      setDiscoveryResults(results);
    } catch (err) {
      console.error('Discovery failed:', err);
    }
  };

  const handleTagRemove = (tagToRemove: string) => {
    setSelectedTags(selectedTags.filter(tag => tag !== tagToRemove));
  };

  const handleTagAdd = (tag: string) => {
    if (!selectedTags.includes(tag)) {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const handleDiversityToggle = (diversity: string) => {
    setSelectedDiversity(prev => 
      prev.includes(diversity)
        ? prev.filter(d => d !== diversity)
        : [...prev, diversity]
    );
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Find Founders</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="search" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="search">Search Database</TabsTrigger>
            <TabsTrigger value="discover">Discover New Founders</TabsTrigger>
          </TabsList>

          <TabsContent value="search">
            <div className="space-y-4">
              {/* Search Input */}
              <div className="flex gap-2">
                <Input
                  placeholder="Search founders..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1"
                />
                <Button onClick={handleSearch} disabled={loading}>
                  <Search className="w-4 h-4 mr-2" />
                  Search
                </Button>
              </div>

              {/* Filters */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Location Filter */}
                <div>
                  <label className="text-sm font-medium mb-1 block">Location</label>
                  <Input
                    placeholder="City, State"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  />
                </div>

                {/* Industry Filter */}
                <div>
                  <label className="text-sm font-medium mb-1 block">Industry</label>
                  <Select value={industry} onValueChange={setIndustry}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select industry" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="tech">Technology</SelectItem>
                      <SelectItem value="healthcare">Healthcare</SelectItem>
                      <SelectItem value="fintech">FinTech</SelectItem>
                      <SelectItem value="ai">Artificial Intelligence</SelectItem>
                      <SelectItem value="biotech">Biotechnology</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Tags */}
              <div>
                <label className="text-sm font-medium mb-1 block">Tags</label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {selectedTags.map(tag => (
                    <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                      {tag}
                      <button
                        onClick={() => handleTagRemove(tag)}
                        className="hover:text-destructive"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
                <div className="flex flex-wrap gap-2">
                  {['Scale-up Alum', 'Tech Founder', 'AI/ML', 'Female Founder', 'Migrant Founder'].map(tag => (
                    <Badge
                      key={tag}
                      variant="outline"
                      className="cursor-pointer hover:bg-secondary"
                      onClick={() => handleTagAdd(tag)}
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="discover">
            <div className="space-y-4">
              {/* Discovery Filters */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Location Filter */}
                <div>
                  <label className="text-sm font-medium mb-1 block">Location</label>
                  <Input
                    placeholder="City, State"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  />
                </div>

                {/* Industry Filter */}
                <div>
                  <label className="text-sm font-medium mb-1 block">Industry</label>
                  <Select value={industry} onValueChange={setIndustry}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select industry" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="tech">Technology</SelectItem>
                      <SelectItem value="healthcare">Healthcare</SelectItem>
                      <SelectItem value="fintech">FinTech</SelectItem>
                      <SelectItem value="ai">Artificial Intelligence</SelectItem>
                      <SelectItem value="biotech">Biotechnology</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Stage Filter */}
                <div>
                  <label className="text-sm font-medium mb-1 block">Stage</label>
                  <Select value={stage} onValueChange={setStage}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select stage" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pre-seed">Pre-Seed</SelectItem>
                      <SelectItem value="seed">Seed</SelectItem>
                      <SelectItem value="series-a">Series A</SelectItem>
                      <SelectItem value="growth">Growth</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Diversity Filters */}
              <div>
                <label className="text-sm font-medium mb-1 block">Diversity</label>
                <div className="grid grid-cols-2 gap-2">
                  {['Female', 'Indigenous', 'Migrant', 'LGBTQI+', 'Neurodivergent'].map(diversity => (
                    <div key={diversity} className="flex items-center space-x-2">
                      <Checkbox
                        id={diversity}
                        checked={selectedDiversity.includes(diversity)}
                        onCheckedChange={() => handleDiversityToggle(diversity)}
                      />
                      <Label htmlFor={diversity}>{diversity}</Label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Discovery Button */}
              <Button onClick={handleDiscovery} disabled={loading} className="w-full">
                <Zap className="w-4 h-4 mr-2" />
                Discover Founders
              </Button>

              {/* Discovery Results */}
              {discoveryResults.length > 0 && (
                <div className="space-y-4 mt-4">
                  <h3 className="text-lg font-semibold">Discovery Results</h3>
                  {discoveryResults.map((result, index) => (
                    <Card key={index}>
                      <CardContent className="pt-6">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-semibold">{result.name}</h4>
                            <p className="text-sm text-gray-600">{result.role} at {result.company}</p>
                            <p className="text-sm text-gray-600">{result.location}</p>
                            <p className="mt-2">{result.description}</p>
                          </div>
                          <Badge variant="secondary">
                            {Math.round(result.confidence * 100)}% Confidence
                          </Badge>
                        </div>
                        {result.linkedinUrl && (
                          <a
                            href={result.linkedinUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline text-sm mt-2 inline-block"
                          >
                            View LinkedIn Profile
                          </a>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>

        {/* Loading and Error States */}
        {loading && (
          <div className="text-center text-gray-500 mt-4">
            {discoveryResults.length > 0 ? 'Discovering founders...' : 'Searching...'}
          </div>
        )}
        {error && (
          <div className="text-center text-red-500 mt-4">
            Error: {error.message}
          </div>
        )}
      </CardContent>
    </Card>
  );
} 