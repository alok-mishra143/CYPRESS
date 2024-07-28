import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

const Loading = () => {
  return (
    <div className="flex flex-col sm:flex-row">
      {/* Main Content */}
      <div className="flex flex-col w-full sm:w-screen p-4">
        <div className="flex flex-col items-center p-4">
          <Skeleton className="h-12 w-80 mb-4" /> {/* Search Bar */}
          <div className="flex flex-wrap gap-4 justify-center mb-4">
            <Skeleton className="h-24 w-52" />
            <Skeleton className="h-24 w-52" />

            <Skeleton className="h-24 w-52" />
            <Skeleton className="h-24 w-52" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loading;
