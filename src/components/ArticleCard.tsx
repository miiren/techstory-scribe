
import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Calendar, Eye } from 'lucide-react';

interface ArticleCardProps {
  id: string;
  title: string;
  summary: string;
  date: string;
  views: number;
  imageSrc: string;
  author: {
    name: string;
    type: string;
  };
  className?: string;
}

const ArticleCard = ({ 
  id, 
  title, 
  summary, 
  date, 
  views, 
  imageSrc, 
  author,
  className 
}: ArticleCardProps) => {
  return (
    <Link 
      to={`/blog/${id}`}
      className={cn(
        "group block w-full overflow-hidden transition-all duration-300",
        "hover:shadow-md rounded-lg",
        className
      )}
    >
      <article className="flex flex-col md:flex-row gap-6 py-6 px-0 border-b border-border">
        <div className="md:flex-1 flex-shrink-0 md:max-w-[65%]">
          <h2 className="text-xl font-display font-semibold mb-2 group-hover:text-primary transition-colors line-clamp-2">
            {title}
          </h2>
          <p className="text-muted-foreground mb-3 line-clamp-2">{summary}</p>
          
          <div className="flex items-center text-sm text-muted-foreground">
            <span>{author.name}</span>
            <span className="mx-2">·</span>
            <div className="flex items-center">
              <Calendar className="w-3 h-3 mr-1" />
              <span>{date}</span>
            </div>
            <span className="mx-2">·</span>
            <div className="flex items-center">
              <Eye className="w-3 h-3 mr-1" />
              <span>{views}</span>
            </div>
          </div>
        </div>
        
        <div className="md:w-1/3 h-[120px] md:h-[140px] overflow-hidden rounded-lg relative">
          <img
            src={imageSrc}
            alt={title}
            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      </article>
    </Link>
  );
};

export default ArticleCard;
