
import React from 'react';
import Layout from '@/components/Layout';
import ArticleList from '@/components/ArticleList';
import Pagination from '@/components/Pagination';
import Sidebar from '@/components/Sidebar';

const Index = () => {
  return (
    <Layout>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 animate-fade-up" style={{animationDelay: '0.1s'}}>
          <ArticleList />
          <div className="mt-10">
            <Pagination 
              totalPages={5} 
              currentPage={1} 
              itemsPerPage={5} 
            />
          </div>
        </div>
        
        <div className="animate-fade-up" style={{animationDelay: '0.3s'}}>
          <Sidebar />
        </div>
      </div>
    </Layout>
  );
};

export default Index;
