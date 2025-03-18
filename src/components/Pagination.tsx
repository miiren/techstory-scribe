
import React from 'react';
import { Button } from '@/components/ui/button';

interface PaginationProps {
  className?: string;
  totalPages?: number;
  currentPage?: number;
  itemsPerPage?: number;
}

const Pagination = ({ 
  className,
  totalPages = 5,
  currentPage = 1,
  itemsPerPage = 5
}: PaginationProps) => {
  return (
    <div className={`flex items-center justify-between ${className}`}>
      <div className="text-sm text-muted-foreground">
        总共 {totalPages} 页
      </div>
      <div className="flex items-center space-x-2">
        <Button variant="outline" size="sm" disabled={currentPage === 1}>
          &lt;
        </Button>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <Button 
            key={page}
            variant={page === currentPage ? "default" : "ghost"} 
            size="sm" 
            className="min-w-[40px]"
          >
            {page}
          </Button>
        ))}
        <Button variant="outline" size="sm" disabled={currentPage === totalPages}>
          &gt;
        </Button>
      </div>
      <div className="text-sm">
        每页 {itemsPerPage} 篇
      </div>
    </div>
  );
};

export default Pagination;
