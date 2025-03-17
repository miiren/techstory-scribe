
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Search, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { SearchDialog, useSearch } from './SearchDialog';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { open: searchOpen, setOpen: setSearchOpen } = useSearch();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const isActive = (path: string) => location.pathname === path;

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out py-4 px-6",
        isScrolled ? "bg-white/80 dark:bg-slate-900/80 backdrop-blur-md shadow-sm" : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-6">
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-2xl font-display font-bold tracking-tight">技术博客</span>
          </Link>
          
          <nav className="hidden md:flex items-center space-x-6">
            <NavLink to="/" active={isActive('/')}>首页</NavLink>
            <NavLink to="/download" active={isActive('/download')}>下载App</NavLink>
            <NavLink to="/membership" active={isActive('/membership')}>会员</NavLink>
            <NavLink to="/tech" active={isActive('/tech')}>IT技术</NavLink>
          </nav>
        </div>
        
        <div className="hidden md:flex items-center space-x-3">
          <Button
            variant="ghost"
            size="sm"
            className="relative group flex items-center gap-1 text-muted-foreground"
            onClick={() => setSearchOpen(true)}
          >
            <Search className="w-4 h-4" />
            <span>搜索</span>
            <kbd className="pointer-events-none absolute right-1.5 top-1.5 hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 group-hover:opacity-100 sm:flex">
              <span className="text-xs">⌘</span>K
            </kbd>
          </Button>
          
          <Button variant="outline" size="sm" asChild>
            <Link to="/login">登录</Link>
          </Button>
          
          <Button size="sm" className="bg-red-500 hover:bg-red-600" asChild>
            <Link to="/write">写文章</Link>
          </Button>
        </div>
        
        <button 
          className="md:hidden focus:outline-none"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
      </div>
      
      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white dark:bg-slate-900 shadow-lg animate-fade-in">
          <div className="py-4 px-6 flex flex-col space-y-4">
            <nav className="flex flex-col space-y-3">
              <MobileNavLink to="/" active={isActive('/')}>首页</MobileNavLink>
              <MobileNavLink to="/download" active={isActive('/download')}>下载App</MobileNavLink>
              <MobileNavLink to="/membership" active={isActive('/membership')}>会员</MobileNavLink>
              <MobileNavLink to="/tech" active={isActive('/tech')}>IT技术</MobileNavLink>
            </nav>
            
            <div className="pt-3 border-t border-border">
              <Button 
                variant="outline" 
                size="sm" 
                className="flex items-center justify-center gap-2 w-full mb-3"
                onClick={() => {
                  setMobileMenuOpen(false);
                  setSearchOpen(true);
                }}
              >
                <Search className="w-4 h-4" />
                <span>搜索</span>
              </Button>
              
              <div className="flex space-x-3">
                <Button variant="outline" size="sm" className="flex-1" asChild>
                  <Link to="/login">登录</Link>
                </Button>
                
                <Button size="sm" className="flex-1 bg-red-500 hover:bg-red-600" asChild>
                  <Link to="/write">写文章</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Search Dialog */}
      <SearchDialog open={searchOpen} onOpenChange={setSearchOpen} />
    </header>
  );
};

const NavLink = ({ to, active, children }: { to: string; active: boolean; children: React.ReactNode }) => (
  <Link 
    to={to} 
    className={cn(
      "text-sm font-medium transition-colors hover:text-primary",
      active ? "text-primary" : "text-foreground/80"
    )}
  >
    {children}
  </Link>
);

const MobileNavLink = ({ to, active, children }: { to: string; active: boolean; children: React.ReactNode }) => (
  <Link 
    to={to} 
    className={cn(
      "text-base font-medium py-1 transition-colors",
      active ? "text-primary" : "text-foreground/80"
    )}
  >
    {children}
  </Link>
);

export default Header;
