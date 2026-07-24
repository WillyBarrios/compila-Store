import React from 'react';

export default function SkeletonCard() {
  return (
    <div className="w-full bg-store-lightCard border-2 border-store-card/20 dark:bg-store-darkCard dark:border-store-card/30 rounded-2xl p-6 flex flex-col justify-between h-[320px] animate-pulse">
      <div>
        {/* Header Skeleton */}
        <div className="flex justify-between items-start gap-4 mb-4">
          <div className="flex-1 space-y-2">
            <div className="h-6 bg-store-card/20 dark:bg-store-card/40 rounded w-3/4"></div>
            <div className="h-4 bg-store-card/10 dark:bg-store-card/30 rounded w-1/2"></div>
          </div>
          <div className="h-6 bg-store-card/20 dark:bg-store-card/40 rounded-full w-16"></div>
        </div>

        {/* Description Skeleton */}
        <div className="space-y-2 mb-6">
          <div className="h-3 bg-store-card/10 dark:bg-store-card/20 rounded w-full"></div>
          <div className="h-3 bg-store-card/10 dark:bg-store-card/20 rounded w-5/6"></div>
          <div className="h-3 bg-store-card/10 dark:bg-store-card/20 rounded w-4/5"></div>
        </div>
      </div>

      {/* Button Skeleton */}
      <div className="h-12 bg-store-card/15 dark:bg-store-card/30 rounded-xl w-full"></div>
    </div>
  );
}
