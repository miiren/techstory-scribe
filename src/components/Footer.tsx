
import React from 'react';
import { Link } from 'react-router-dom';
import { Github, Twitter, Linkedin, Heart } from 'lucide-react';
import { cn } from '@/lib/utils';

const Footer = () => {
  return (
    <footer className="border-t border-border mt-20">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="space-y-4">
            <h3 className="text-lg font-display font-medium">技术博客</h3>
            <p className="text-sm text-muted-foreground">
              分享高质量的技术内容，帮助开发者成长，促进技术交流与创新。
            </p>
            <div className="flex space-x-4 pt-2">
              <SocialLink href="https://github.com" icon={<Github className="w-4 h-4" />} />
              <SocialLink href="https://twitter.com" icon={<Twitter className="w-4 h-4" />} />
              <SocialLink href="https://linkedin.com" icon={<Linkedin className="w-4 h-4" />} />
            </div>
          </div>
          
          <div>
            <h4 className="font-medium mb-4">导航</h4>
            <ul className="space-y-2">
              <FooterLink href="/">首页</FooterLink>
              <FooterLink href="/download">下载App</FooterLink>
              <FooterLink href="/membership">会员</FooterLink>
              <FooterLink href="/tech">IT技术</FooterLink>
            </ul>
          </div>
          
          <div>
            <h4 className="font-medium mb-4">资源</h4>
            <ul className="space-y-2">
              <FooterLink href="/tutorials">教程指南</FooterLink>
              <FooterLink href="/courses">精品课程</FooterLink>
              <FooterLink href="/videos">技术视频</FooterLink>
              <FooterLink href="/events">技术大会</FooterLink>
            </ul>
          </div>
          
          <div>
            <h4 className="font-medium mb-4">关于我们</h4>
            <ul className="space-y-2">
              <FooterLink href="/about">关于我们</FooterLink>
              <FooterLink href="/join">加入我们</FooterLink>
              <FooterLink href="/contact">联系我们</FooterLink>
              <FooterLink href="/privacy">隐私政策</FooterLink>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-border mt-12 pt-6 flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} 技术博客. 保留所有权利.</p>
          <p className="mt-2 md:mt-0 flex items-center">
            Made with <Heart className="w-4 h-4 mx-1 text-red-500" /> by developers for developers
          </p>
        </div>
      </div>
    </footer>
  );
};

const SocialLink = ({ href, icon }: { href: string; icon: React.ReactNode }) => (
  <a 
    href={href} 
    target="_blank" 
    rel="noopener noreferrer"
    className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-secondary text-foreground hover:text-primary transition-colors"
  >
    {icon}
  </a>
);

const FooterLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <li>
    <Link 
      to={href} 
      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
    >
      {children}
    </Link>
  </li>
);

export default Footer;
