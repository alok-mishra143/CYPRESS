import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

const Loading = () => {
  return (
    <div className="flex flex-col sm:flex-row">
      {/* Main Content */}
      <div className="flex flex-col w-full sm:w-screen p-4">
        <div className="flex flex-col items-center p-4">
          <Skeleton className="h-32 w-screen mb-4" />
          <Skeleton className="h-12 w-80 mb-10 " />
          <div className="flex flex-wrap gap-4 justify-center mb-4">
            <Skeleton className="h-10 w-screen" />
            <Skeleton className="h-10 w-screen" />
            <Skeleton className="h-10 w-screen" />
            <Skeleton className="h-10 w-screen" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loading;
