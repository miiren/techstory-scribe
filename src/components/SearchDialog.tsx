
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Command, 
  CommandDialog, 
  CommandEmpty, 
  CommandGroup, 
  CommandInput, 
  CommandItem, 
  CommandList 
} from "@/components/ui/command";
import { Search, FileText, User, Tag } from 'lucide-react';
import { toast } from "sonner";

// Mock data types
interface SearchResult {
  id: string;
  type: 'article' | 'author' | 'tag';
  title: string;
  description?: string;
}

// Mock search data
const mockSearchData: SearchResult[] = [
  {
    id: '1',
    type: 'article',
    title: '深入理解Vue3响应式系统的设计与实现',
    description: 'Vue3响应式系统核心原理解析，包括Proxy、依赖收集与派发更新',
  },
  {
    id: '2',
    type: 'article',
    title: 'TypeScript高级特性实战指南',
    description: '泛型、装饰器、类型体操等高级特性应用',
  },
  {
    id: '3',
    type: 'article',
    title: '微前端架构的实践与思考',
    description: '大型企业级应用中微前端架构实践经验分享',
  },
  {
    id: '4',
    type: 'author',
    title: '技术探索者',
    description: '前端工程师 · 127.5k 字 · 35.1k 粉丝',
  },
  {
    id: '5',
    type: 'author',
    title: '架构之道',
    description: '技术总监 · 89.3k 字 · 28.4k 粉丝',
  },
  {
    id: '6',
    type: 'tag',
    title: 'Vue.js',
    description: '3.1k 篇文章',
  },
  {
    id: '7',
    type: 'tag',
    title: 'React',
    description: '2.8k 篇文章',
  },
  {
    id: '8',
    type: 'tag',
    title: 'TypeScript',
    description: '1.9k 篇文章',
  }
];

export function useSearch() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    
    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  return {
    open,
    setOpen,
  };
}

interface SearchDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const SearchDialog: React.FC<SearchDialogProps> = ({ 
  open, 
  onOpenChange 
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Simulate backend search API call
  const performSearch = (query: string) => {
    setIsLoading(true);
    
    // Simulate API delay
    setTimeout(() => {
      if (!query.trim()) {
        setSearchResults([]);
        setIsLoading(false);
        return;
      }
      
      // Filter mock data based on query
      const results = mockSearchData.filter(item => 
        item.title.toLowerCase().includes(query.toLowerCase()) || 
        (item.description && item.description.toLowerCase().includes(query.toLowerCase()))
      );
      
      setSearchResults(results);
      setIsLoading(false);
    }, 300);
  };

  useEffect(() => {
    performSearch(searchQuery);
  }, [searchQuery]);

  const handleSelect = (result: SearchResult) => {
    onOpenChange(false);
    
    // Navigate based on result type
    switch(result.type) {
      case 'article':
        navigate(`/blog/${result.id}`);
        break;
      case 'author':
        navigate(`/profile/${result.id}`);
        break;
      case 'tag':
        navigate(`/tag/${result.id}`);
        toast.success(`正在浏览 ${result.title} 标签的内容`);
        break;
    }
  };

  const getIcon = (type: string) => {
    switch(type) {
      case 'article':
        return <FileText className="mr-2 h-4 w-4" />;
      case 'author':
        return <User className="mr-2 h-4 w-4" />;
      case 'tag':
        return <Tag className="mr-2 h-4 w-4" />;
      default:
        return <Search className="mr-2 h-4 w-4" />;
    }
  };

  return (
    <CommandDialog open={open} onOpenChange={onOpenChange}>
      <Command className="rounded-lg border shadow-md">
        <CommandInput 
          placeholder="搜索文章、作者或标签..." 
          value={searchQuery}
          onValueChange={setSearchQuery}
        />
        <CommandList>
          <CommandEmpty>
            {isLoading ? (
              <div className="py-6 text-center text-sm">
                <div className="flex justify-center mb-2">
                  <svg className="animate-spin h-5 w-5 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                </div>
                正在搜索...
              </div>
            ) : (
              <div className="py-6 text-center text-sm">
                未找到相关结果
              </div>
            )}
          </CommandEmpty>

          {searchResults.length > 0 && (
            <>
              <CommandGroup heading="文章">
                {searchResults
                  .filter(result => result.type === 'article')
                  .map(result => (
                    <CommandItem
                      key={result.id}
                      onSelect={() => handleSelect(result)}
                      className="flex items-center py-2"
                    >
                      {getIcon(result.type)}
                      <div>
                        <div className="font-medium">{result.title}</div>
                        {result.description && (
                          <div className="text-xs text-muted-foreground line-clamp-1">{result.description}</div>
                        )}
                      </div>
                    </CommandItem>
                  ))}
              </CommandGroup>

              <CommandGroup heading="作者">
                {searchResults
                  .filter(result => result.type === 'author')
                  .map(result => (
                    <CommandItem
                      key={result.id}
                      onSelect={() => handleSelect(result)}
                      className="flex items-center py-2"
                    >
                      {getIcon(result.type)}
                      <div>
                        <div className="font-medium">{result.title}</div>
                        {result.description && (
                          <div className="text-xs text-muted-foreground">{result.description}</div>
                        )}
                      </div>
                    </CommandItem>
                  ))}
              </CommandGroup>

              <CommandGroup heading="标签">
                {searchResults
                  .filter(result => result.type === 'tag')
                  .map(result => (
                    <CommandItem
                      key={result.id}
                      onSelect={() => handleSelect(result)}
                      className="flex items-center py-2"
                    >
                      {getIcon(result.type)}
                      <div>
                        <div className="font-medium">{result.title}</div>
                        {result.description && (
                          <div className="text-xs text-muted-foreground">{result.description}</div>
                        )}
                      </div>
                    </CommandItem>
                  ))}
              </CommandGroup>
            </>
          )}
        </CommandList>
      </Command>
    </CommandDialog>
  );
};

export default SearchDialog;
