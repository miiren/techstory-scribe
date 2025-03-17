
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Layout from '@/components/Layout';
import ArticleCard from '@/components/ArticleCard';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar, MapPin, Link as LinkIcon, Twitter, Github, Users } from 'lucide-react';

// Mock author data
const mockAuthor = {
  id: 'author1',
  name: '技术探索者',
  bio: '前端工程师 / 技术博主 / 开源贡献者',
  longBio: '8年前端开发经验，专注于JavaScript、Vue、React、性能优化等领域。热爱分享技术，著有多篇技术文章，参与多个开源项目。目前就职于某知名互联网公司，负责前端架构和性能优化工作。',
  avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
  coverImage: 'https://images.unsplash.com/photo-1522252234503-e356532cafd5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
  joinDate: '2023-05-15',
  location: '北京，中国',
  website: 'https://techexplorer.dev',
  twitterHandle: '@techexplorer',
  githubHandle: 'techexplorer',
  followers: 34500,
  following: 256,
  achievements: [
    { name: '优质创作者', description: '连续发布高质量技术文章' },
    { name: '前端先锋', description: '在前端领域的突出贡献' },
    { name: '知识共享者', description: '积极回答社区问题' }
  ]
};

// Mock articles data
const authorArticles = [
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
    title: 'React性能优化完全指南',
    summary: '本文总结了React应用性能优化的各种技巧和最佳实践，包括组件优化、渲染优化、状态管理优化等多个方面。',
    date: '2025-02-25',
    views: 1850,
    imageSrc: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80',
    author: {
      name: '技术探索者',
      type: '前端工程师'
    }
  },
  {
    id: '3',
    title: 'TypeScript高级类型技巧总结',
    summary: '深入解析TypeScript中的高级类型用法，包括条件类型、映射类型、类型推断等，帮助你掌握TypeScript类型系统的强大能力。',
    date: '2025-02-10',
    views: 2100,
    imageSrc: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80',
    author: {
      name: '技术探索者',
      type: '前端工程师'
    }
  }
];

const popularArticles = [
  authorArticles[0],
  {
    id: '4',
    title: 'JavaScript异步编程全解析',
    summary: '从回调到Promise，再到async/await，全面解析JavaScript异步编程的演进历程和最佳实践。',
    date: '2024-12-15',
    views: 3200,
    imageSrc: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80',
    author: {
      name: '技术探索者',
      type: '前端工程师'
    }
  },
  {
    id: '5',
    title: '前端工程化体系搭建实战',
    summary: '从零开始搭建一个完整的前端工程化体系，包括构建工具、代码规范、CI/CD、自动化测试等环节。',
    date: '2024-11-20',
    views: 2800,
    imageSrc: 'https://images.unsplash.com/photo-1618477247222-acbdb0e159b3?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80',
    author: {
      name: '技术探索者',
      type: '前端工程师'
    }
  }
];

const Profile = () => {
  const { id } = useParams<{id: string}>();
  const [author, setAuthor] = useState(mockAuthor);
  const [isFollowing, setIsFollowing] = useState(false);
  
  useEffect(() => {
    // In a real app, we would fetch author data based on the ID
    console.log(`Fetching author with ID: ${id}`);
    window.scrollTo(0, 0);
  }, [id]);
  
  return (
    <Layout>
      <div className="animate-fade-up" style={{animationDelay: '0.1s'}}>
        {/* Cover image */}
        <div className="h-64 w-full rounded-xl overflow-hidden relative mb-16">
          <img
            src={author.coverImage}
            alt="Cover"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
          
          {/* Profile image */}
          <div className="absolute -bottom-12 left-6 md:left-10">
            <div className="relative">
              <img
                src={author.avatar}
                alt={author.name}
                className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-white"
              />
              <div className="absolute bottom-0 right-0 bg-green-500 w-5 h-5 rounded-full border-2 border-white"></div>
            </div>
          </div>
        </div>
        
        {/* Profile header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 px-6 md:px-10">
          <div>
            <h1 className="text-3xl font-bold mb-2">{author.name}</h1>
            <p className="text-muted-foreground mb-3">{author.bio}</p>
            <div className="flex flex-wrap gap-y-2 gap-x-4 text-sm text-muted-foreground">
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-1" />
                加入于 {author.joinDate}
              </div>
              {author.location && (
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-1" />
                  {author.location}
                </div>
              )}
              {author.website && (
                <div className="flex items-center">
                  <LinkIcon className="w-4 h-4 mr-1" />
                  <a 
                    href={author.website} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="hover:text-primary"
                  >
                    {author.website.replace(/^https?:\/\//, '')}
                  </a>
                </div>
              )}
            </div>
          </div>
          
          <div className="flex mt-4 md:mt-0 space-x-3 items-center">
            <div className="flex items-center space-x-4 mr-2">
              {author.twitterHandle && (
                <a
                  href={`https://twitter.com/${author.twitterHandle.replace('@', '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-[#1DA1F2] transition-colors"
                >
                  <Twitter className="w-5 h-5" />
                </a>
              )}
              
              {author.githubHandle && (
                <a
                  href={`https://github.com/${author.githubHandle}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Github className="w-5 h-5" />
                </a>
              )}
            </div>
            
            <Button
              variant={isFollowing ? "outline" : "default"}
              onClick={() => setIsFollowing(!isFollowing)}
            >
              {isFollowing ? "已关注" : "关注"}
            </Button>
          </div>
        </div>
        
        {/* Profile content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 px-6 md:px-10">
          <div className="lg:col-span-2">
            <Tabs defaultValue="latest" className="w-full">
              <TabsList className="mb-6">
                <TabsTrigger value="latest">最新文章</TabsTrigger>
                <TabsTrigger value="popular">热门文章</TabsTrigger>
                <TabsTrigger value="about">关于作者</TabsTrigger>
              </TabsList>
              
              <TabsContent value="latest" className="mt-0">
                <div className="space-y-2">
                  {authorArticles.map((article) => (
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
                
                <div className="mt-8 text-center">
                  <Button variant="outline">加载更多</Button>
                </div>
              </TabsContent>
              
              <TabsContent value="popular" className="mt-0">
                <div className="space-y-2">
                  {popularArticles.map((article) => (
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
              </TabsContent>
              
              <TabsContent value="about" className="mt-0">
                <div className="space-y-6">
                  <div className="prose max-w-none">
                    <p>{author.longBio}</p>
                  </div>
                  
                  <div className="mt-6">
                    <h3 className="text-lg font-medium mb-3">成就与荣誉</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {author.achievements.map((achievement, index) => (
                        <div 
                          key={index} 
                          className="bg-secondary/30 rounded-lg p-4 border border-border"
                        >
                          <h4 className="font-medium mb-1">{achievement.name}</h4>
                          <p className="text-sm text-muted-foreground">{achievement.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
          
          <div className="space-y-6">
            <div className="rounded-lg border overflow-hidden">
              <div className="px-6 py-4 border-b bg-secondary/30">
                <h3 className="font-medium">统计信息</h3>
              </div>
              <div className="p-6 grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold">{author.followers.toLocaleString()}</div>
                  <div className="text-sm text-muted-foreground">关注者</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">{authorArticles.length}</div>
                  <div className="text-sm text-muted-foreground">文章</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">{author.following}</div>
                  <div className="text-sm text-muted-foreground">关注</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">8.5K</div>
                  <div className="text-sm text-muted-foreground">被赞</div>
                </div>
              </div>
            </div>
            
            <div className="rounded-lg border overflow-hidden">
              <div className="px-6 py-4 border-b bg-secondary/30">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">粉丝</h3>
                  <Button variant="link" size="sm" className="h-auto p-0">查看全部</Button>
                </div>
              </div>
              <div className="p-6">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-center justify-between mb-4 last:mb-0">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-secondary mr-3"></div>
                      <div>
                        <div className="font-medium text-sm">用户{i}</div>
                        <div className="text-xs text-muted-foreground">关注了你</div>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="h-8">关注</Button>
                  </div>
                ))}
                
                {author.followers > 3 && (
                  <div className="mt-4 text-center text-sm text-muted-foreground flex items-center justify-center">
                    <Users className="w-4 h-4 mr-1" />
                    还有 {author.followers - 3} 位粉丝
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
