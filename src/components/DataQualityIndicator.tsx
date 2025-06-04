
import React from 'react';
import { Shield, AlertTriangle, CheckCircle, Clock } from 'lucide-react';

interface DataQualityIndicatorProps {
  quality: 'high' | 'medium' | 'low';
  lastUpdated: string;
  sources: string[];
  confidence: number;
}

const DataQualityIndicator = ({ quality, lastUpdated, sources, confidence }: DataQualityIndicatorProps) => {
  const getQualityConfig = () => {
    switch (quality) {
      case 'high':
        return {
          icon: <CheckCircle className="w-4 h-4 text-green-500" />,
          text: 'High Quality',
          bgColor: 'bg-green-50',
          textColor: 'text-green-700'
        };
      case 'medium':
        return {
          icon: <AlertTriangle className="w-4 h-4 text-yellow-500" />,
          text: 'Medium Quality',
          bgColor: 'bg-yellow-50',
          textColor: 'text-yellow-700'
        };
      case 'low':
        return {
          icon: <Shield className="w-4 h-4 text-red-500" />,
          text: 'Low Quality',
          bgColor: 'bg-red-50',
          textColor: 'text-red-700'
        };
    }
  };

  const config = getQualityConfig();

  return (
    <div className={`${config.bgColor} rounded-lg p-3 border border-gray-200`}>
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center space-x-2">
          {config.icon}
          <span className={`text-sm font-medium ${config.textColor}`}>
            {config.text}
          </span>
        </div>
        <span className="text-xs text-gray-600">{confidence}% confidence</span>
      </div>
      
      <div className="text-xs text-gray-600 space-y-1">
        <div className="flex items-center space-x-1">
          <Clock className="w-3 h-3" />
          <span>Updated {lastUpdated}</span>
        </div>
        <div>
          <span className="font-medium">Sources:</span> {sources.join(', ')}
        </div>
      </div>
    </div>
  );
};

export default DataQualityIndicator;
