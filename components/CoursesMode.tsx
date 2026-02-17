import React, { useState } from 'react';
import { Star } from 'lucide-react';

const COURSES = [
  {
    id: 1,
    title: 'Abacus Foundations',
    level: 'Beginner',
    weeks: 6,
    sessions: 12,
    rating: 4.8,
    price: 89,
    image: 'bg-sky-100' // Placeholder
  },
  {
    id: 2,
    title: 'Mental Math Accelerator',
    level: 'Intermediate',
    weeks: 8,
    sessions: 16,
    rating: 4.9,
    price: 129,
    image: 'bg-indigo-100'
  },
  {
    id: 3,
    title: 'Competition Ready',
    level: 'Advanced',
    weeks: 10,
    sessions: 20,
    rating: 4.7,
    price: 159,
    image: 'bg-purple-100'
  },
  {
    id: 4,
    title: 'Speed Sprint Lab',
    level: 'Intermediate',
    weeks: 5,
    sessions: 10,
    rating: 4.6,
    price: 99,
    image: 'bg-pink-100'
  }
];

const TABS = ['All', 'Beginner', 'Intermediate', 'Advanced'];

const CoursesMode: React.FC = () => {
  const [activeTab, setActiveTab] = useState('All');

  const filteredCourses = activeTab === 'All'
    ? COURSES
    : COURSES.filter(c => c.level === activeTab);

  return (
    <div className="max-w-md mx-auto px-4 pt-4 pb-24 dark:text-white">
      <div className="mb-6">
        <p className="text-gray-500 dark:text-gray-400 text-sm mb-4 font-medium">Pick a track that fits your current level and goals.</p>

        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
          {TABS.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-colors ${
                activeTab === tab
                  ? 'bg-blue-900 text-white dark:bg-blue-600 shadow-md'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        {filteredCourses.map(course => (
          <div key={course.id} className="bg-white dark:bg-gray-800 rounded-3xl p-4 shadow-sm border border-gray-100 dark:border-gray-700 flex gap-4 hover:shadow-md transition-shadow cursor-pointer">
            <div className={`w-20 h-20 rounded-2xl shrink-0 ${course.image} flex items-center justify-center`}>
              {/* Placeholder abacus icon pattern */}
              <div className="w-12 h-12 border-2 border-black/10 rounded-full flex items-center justify-center">
                 <div className="w-8 h-8 border-2 border-black/10 rounded-full" />
              </div>
            </div>
            <div className="flex-1 min-w-0 flex flex-col justify-center">
              <h3 className="font-bold text-lg leading-tight mb-1 truncate text-gray-900 dark:text-white">{course.title}</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-2 font-medium">
                {course.level} · {course.weeks} weeks · {course.sessions} sessions
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 text-amber-500 font-bold text-sm">
                  <Star className="w-4 h-4 fill-current" />
                  {course.rating}
                </div>
                <div className="font-black text-blue-900 dark:text-blue-300 text-lg">
                  ₹{course.price}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CoursesMode;
