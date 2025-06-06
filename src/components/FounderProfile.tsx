import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Founder } from '@/lib/types/database';
import { useDataCollectionContext } from '@/contexts/DataCollectionContext';

interface FounderProfileProps {
  founder: Founder;
  onUpdate?: (updates: Partial<Founder>) => Promise<void>;
}

export function FounderProfile({ founder, onUpdate }: FounderProfileProps) {
  const { loading, error } = useDataCollectionContext();

  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName[0]}${lastName[0]}`.toUpperCase();
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <div className="flex items-center gap-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src={`https://ui-avatars.com/api/?name=${founder.first_name}+${founder.last_name}`} />
            <AvatarFallback>{getInitials(founder.first_name, founder.last_name)}</AvatarFallback>
          </Avatar>
          <div>
            <CardTitle className="text-2xl">
              {founder.first_name} {founder.last_name}
            </CardTitle>
            <CardDescription>
              {founder.city}, {founder.state}, {founder.country}
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Bio Section */}
          {founder.bio && (
            <div>
              <h3 className="text-lg font-semibold mb-2">Background</h3>
              <p className="text-gray-600">{founder.bio}</p>
            </div>
          )}

          {/* Contact Information */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Contact Information</h3>
            <div className="space-y-2">
              {founder.email && (
                <p className="text-gray-600">
                  <span className="font-medium">Email:</span> {founder.email}
                </p>
              )}
              {founder.linkedin_url && (
                <p className="text-gray-600">
                  <span className="font-medium">LinkedIn:</span>{' '}
                  <a
                    href={founder.linkedin_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    {founder.linkedin_url}
                  </a>
                </p>
              )}
            </div>
          </div>

          {/* Tags Section */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Tags & Categories</h3>
            <div className="flex flex-wrap gap-2">
              {/* This would be populated from founder_tags in a real implementation */}
              <Badge variant="secondary">Scale-up Alum</Badge>
              <Badge variant="secondary">Tech Founder</Badge>
              <Badge variant="secondary">AI/ML</Badge>
            </div>
          </div>

          {/* Loading and Error States */}
          {loading && (
            <div className="text-center text-gray-500">
              Loading profile data...
            </div>
          )}
          {error && (
            <div className="text-center text-red-500">
              Error loading profile: {error.message}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
} 