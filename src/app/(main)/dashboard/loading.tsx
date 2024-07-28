import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

const Loading = () => {
  return (
    <div className="flex flex-col sm:flex-row">
      {/* Left Sidebar (hidden on mobile) */}
      <div className="hidden sm:flex flex-col h-screen w-52 p-4">
        <Skeleton className="h-12 mb-4" /> {/* Sidebar Header */}
        <Skeleton className="h-10 mb-2" />
        <Skeleton className="h-10 mb-2" />
        <Skeleton className="h-10 mb-2" />
        <Skeleton className="h-10 mb-2" />
      </div>

      {/* Main Content */}
      <div className="flex flex-col w-full sm:w-screen p-4">
        <Skeleton className="h-48 w-full mb-4" /> {/* Main Header */}
        <div className="flex flex-col items-center p-4">
          <Skeleton className="h-12 w-80 mb-4" /> {/* Search Bar */}
          <div className="flex flex-wrap gap-4 justify-center mb-4">
            <Skeleton className="h-24 w-24" />
            <Skeleton className="h-24 w-24" />
            <Skeleton className="h-24 w-24" />
            <Skeleton className="h-24 w-24" />
          </div>
          <div className="flex flex-wrap gap-4 justify-center">
            <Skeleton className="h-24 w-24" />
            <Skeleton className="h-24 w-24" />
            <Skeleton className="h-24 w-24" />
            <Skeleton className="h-24 w-24" />
          </div>
        </div>
      </div>

      {/* Right Sidebar (optional, hidden on mobile) */}
      <div className="hidden sm:flex flex-col h-screen w-52 p-4">
        <Skeleton className="h-12 mb-4" /> {/* Sidebar Header */}
        <Skeleton className="h-10 mb-2" />
        <Skeleton className="h-10 mb-2" />
        <Skeleton className="h-10 mb-2" />
        <Skeleton className="h-10 mb-2" />
      </div>
    </div>
  );
};

export default Loading;
