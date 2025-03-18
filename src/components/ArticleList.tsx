
import React from 'react';
import ArticleCard from '@/components/ArticleCard';

// Simulated data for articles
const articles = [
  {
    id: '1',
    title: '深入理解Vue3响应式系统的设计与实现',
    summary: '本文将深入探讨Vue3响应式系统的核心原理，包括Proxy的使用、依赖收集、派发更新等关键环节，帮助开发者更好地理解Vue3的内部机制。',
    date: '2025-03-04',
    views: 2300,
    imageSrc: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80',
    author: {
      name: '技术探索者',
      type: '前端工程师'
    }
  },
  {
    id: '2',
    title: 'TypeScript高级特性实战指南',
    summary: '通过实际案例详解TypeScript中的泛型、装饰器、类型体操等高级特性，提升代码的类型安全性和可维护性。',
    date: '2025-03-03',
    views: 1800,
    imageSrc: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80',
    author: {
      name: '前端架构师',
      type: '资深工程师'
    }
  },
  {
    id: '3',
    title: '微前端架构的实践与思考',
    summary: '分享在大型企业级应用中实践微前端架构的经验，包括框架选型、应用隔离、通信机制等关键问题的解决方案。',
    date: '2025-03-02',
    views: 3100,
    imageSrc: 'https://images.unsplash.com/photo-1607798748738-b15c40d33d57?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80',
    author: {
      name: '系统架构师',
      type: '技术总监'
    }
  },
  {
    id: '4',
    title: 'Node.js性能优化实践指南',
    summary: '深入探讨Node.js应用性能优化的各个方面，包括内存管理、异步操作、集群部署等关键技术。',
    date: '2025-03-01',
    views: 2700,
    imageSrc: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80',
    author: {
      name: '后端专家',
      type: '资深开发者'
    }
  },
  {
    id: '5',
    title: '前端工程化最佳实践',
    summary: '探讨现代前端工程化体系的构建，包括构建工具、CI/CD、自动化测试等环节的深度实践经验。',
    date: '2025-02-28',
    views: 3500,
    imageSrc: 'https://images.unsplash.com/photo-1593720213428-28a5b9e94613?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80',
    author: {
      name: '工程效率专家',
      type: '技术负责人'
    }
  }
];

interface ArticleListProps {
  className?: string;
}

const ArticleList = ({ className }: ArticleListProps) => {
  return (
    <div className={className}>
      <div className="space-y-2">
        {articles.map((article) => (
          <ArticleCard
            key={article.id}
            id={article.id}
            title={article.title}
            summary={article.summary}
            date={article.date}
            views={article.views}
            imageSrc={article.imageSrc}
            author={article.author}
          />
        ))}
      </div>
    </div>
  );
};

export default ArticleList;
