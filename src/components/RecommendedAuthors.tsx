
import React from 'react';
import { Button } from '@/components/ui/button';

// Simulated data for recommended authors
const recommendedAuthors = [
  {
    id: '1',
    name: '技术探索者',
    posts: '127.5k',
    followers: '35.1k',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&auto=format&fit=crop&w=150&q=80'
  },
  {
    id: '2',
    name: '架构之道',
    posts: '89.3k',
    followers: '28.4k',
    avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-1.2.1&auto=format&fit=crop&w=150&q=80'
  },
  {
    id: '3',
    name: '全栈开发者',
    posts: '156.8k',
    followers: '42.7k',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=150&q=80'
  },
];

interface RecommendedAuthorsProps {
  className?: string;
}

const RecommendedAuthors = ({ className }: RecommendedAuthorsProps) => {
  return (
    <div className={`rounded-lg border ${className}`}>
      <div className="px-6 py-4 border-b">
        <h3 className="text-lg font-medium">推荐作者</h3>
      </div>
      <div className="divide-y">
        {recommendedAuthors.map((author) => (
          <div key={author.id} className="px-6 py-4 flex items-center justify-between">
            <div className="flex items-center">
              <img 
                src={author.avatar} 
                alt={author.name}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div className="ml-3">
                <h4 className="text-sm font-medium">{author.name}</h4>
                <p className="text-xs text-muted-foreground">
                  写了 {author.posts} 字 · {author.followers} 人关注
                </p>
              </div>
            </div>
            <Button 
              variant="outline" 
              size="sm"
              className="text-xs h-8 rounded-full bg-secondary/50 hover:bg-secondary"
            >
              关注
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecommendedAuthors;
