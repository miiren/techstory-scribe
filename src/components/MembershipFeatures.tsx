
import React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';

interface MembershipFeaturesProps {
  className?: string;
}

const MembershipFeatures = ({ className }: MembershipFeaturesProps) => {
  return (
    <div className={`bg-orange-50 rounded-lg p-6 border border-orange-100 ${className}`}>
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
  );
};

export default MembershipFeatures;
