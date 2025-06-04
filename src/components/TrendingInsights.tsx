
import React from 'react';
import { TrendingUp, Zap, Users, Target } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const TrendingInsights = () => {
  const insights = [
    {
      icon: <TrendingUp className="w-5 h-5 text-purple-600" />,
      title: "AI Startups Surge",
      description: "47% increase in AI-focused founders this quarter",
      trend: "+47%",
      category: "Industry Trend"
    },
    {
      icon: <Users className="w-5 h-5 text-blue-600" />,
      title: "Female Founders Rising",
      description: "Record high representation in tech startups",
      trend: "+23%",
      category: "Diversity"
    },
    {
      icon: <Target className="w-5 h-5 text-green-600" />,
      title: "Brisbane Hotspot",
      description: "Emerging as a key startup ecosystem",
      trend: "+31%",
      category: "Geography"
    },
    {
      icon: <Zap className="w-5 h-5 text-orange-600" />,
      title: "Climate Tech Boom",
      description: "Sustainability-focused founders on the rise",
      trend: "+56%",
      category: "Sector"
    }
  ];

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center space-x-2 mb-4">
        <Zap className="w-5 h-5 text-purple-600" />
        <h3 className="text-lg font-semibold text-gray-900">Trending Insights</h3>
      </div>
      
      <div className="space-y-4">
        {insights.map((insight, index) => (
          <div key={index} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
            <div className="flex-shrink-0">
              {insight.icon}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-2 mb-1">
                <h4 className="font-medium text-gray-900">{insight.title}</h4>
                <Badge variant="outline" className="text-xs">
                  {insight.category}
                </Badge>
              </div>
              <p className="text-sm text-gray-600">{insight.description}</p>
            </div>
            <div className="flex-shrink-0">
              <span className="text-sm font-medium text-green-600">{insight.trend}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrendingInsights;
