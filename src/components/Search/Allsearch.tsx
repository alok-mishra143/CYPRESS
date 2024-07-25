"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getFiles } from "@/lib/supabase/queries";

export default function Allsearch({ workspaceFolderData, workspace_id }: any) {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<
    { id: string; title: string; category: string; in_trash: boolean }[]
  >([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let results: {
          id: string;
          title: string;
          category: string;
          in_trash: boolean;
        }[] = [];

        for (const folder of workspaceFolderData) {
          results.push({
            id: folder.id,
            title: folder.title,
            category: "FOLDER",
            in_trash: folder.in_trash,
          });

          const files = (await getFiles(folder.id)) as {
            data:
              | {
                  title: string;
                  in_trash: string | null;
                  id: string;
                  data: string | null;
                  created_at: string;
                  icon_id: string;
                  banner_url: string | null;
                  workspace_id: string;
                  folder_id: string;
                }[]
              | [];
            error: null;
          };

          results = [
            ...results,
            ...files.data.map((file: any) => ({
              id: file.id,
              title: file.title,
              category: "FILE",
              in_trash: file.in_trash,
              folder_id: file.folder_id,
            })),
          ];
        }

        setSearchResults(results);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [workspaceFolderData]);

  const handleSearch = () => {
    setIsDialogOpen(true);
  };

  const handleClose = () => {
    setIsDialogOpen(false);
  };

  const filteredResults = searchTerm
    ? searchResults.filter((result) =>
        result.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : searchResults;

  const generateUrl = (result: any) => {
    const baseUrl = `${process.env.NEXT_PUBLIC_SITE_URL}dashboard/${workspace_id}`;
    if (result.category === "FOLDER") {
      return `${baseUrl}/${result.id}`;
    } else if (result.category === "FILE") {
      return `${baseUrl}/${result.folder_id}/${result.id}`;
    }
    return "#";
  };

  return (
    <div className="flex flex-col max-w-96 w-full  mx-auto">
      <div className="relative w-full">
        <div className="flex items-center bg-background rounded-lg shadow-md px-4 py-2 border">
          <div className="text-muted-foreground">
            <SearchIcon className="h-5 w-5" />
          </div>
          <input
            type="text"
            placeholder="Search..."
            className="flex-1 bg-transparent border-none outline-none px-2 py-1 text-foreground md:w-64"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Button onClick={handleSearch} className="hidden sm:flex">
            <SearchIcon className="h-5 w-5" />
          </Button>
        </div>
        {searchTerm && (
          <div className="absolute w-full bg-black/50 backdrop-blur-3xl border rounded-lg shadow-md mt-2 max-h-60 overflow-y-auto z-10 md:max-h-96">
            {filteredResults.length > 0 ? (
              filteredResults.map((result, index) => (
                <Link
                  key={index}
                  href={generateUrl(result)}
                  className="block p-2 hover:bg-gray-900 text-decoration-none"
                >
                  <div className="flex justify-between items-center">
                    <h3 className="font-semibold">{result.title}</h3>
                    {result.in_trash && (
                      <span className="text-red-500 text-xs mr-10">
                        In Trash
                      </span>
                    )}
                  </div>
                  <span className="block text-xs text-gray-500">
                    {result.category}
                  </span>
                </Link>
              ))
            ) : (
              <div className="p-2 text-gray-500">No results found.</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function SearchIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}

function XIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}
