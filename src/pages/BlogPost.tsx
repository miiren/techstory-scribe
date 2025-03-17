import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Calendar, MessageSquare, Bookmark, Share2, Eye, ThumbsUp, Award } from 'lucide-react';
import { cn } from '@/lib/utils';
import Prism from 'prismjs';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-css';
import 'prismjs/themes/prism-tomorrow.css';

const mockArticle = {
  id: '1',
  title: '深入理解Vue3响应式系统的设计与实现',
  content: `
  <div class="prose-content">
    <p>Vue3 的响应式系统是其最核心的特性之一，它允许我们以声明式的方式构建用户界面，使得开发者能够专注于数据逻辑而非 DOM 操作。本文将深入探讨 Vue3 响应式系统的设计原理与实现细节。</p>
    
    <h2>Vue3 响应式系统概述</h2>
    <p>与 Vue2 不同，Vue3 的响应式系统完全重写，基于 ES6 的 Proxy 实现，这带来了更好的性能和更全面的响应式覆盖。响应式系统的核心目标是：当数据变化时，相关的视图会自动更新。</p>
    
    <h3>Vue2 vs Vue3 响应式系统</h3>
    <p>Vue2 使用 Object.defineProperty 来拦截对象属性的访问和修改，这种方式有一些限制：</p>
    <ul>
      <li>无法检测对象属性的添加和删除</li>
      <li>无法检测数组索引和长度的变化</li>
      <li>需要递归遍历对象的所有属性</li>
    </ul>
    
    <p>Vue3 采用 Proxy 来创建响应式对象，可以拦截对象的所有操作，包括属性访问、属性赋值、属性删除等。这解决了 Vue2 中的大部分限制。</p>
    
    <h2>响应式系统的核心：Proxy</h2>
    <pre><code class="language-javascript">
// 创建响应式对象的简化实现
function reactive(target) {
  return new Proxy(target, {
    get(target, key, receiver) {
      // 依赖收集
      track(target, key);
      const result = Reflect.get(target, key, receiver);
      return result;
    },
    set(target, key, value, receiver) {
      const oldValue = target[key];
      const result = Reflect.set(target, key, value, receiver);
      if (oldValue !== value) {
        // 触发更新
        trigger(target, key);
      }
      return result;
    }
  });
}
    </code></pre>
    
    <h2>依赖收集与更新派发</h2>
    <p>Vue3 响应式系统的另外两个核心机制是依赖收集（track）和更新派发（trigger）。</p>
    
    <h3>依赖收集（track）</h3>
    <p>当组件渲染时，会访问响应式对象的属性，此时会调用 track 函数记录下该属性与当前活跃的副作用函数（如组件的渲染函数）之间的依赖关系。</p>
    
    <pre><code class="language-javascript">
// 当前活跃的副作用函数
let activeEffect;

// 存储所有依赖关系的 WeakMap
const targetMap = new WeakMap();

function track(target, key) {
  if (!activeEffect) return;
  
  // 获取对象的依赖图
  let depsMap = targetMap.get(target);
  if (!depsMap) {
    targetMap.set(target, (depsMap = new Map()));
  }
  
  // 获取属性的依赖集合
  let dep = depsMap.get(key);
  if (!dep) {
    depsMap.set(key, (dep = new Set()));
  }
  
  // 添加依赖
  dep.add(activeEffect);
}
    </code></pre>
    
    <h3>更新派发（trigger）</h3>
    <p>当响应式对象的属性被修改时，会调用 trigger 函数查找该属性对应的所有依赖，并重新执行这些依赖。</p>
    
    <pre><code class="language-javascript">
function trigger(target, key) {
  // 获取对象的依赖图
  const depsMap = targetMap.get(target);
  if (!depsMap) return;
  
  // 获取属性的依赖集合
  const dep = depsMap.get(key);
  if (dep) {
    // 执行所有依赖
    for (const effect of dep) {
      effect();
    }
  }
}
    </code></pre>
    
    <h2>组合式API与响应式系统</h2>
    <p>Vue3 的组合式API（Composition API）是建立在响应式系统之上的，它提供了一系列API来创建和使用响应式状态：</p>
    
    <ul>
      <li><code>ref</code>：创建一个包装对象，值存储在 .value 属性中</li>
      <li><code>reactive</code>：创建一个响应式对象</li>
      <li><code>computed</code>：创建一个计算属性</li>
      <li><code>watch</code>/<code>watchEffect</code>：监听响应式状态的变化</li>
    </ul>
    
    <h3>使用示例</h3>
    <pre><code class="language-javascript">
import { ref, reactive, computed, watch } from 'vue';

export default {
  setup() {
    // 创建响应式状态
    const count = ref(0);
    const user = reactive({
      name: 'John',
      age: 30
    });
    
    // 计算属性
    const doubleCount = computed(() => count.value * 2);
    
    // 监听状态变化
    watch(count, (newValue, oldValue) => {
      console.log(\`Count changed from \${oldValue} to \${newValue}\`);
    });
    
    // 方法
    function increment() {
      count.value++;
      user.age++;
    }
    
    return {
      count,
      user,
      doubleCount,
      increment
    };
  }
}
    </code></pre>
    
    <h2>总结</h2>
    <p>Vue3 的响应式系统是一个精心设计的系统，它通过 Proxy 实现了更全面的响应式覆盖，通过依赖收集和更新派发机制实现了精确的DOM更新。理解响应式系统的工作原理，有助于我们更好地使用 Vue3 开发高性能的应用。</p>
    
    <p>在实际应用中，我们应当注意：</p>
    <ul>
      <li>尽量使用 Vue 提供的响应式API创建状态，避免直接修改响应式对象</li>
      <li>理解 ref 和 reactive 的区别，合理选择</li>
      <li>注意可能的性能问题，如大型响应式对象、不必要的监听等</li>
    </ul>
    
    <p>通过深入了解 Vue3 响应式系统，我们能够更好地理解 Vue3 的内部工作机制，编写出更加高效、可靠的代码。</p>
  </div>
  `,
  publishedAt: '2025-03-04',
  views: 2300,
  likes: 142,
  comments: 18,
  author: {
    id: 'author1',
    name: '技术探索者',
    bio: '前端架构师 / Vue核心团队成员 / 技术书籍作者',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&auto=format&fit=crop&w=150&q=80',
    articles: 48,
    followers: 34500
  },
  tags: ['Vue', 'JavaScript', '前端', '响应式编程']
};

const relatedArticles = [
  {
    id: '2',
    title: 'Vue3 Composition API 最佳实践指南',
    summary: '详解Composition API的各种用法和设计模式，帮助你写出更优雅的Vue代码。',
    publishedAt: '2025-02-28',
    author: '前端架构师',
    imageSrc: 'https://images.unsplash.com/photo-1614741118887-7a4ee193a5fa?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80'
  },
  {
    id: '3',
    title: '从零实现简易版Vue3响应式系统',
    summary: '动手实现一个迷你版的Vue3响应式系统，深入理解其核心原理。',
    publishedAt: '2025-02-20',
    author: 'Vue技术专家',
    imageSrc: 'https://images.unsplash.com/photo-1506097425191-7ad538b29cef?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80'
  },
  {
    id: '4',
    title: 'Vue3性能优化技巧大全',
    summary: '全面介绍Vue3应用性能优化的各种技巧，包括响应式优化、渲染优化等。',
    publishedAt: '2025-02-15',
    author: '性能优化专家',
    imageSrc: 'https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80'
  }
];

const BlogPost = () => {
  const { id } = useParams<{id: string}>();
  const [article, setArticle] = useState(mockArticle);
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  
  useEffect(() => {
    console.log(`Fetching article with ID: ${id}`);
    window.scrollTo(0, 0);
  }, [id]);
  
  useEffect(() => {
    Prism.highlightAll();
  }, [article]);
  
  return (
    <Layout>
      <article className="animate-fade-up" style={{animationDelay: '0.1s'}}>
        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">{article.title}</h1>
          
          <div className="flex flex-wrap items-center gap-4 mb-6">
            <div className="flex items-center">
              <img 
                src={article.author.avatar} 
                alt={article.author.name} 
                className="w-10 h-10 rounded-full object-cover mr-3"
              />
              <div>
                <Link to={`/profile/${article.author.id}`} className="font-medium hover:text-primary">
                  {article.author.name}
                </Link>
                <div className="text-sm text-muted-foreground">
                  {article.author.bio}
                </div>
              </div>
            </div>
            
            <div className="flex gap-3 text-sm text-muted-foreground ml-auto">
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-1" />
                {article.publishedAt}
              </div>
              <div className="flex items-center">
                <Eye className="w-4 h-4 mr-1" />
                {article.views} 次阅读
              </div>
              <div className="flex items-center">
                <MessageSquare className="w-4 h-4 mr-1" />
                {article.comments} 条评论
              </div>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {article.tags.map(tag => (
              <Link 
                key={tag} 
                to={`/tag/${tag}`}
                className="bg-secondary/80 hover:bg-secondary text-sm px-3 py-1 rounded-full transition-colors"
              >
                {tag}
              </Link>
            ))}
          </div>
        </header>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8">
            <div 
              className="article-content"
              dangerouslySetInnerHTML={{ __html: article.content }}
            />
            
            <div className="flex items-center justify-between mt-10 py-5 border-t border-b">
              <div className="flex items-center gap-4">
                <Button 
                  variant={isLiked ? "default" : "outline"}
                  size="sm"
                  className={cn(
                    "rounded-full",
                    isLiked && "bg-red-500 hover:bg-red-600"
                  )}
                  onClick={() => setIsLiked(!isLiked)}
                >
                  <ThumbsUp className="w-4 h-4 mr-2" />
                  {isLiked ? article.likes + 1 : article.likes} 赞
                </Button>
                
                <Button 
                  variant="outline"
                  size="sm"
                  className="rounded-full"
                >
                  <MessageSquare className="w-4 h-4 mr-2" />
                  {article.comments} 评论
                </Button>
              </div>
              
              <div className="flex items-center gap-2">
                <Button 
                  variant="ghost"
                  size="sm"
                  className="rounded-full"
                  onClick={() => setIsBookmarked(!isBookmarked)}
                >
                  <Bookmark className={cn(
                    "w-4 h-4",
                    isBookmarked && "fill-current"
                  )} />
                </Button>
                
                <Button 
                  variant="ghost"
                  size="sm"
                  className="rounded-full"
                >
                  <Share2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
            
            <div className="mt-10 p-6 bg-secondary/40 rounded-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <img 
                    src={article.author.avatar} 
                    alt={article.author.name} 
                    className="w-16 h-16 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h3 className="font-bold text-lg">{article.author.name}</h3>
                    <p className="text-sm text-muted-foreground mb-1">{article.author.articles} 篇文章 · {article.author.followers.toLocaleString()} 人关注</p>
                    <p className="text-sm">{article.author.bio}</p>
                  </div>
                </div>
                <Button>关注作者</Button>
              </div>
            </div>
            
            <div className="mt-10">
              <h3 className="text-xl font-bold mb-6">评论 ({article.comments})</h3>
              
              <div className="flex items-start mb-8">
                <div className="w-10 h-10 rounded-full bg-secondary flex-shrink-0 mr-4"></div>
                <div className="flex-1">
                  <textarea 
                    placeholder="写下你的评论..." 
                    className="w-full p-3 rounded-lg border focus:ring-1 focus:ring-primary outline-none"
                    rows={3}
                  ></textarea>
                  <div className="flex justify-end mt-2">
                    <Button>发布评论</Button>
                  </div>
                </div>
              </div>
              
              <div className="space-y-6">
                <div className="p-0.5 text-center text-muted-foreground">
                  登录后查看更多评论
                </div>
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-4 space-y-8">
            <div className="sticky top-24">
              <div className="rounded-lg border">
                <div className="px-5 py-4 border-b">
                  <h3 className="font-medium">相关文章</h3>
                </div>
                <div className="divide-y">
                  {relatedArticles.map(article => (
                    <Link 
                      key={article.id} 
                      to={`/blog/${article.id}`}
                      className="block p-5 hover:bg-secondary/30 transition-colors"
                    >
                      <div className="flex gap-4">
                        <img 
                          src={article.imageSrc} 
                          alt={article.title}
                          className="w-20 h-20 object-cover rounded"
                        />
                        <div>
                          <h4 className="font-medium line-clamp-2 mb-1">{article.title}</h4>
                          <p className="text-sm text-muted-foreground line-clamp-1 mb-2">
                            {article.summary}
                          </p>
                          <div className="text-xs text-muted-foreground">
                            {article.author} · {article.publishedAt}
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
              
              <div className="mt-8 bg-gradient-to-br from-primary/10 to-purple-500/10 rounded-lg p-6 border border-primary/20">
                <div className="flex items-center">
                  <Award className="text-primary w-5 h-5 mr-2" />
                  <h3 className="text-lg font-medium">加入会员</h3>
                </div>
                <p className="mt-3 text-sm mb-4">
                  解锁全站优质内容，获取专属学习资源，加速你的技术成长。
                </p>
                <Button className="w-full">了解会员特权</Button>
              </div>
            </div>
          </div>
        </div>
      </article>
    </Layout>
  );
};

export default BlogPost;
