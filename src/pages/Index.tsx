import React, { useState } from 'react';
import Navigation from '@/components/Navigation';
import MetricCard from '@/components/MetricCard';
import { FounderSearch } from '@/components/FounderSearch';
import { FounderProfile } from '@/components/FounderProfile';
import DataQualityIndicator from '@/components/DataQualityIndicator';
import TrendingInsights from '@/components/TrendingInsights';
import { Button } from '@/components/ui/button';
import { Download, Zap, Users, TrendingUp, Target } from 'lucide-react';
import { Founder } from '@/lib/types/database';

const Index = () => {
  const [searchResults, setSearchResults] = useState<Founder[]>([]);
  const [selectedFounder, setSelectedFounder] = useState<Founder | null>(null);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      {/* Header Section */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4">Discover Australia's Next Generation Founders</h1>
            <p className="text-xl opacity-90 max-w-3xl mx-auto">
              AI-powered insights to find high-potential, underrepresented entrepreneurial talent before they're widely known
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <MetricCard
              title="Total Founders"
              value="12,847"
              change={12}
              changeType="increase"
              description="Active entrepreneurs tracked"
            />
            <MetricCard
              title="Diverse Founders"
              value="4,923"
              change={24}
              changeType="increase"
              description="Underrepresented talent"
            />
            <MetricCard
              title="High Potential"
              value="2,156"
              change={8}
              changeType="increase"
              description="Score 80+ founders"
            />
            <MetricCard
              title="New This Week"
              value="127"
              change={-3}
              changeType="decrease"
              description="Recently discovered"
            />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Search and Filters */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Discover Founders</h2>
                <div className="flex items-center space-x-3">
                  <Button variant="outline" size="sm">
                    <Download className="w-4 h-4 mr-2" />
                    Export Results
                  </Button>
                  <Button className="bg-purple-600 hover:bg-purple-700">
                    <Zap className="w-4 h-4 mr-2" />
                    AI Recommendations
                  </Button>
                </div>
              </div>
              
              <FounderSearch onSearchResults={setSearchResults} />
            </div>

            {/* Search Results */}
            <div className="space-y-6">
              {searchResults.map((founder) => (
                <FounderProfile
                  key={founder.id}
                  founder={founder}
                  onUpdate={async (updates) => {
                    // Handle founder profile updates
                    console.log('Updating founder:', founder.id, updates);
                  }}
                />
              ))}
            </div>

            {/* Load More */}
            {searchResults.length > 0 && (
              <div className="text-center mt-8">
                <Button variant="outline" className="w-full md:w-auto">
                  Load More Founders
                </Button>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Data Quality */}
            <DataQualityIndicator
              quality="high"
              lastUpdated="2 hours ago"
              sources={["LinkedIn", "Crunchbase", "GitHub"]}
              confidence={94}
            />

            {/* Trending Insights */}
            <TrendingInsights />

            {/* Quick Stats */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Stats</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Average Potential Score</span>
                  <span className="font-medium">78.4</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Female Representation</span>
                  <span className="font-medium">38.2%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Data Freshness</span>
                  <span className="font-medium text-green-600">96.7%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Coverage</span>
                  <span className="font-medium">All States</span>
                </div>
              </div>
            </div>

            {/* AI Insights */}
            <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-lg border border-purple-200 p-6">
              <div className="flex items-center space-x-2 mb-3">
                <Zap className="w-5 h-5 text-purple-600" />
                <h3 className="font-semibold text-gray-900">AI Recommendation</h3>
              </div>
              <p className="text-sm text-gray-600 mb-3">
                Based on your search patterns, consider exploring FinTech founders in Adelaide - there's a 34% increase in high-potential talent.
              </p>
              <Button size="sm" variant="outline" className="w-full">
                Explore Recommendation
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
