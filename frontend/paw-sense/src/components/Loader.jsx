import React from 'react';

const Loader = () => {
  return (
    <div className="max-w-md w-full mx-auto bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-800 animate-pulse">
      {/* Header Profile Section */}
      <div className="flex items-center space-x-4 mb-6">
        <div className="rounded-full bg-slate-200 dark:bg-slate-700 h-12 w-12"></div>
        <div className="flex-1 space-y-3 py-1">
          <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded-full w-3/4"></div>
          <div className="h-2 bg-slate-200 dark:bg-slate-700 rounded-full w-1/2"></div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="space-y-4">
        <div className="h-40 bg-slate-200 dark:bg-slate-700 rounded-xl w-full"></div>
        <div className="space-y-2">
          <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded-full"></div>
          <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded-full w-5/6"></div>
        </div>
      </div>

      {/* Footer Buttons */}
      <div className="mt-6 flex justify-between items-center">
        <div className="h-8 bg-slate-200 dark:bg-slate-700 rounded-lg w-24"></div>
        <div className="h-8 bg-slate-200 dark:bg-slate-700 rounded-lg w-16"></div>
      </div>
    </div>
  );
};

export default Loader;