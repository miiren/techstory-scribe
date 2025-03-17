
import React from 'react';
import Header from './Header';
import Footer from './Footer';
import { cn } from '@/lib/utils';

interface LayoutProps {
  children: React.ReactNode;
  className?: string;
  fullWidth?: boolean;
}

const Layout = ({ children, className, fullWidth = false }: LayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className={cn(
        "flex-1 pt-24 pb-10",
        className
      )}>
        <div className={fullWidth ? "w-full" : "blog-container"}>
          {children}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
