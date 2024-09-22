"use client";

import { UploadBannerFormSchema } from "@/lib/types";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import Loader from "../global/Loader";
import {
  updateFile,
  updateFolder,
  updateWorkspace,
} from "@/lib/supabase/queries";
import { createClient } from "@/lib/supabase/client";
import { useAppState } from "@/lib/provider/state-provider";
import Image from "next/image"; // Import next/image for optimized image rendering

interface BannerUploadFormProps {
  dirType: "workspace" | "file" | "folder";
  id: string;
}

const BannerUploadForm: React.FC<BannerUploadFormProps> = ({ dirType, id }) => {
  const supabase = createClient();
  const { state, workspaceId, folderId, dispatch } = useAppState();
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting: isUploading, errors },
  } = useForm<z.infer<typeof UploadBannerFormSchema>>({
    mode: "onChange",
    defaultValues: {
      banner: "",
    },
  });

  const onSubmitHandler: SubmitHandler<
    z.infer<typeof UploadBannerFormSchema>
  > = async (values) => {
    const file = values.banner?.[0];
    if (!file || !id) return;

    try {
      let filePath = null;

      const uploadBanner = async () => {
        const { data, error } = await supabase.storage
          .from("file-banners")
          .upload(`banner-${id}`, file, {
            cacheControl: "5",
            upsert: true,
          });

        if (error) throw new Error();
        filePath = data.path;
      };

      if (dirType === "file") {
        if (!workspaceId || !folderId) return;
        await uploadBanner();
        dispatch({
          type: "UPDATE_FILE",
          payload: {
            file: { banner_url: filePath },
            fileId: id,
            folderId,
            workspaceId,
          },
        });
        await updateFile({ banner_url: filePath }, id);
      } else if (dirType === "folder") {
        if (!workspaceId || !folderId) return;
        await uploadBanner();
        dispatch({
          type: "UPDATE_FOLDER",
          payload: {
            folderId: id,
            folder: { banner_url: filePath },
            workspaceId,
          },
        });
        await updateFolder({ banner_url: filePath }, id);
      }
    } catch (error) {
      console.error("Error uploading banner:", error);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPreviewImage(imageUrl);
    }
  };

  const handleRemoveImage = () => {
    setPreviewImage(null);
    reset({ banner: "" });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmitHandler)}
      className="flex flex-col gap-2"
    >
      <Label className="text-sm text-muted-foreground" htmlFor="bannerImage">
        Banner Image
      </Label>
      <Input
        id="bannerImage"
        type="file"
        accept="image/*"
        disabled={isUploading}
        {...register("banner", { required: "Banner Image is required" })}
        onChange={(e) => {
          register("banner").onChange(e);
          handleImageChange(e); // Call to handle image preview
        }}
      />
      {previewImage && (
        <div className="relative w-full h-32 mt-2">
          <Image
            src={previewImage}
            alt="Banner Preview"
            layout="fill"
            objectFit="cover"
            className="rounded-md"
          />
          <Button
            type="button"
            onClick={handleRemoveImage}
            className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1"
          >
            Remove
          </Button>
        </div>
      )}
      <small className="text-red-600">
        {errors.banner?.message?.toString()}
      </small>
      <Button disabled={isUploading} type="submit">
        {!isUploading ? "Upload Banner" : <Loader />}
      </Button>
    </form>
  );
};

export default BannerUploadForm;
