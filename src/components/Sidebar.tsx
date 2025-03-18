
import React from 'react';
import DailyChallenge from './DailyChallenge';
import MembershipFeatures from './MembershipFeatures';
import RecommendedAuthors from './RecommendedAuthors';

interface SidebarProps {
  className?: string;
}

const Sidebar = ({ className }: SidebarProps) => {
  return (
    <div className={`space-y-8 ${className}`}>
      <DailyChallenge />
      <MembershipFeatures />
      <RecommendedAuthors />
    </div>
  );
};

export default Sidebar;
