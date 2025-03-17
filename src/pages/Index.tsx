
import React from 'react';
import Layout from '@/components/Layout';
import ArticleCard from '@/components/ArticleCard';
import { Button } from '@/components/ui/button';
import { Calendar, ChevronRight } from 'lucide-react';

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

const Index = () => {
  return (
    <Layout>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 animate-fade-up" style={{animationDelay: '0.1s'}}>
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
          
          <div className="mt-10 flex items-center justify-between">
            <div className="text-sm text-muted-foreground">
              总共 5 页
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" disabled>
                &lt;
              </Button>
              <Button variant="default" size="sm" className="min-w-[40px]">
                1
              </Button>
              <Button variant="ghost" size="sm" className="min-w-[40px]">
                2
              </Button>
              <Button variant="ghost" size="sm" className="min-w-[40px]">
                3
              </Button>
              <Button variant="ghost" size="sm" className="min-w-[40px]">
                4
              </Button>
              <Button variant="ghost" size="sm" className="min-w-[40px]">
                5
              </Button>
              <Button variant="outline" size="sm">
                &gt;
              </Button>
            </div>
            <div className="text-sm">
              每页 5 篇
            </div>
          </div>
        </div>
        
        <div className="space-y-8 animate-fade-up" style={{animationDelay: '0.3s'}}>
          {/* Daily Challenge */}
          <div className="bg-blue-50 rounded-lg p-6 border border-blue-100">
            <div className="flex items-center">
              <Calendar className="text-blue-500 w-5 h-5 mr-2" />
              <h3 className="text-lg font-medium text-blue-800">日更挑战</h3>
            </div>
            <p className="mt-3 text-blue-700 text-sm">
              每天学习一个技术点，提升编程技能，与技术社区一同成长。
            </p>
            <Button variant="outline" size="sm" className="mt-4 bg-white text-blue-600 border-blue-200 hover:bg-blue-50">
              查看今日挑战
            </Button>
          </div>
          
          {/* Membership Features */}
          <div className="bg-orange-50 rounded-lg p-6 border border-orange-100">
            <div className="flex items-center">
              <svg className="w-5 h-5 text-orange-500 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
              </svg>
              <h3 className="text-lg font-medium text-orange-800">会员功能</h3>
            </div>
            <ul className="mt-3 space-y-2">
              <li className="flex items-start">
                <ChevronRight className="w-4 h-4 text-orange-500 mr-1 mt-0.5" />
                <span className="text-sm text-orange-700">独家技术课程</span>
              </li>
              <li className="flex items-start">
                <ChevronRight className="w-4 h-4 text-orange-500 mr-1 mt-0.5" />
                <span className="text-sm text-orange-700">高清视频教程</span>
              </li>
              <li className="flex items-start">
                <ChevronRight className="w-4 h-4 text-orange-500 mr-1 mt-0.5" />
                <span className="text-sm text-orange-700">技术专家答疑</span>
              </li>
            </ul>
            <Button variant="outline" size="sm" className="mt-4 bg-white text-orange-600 border-orange-200 hover:bg-orange-50">
              了解会员特权
            </Button>
          </div>
          
          {/* Recommended Authors */}
          <div className="rounded-lg border">
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
        </div>
      </div>
    </Layout>
  );
};

export default Index;
