export const dynamic = "force-dynamic";

import Allsearch from "@/components/Search/Allsearch";
import { getFolders, getWorkspaceDetails } from "@/lib/supabase/queries";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";
import Loading from "./loading";

const Workspace = async ({ params }: { params: { workspaceId: string } }) => {
  const { data: workspaceFolderData, error: foldersError } = await getFolders(
    params.workspaceId
  );
  const { data, error } = await getWorkspaceDetails(params.workspaceId);
  if (error || !data.length) redirect("/dashboard");

  return (
    <div className="relative overflow-scroll p-4 space-y-8">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 text-center mb-8">
        {data[0].title}
      </h1>
      <Allsearch
        workspaceFolderData={workspaceFolderData}
        workspace_id={params.workspaceId}
      />

      <section>
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
          Folder in Trash
        </h2>
        <div className="flex space-x-4 overflow-x-auto pb-4">
          {workspaceFolderData &&
            workspaceFolderData
              .filter((folder) => folder.in_trash)
              .map((folder) => (
                <Link
                  key={folder.id}
                  href={`${process.env.NEXT_PUBLIC_SITE_URL}/dashboard/${params.workspaceId}/${folder.id}`}
                >
                  <div className="bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl rounded-lg p-6 transition-transform transform hover:scale-105 inline-block">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                      {folder.title}
                    </h3>
                  </div>
                </Link>
              ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
          All Folders
        </h2>
        {workspaceFolderData && workspaceFolderData.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {workspaceFolderData
              .filter((folder) => !folder.in_trash)
              .map((workspace) => (
                <Link
                  key={workspace.id}
                  href={`${process.env.NEXT_PUBLIC_SITE_URL}/dashboard/${params.workspaceId}/${workspace.id}`}
                >
                  <div className="bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl rounded-lg p-6 transition-transform transform hover:scale-105">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                      {workspace.title}
                    </h3>
                  </div>
                </Link>
              ))}
          </div>
        ) : (
          <p className="text-gray-700 dark:text-gray-300">
            No folders available <br />{" "}
            <span className="bg-primary/20 px-2 py-1 rounded-md">
              Create One
            </span>
          </p>
        )}
      </section>
    </div>
  );
};

export default Workspace;
