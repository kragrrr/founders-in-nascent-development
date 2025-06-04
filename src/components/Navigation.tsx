
import React from 'react';
import { Search, BookmarkIcon, Settings, Bell, User } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Navigation = () => {
  return (
    <nav className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <div className="flex items-center space-x-8">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">F</span>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              FIND
            </span>
          </div>
          
          <div className="hidden md:flex items-center space-x-6">
            <a href="/" className="text-gray-900 font-medium">Dashboard</a>
            <a href="/discover" className="text-gray-600 hover:text-gray-900">Discover</a>
            <a href="/analytics" className="text-gray-600 hover:text-gray-900">Analytics</a>
            <a href="/insights" className="text-gray-600 hover:text-gray-900">AI Insights</a>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search founders, companies, or skills..."
              className="pl-10 pr-4 py-2 w-80 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
          
          <Button variant="ghost" size="sm">
            <BookmarkIcon className="w-4 h-4" />
          </Button>
          
          <Button variant="ghost" size="sm">
            <Bell className="w-4 h-4" />
          </Button>
          
          <Button variant="ghost" size="sm">
            <Settings className="w-4 h-4" />
          </Button>
          
          <Button variant="ghost" size="sm">
            <User className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
