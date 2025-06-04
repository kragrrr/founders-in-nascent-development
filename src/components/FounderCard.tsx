
import React from 'react';
import { MapPin, Building, Bookmark, ExternalLink, Github, Linkedin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface FounderCardProps {
  name: string;
  company: string;
  location: string;
  industry: string;
  potentialScore: number;
  description: string;
  tags: string[];
  fundingStage: string;
  diversityMetrics: string[];
  avatar: string;
  confidence: number;
}

const FounderCard = ({
  name,
  company,
  location,
  industry,
  potentialScore,
  description,
  tags,
  fundingStage,
  diversityMetrics,
  avatar,
  confidence
}: FounderCardProps) => {
  const getScoreColor = (score: number) => {
    if (score >= 85) return 'text-green-600 bg-green-50';
    if (score >= 70) return 'text-yellow-600 bg-yellow-50';
    return 'text-gray-600 bg-gray-50';
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-all duration-200 hover:border-purple-200">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <img
            src={avatar}
            alt={name}
            className="w-12 h-12 rounded-full object-cover"
          />
          <div>
            <h3 className="font-semibold text-gray-900">{name}</h3>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Building className="w-3 h-3" />
              <span>{company}</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <div className={`px-2 py-1 rounded-full text-xs font-medium ${getScoreColor(potentialScore)}`}>
            {potentialScore}/100
          </div>
          <Button variant="ghost" size="sm">
            <Bookmark className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <p className="text-sm text-gray-600 mb-3 line-clamp-2">{description}</p>

      <div className="flex items-center space-x-4 text-xs text-gray-500 mb-3">
        <div className="flex items-center space-x-1">
          <MapPin className="w-3 h-3" />
          <span>{location}</span>
        </div>
        <span>•</span>
        <span>{industry}</span>
        <span>•</span>
        <span>{fundingStage}</span>
      </div>

      <div className="flex flex-wrap gap-1 mb-3">
        {tags.slice(0, 3).map((tag, index) => (
          <Badge key={index} variant="secondary" className="text-xs">
            {tag}
          </Badge>
        ))}
        {tags.length > 3 && (
          <Badge variant="outline" className="text-xs">
            +{tags.length - 3}
          </Badge>
        )}
      </div>

      {diversityMetrics.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-3">
          {diversityMetrics.map((metric, index) => (
            <Badge key={index} variant="outline" className="text-xs bg-purple-50 text-purple-700 border-purple-200">
              {metric}
            </Badge>
          ))}
        </div>
      )}

      <div className="flex items-center justify-between pt-3 border-t border-gray-100">
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="sm">
            <Linkedin className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm">
            <Github className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm">
            <ExternalLink className="w-4 h-4" />
          </Button>
        </div>
        
        <div className="text-xs text-gray-500">
          {confidence}% confidence
        </div>
      </div>
    </div>
  );
};

export default FounderCard;
