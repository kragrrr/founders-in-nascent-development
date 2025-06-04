
import React, { useState } from 'react';
import { Filter, ChevronDown, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const SearchFilters = () => {
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [showAdvanced, setShowAdvanced] = useState(false);

  const removeFilter = (filter: string) => {
    setActiveFilters(activeFilters.filter(f => f !== filter));
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 mb-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Filter className="w-4 h-4 text-gray-500" />
          <span className="font-medium text-gray-900">Filters</span>
        </div>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="text-purple-600"
        >
          Advanced Filters
          <ChevronDown className={`w-4 h-4 ml-1 transition-transform ${showAdvanced ? 'rotate-180' : ''}`} />
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Industry" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="fintech">FinTech</SelectItem>
            <SelectItem value="healthtech">HealthTech</SelectItem>
            <SelectItem value="edtech">EdTech</SelectItem>
            <SelectItem value="cleantech">CleanTech</SelectItem>
            <SelectItem value="ai">AI/ML</SelectItem>
          </SelectContent>
        </Select>

        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Location" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="sydney">Sydney</SelectItem>
            <SelectItem value="melbourne">Melbourne</SelectItem>
            <SelectItem value="brisbane">Brisbane</SelectItem>
            <SelectItem value="perth">Perth</SelectItem>
            <SelectItem value="adelaide">Adelaide</SelectItem>
          </SelectContent>
        </Select>

        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Funding Stage" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="pre-seed">Pre-Seed</SelectItem>
            <SelectItem value="seed">Seed</SelectItem>
            <SelectItem value="series-a">Series A</SelectItem>
            <SelectItem value="series-b">Series B+</SelectItem>
          </SelectContent>
        </Select>

        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Potential Score" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="90+">90+ (Exceptional)</SelectItem>
            <SelectItem value="80+">80+ (High)</SelectItem>
            <SelectItem value="70+">70+ (Moderate)</SelectItem>
            <SelectItem value="all">All Scores</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {showAdvanced && (
        <div className="border-t border-gray-200 pt-4">
          <h4 className="font-medium text-gray-900 mb-3">Diversity & Inclusion Filters</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Gender Diversity" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="female-founded">Female Founded</SelectItem>
                <SelectItem value="non-binary">Non-Binary Founded</SelectItem>
                <SelectItem value="diverse-team">Diverse Leadership Team</SelectItem>
              </SelectContent>
            </Select>

            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Background" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="first-gen">First Generation</SelectItem>
                <SelectItem value="immigrant">Immigrant Founded</SelectItem>
                <SelectItem value="indigenous">Indigenous Founded</SelectItem>
              </SelectContent>
            </Select>

            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Education" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="non-traditional">Non-Traditional Background</SelectItem>
                <SelectItem value="self-taught">Self-Taught</SelectItem>
                <SelectItem value="career-changer">Career Changer</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      )}

      {activeFilters.length > 0 && (
        <div className="flex flex-wrap gap-2 pt-3 border-t border-gray-100">
          {activeFilters.map((filter, index) => (
            <Badge key={index} variant="secondary" className="flex items-center space-x-1">
              <span>{filter}</span>
              <button onClick={() => removeFilter(filter)}>
                <X className="w-3 h-3" />
              </button>
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchFilters;
