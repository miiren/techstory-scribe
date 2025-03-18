
import React from 'react';
import { Button } from '@/components/ui/button';
import { Calendar } from 'lucide-react';

interface DailyChallengeProps {
  className?: string;
}

const DailyChallenge = ({ className }: DailyChallengeProps) => {
  return (
    <div className={`bg-blue-50 rounded-lg p-6 border border-blue-100 ${className}`}>
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
  );
};

export default DailyChallenge;
