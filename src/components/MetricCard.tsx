
import React from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string;
  change: number;
  changeType: 'increase' | 'decrease' | 'neutral';
  description?: string;
}

const MetricCard = ({ title, value, change, changeType, description }: MetricCardProps) => {
  const getTrendIcon = () => {
    switch (changeType) {
      case 'increase':
        return <TrendingUp className="w-4 h-4 text-green-500" />;
      case 'decrease':
        return <TrendingDown className="w-4 h-4 text-red-500" />;
      default:
        return <Minus className="w-4 h-4 text-gray-500" />;
    }
  };

  const getChangeColor = () => {
    switch (changeType) {
      case 'increase':
        return 'text-green-500';
      case 'decrease':
        return 'text-red-500';
      default:
        return 'text-gray-500';
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-medium text-gray-600">{title}</h3>
        {getTrendIcon()}
      </div>
      
      <div className="flex items-end space-x-2 mb-1">
        <span className="text-2xl font-bold text-gray-900">{value}</span>
        <span className={`text-sm font-medium ${getChangeColor()}`}>
          {change > 0 ? '+' : ''}{change}%
        </span>
      </div>
      
      {description && (
        <p className="text-xs text-gray-500">{description}</p>
      )}
    </div>
  );
};

export default MetricCard;
