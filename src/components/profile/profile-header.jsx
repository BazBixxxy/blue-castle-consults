"use client";
import { useAuthContext } from "@/context/auth-context";
import { useEdgeStore } from "@/context/edgestore-context";
import { useFileUpload } from "@/hooks/use-file-upload";
import useUpdateAvatars from "@/hooks/user/updateAvatars";
import { ImagePlusIcon, XIcon, Loader2 } from "lucide-react";
import { useState } from "react";

// Pretend we have initial image files
const initialBgImage = [
  {
    name: "profile-bg.jpg",
    size: 1528737,
    type: "image/jpeg",
    url: "/profile-bg.jpg",
    id: "profile-bg-123456789",
  },
];

const initialAvatarImage = [
  {
    name: "avatar-72-01.jpg",
    size: 1528737,
    type: "image/jpeg",
    url: "/avatar-72-01.jpg",
    id: "avatar-123456789",
  },
];

export default function ProfileHeader() {
  const { authUser } = useAuthContext();

  return (
    <div className="relative">
      <ProfileBg bannerUrl={authUser?.banner} />
      <AvatarComponent profilePictureUrl={authUser?.profilePicture} />
    </div>
  );
}

function ProfileBg({ bannerUrl }) {
  const { edgestore } = useEdgeStore();
  const { updateBanner, loadingBanner } = useUpdateAvatars();
  const [isUploading, setIsUploading] = useState(false);

  const [{ files }, { removeFile, openFileDialog, getInputProps, addFiles }] =
    useFileUpload({
      accept: "image/*",
      initialFiles: bannerUrl ? [] : initialBgImage,
    });

  // Priority: uploaded file > auth user banner > initial image
  const currentImage = files[0]?.preview || bannerUrl || initialBgImage[0]?.url;
  const isLoading = isUploading || loadingBanner;

  // Handle file selection and upload
  const handleFileChange = async (e) => {
    const selectedFiles = e.target.files;
    if (!selectedFiles || selectedFiles.length === 0) return;

    const file = selectedFiles[0];
    if (!file) return;

    try {
      setIsUploading(true);

      // Add file to preview first
      addFiles([file]);

      // Upload to EdgeStore
      const res = await edgestore.myPublicImages.upload({ file });

      // Update banner via API
      await updateBanner(res.url);

      // Clear the uploaded file since it's now saved
      if (files[0]) {
        removeFile(files[0].id);
      }
    } catch (error) {
      console.error("Error uploading banner:", error);
      // Remove the preview if upload failed
      if (files[0]) {
        removeFile(files[0].id);
      }
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemoveBanner = async () => {
    try {
      // If there's a preview file, just remove it
      if (files[0]?.preview) {
        removeFile(files[0].id);
        return;
      }

      // If removing the actual banner, update to empty
      if (bannerUrl) {
        await updateBanner("");
      }
    } catch (error) {
      console.error("Error removing banner:", error);
    }
  };

  return (
    <div className="h-32 w-full">
      <div className="bg-muted relative flex size-full items-center justify-center overflow-hidden">
        {currentImage ? (
          <img
            className="size-full object-cover"
            src={currentImage}
            alt="Profile banner"
            width={512}
            height={128}
            loading="lazy"
          />
        ) : (
          <div className="flex size-full items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600">
            <span className="text-white/80 text-sm font-medium">
              No banner image
            </span>
          </div>
        )}

        {/* Loading overlay */}
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50">
            <div className="flex items-center gap-2 text-white">
              <Loader2 className="h-5 w-5 animate-spin" />
              <span className="text-sm font-medium">
                {isUploading ? "Uploading..." : "Saving..."}
              </span>
            </div>
          </div>
        )}

        {/* Overlay buttons */}
        {!isLoading && (
          <div className="absolute inset-0 flex items-center justify-center gap-2 opacity-0 transition-opacity duration-200 hover:opacity-100">
            <button
              type="button"
              className="focus-visible:border-ring focus-visible:ring-ring/50 z-50 flex size-10 cursor-pointer items-center justify-center rounded-full bg-black/70 text-white transition-all duration-200 outline-none hover:bg-black/90 hover:scale-110 focus-visible:ring-[3px]"
              onClick={openFileDialog}
              aria-label={
                currentImage ? "Change banner image" : "Upload banner image"
              }
            >
              <ImagePlusIcon size={16} aria-hidden="true" />
            </button>

            {(files[0]?.preview || bannerUrl) && (
              <button
                type="button"
                className="focus-visible:border-ring focus-visible:ring-ring/50 z-50 flex size-10 cursor-pointer items-center justify-center rounded-full bg-black/70 text-white transition-all duration-200 outline-none hover:bg-black/90 hover:scale-110 focus-visible:ring-[3px]"
                onClick={handleRemoveBanner}
                aria-label="Remove banner image"
              >
                <XIcon size={16} aria-hidden="true" />
              </button>
            )}
          </div>
        )}
      </div>

      <input
        {...getInputProps()}
        onChange={handleFileChange}
        className="sr-only"
        aria-label="Upload banner image file"
      />
    </div>
  );
}

function AvatarComponent({ profilePictureUrl }) {
  const { edgestore } = useEdgeStore();
  const { updateProfilePicture, loading } = useUpdateAvatars();
  const [isUploading, setIsUploading] = useState(false);

  const [{ files }, { removeFile, openFileDialog, getInputProps, addFiles }] =
    useFileUpload({
      accept: "image/*",
      initialFiles: profilePictureUrl ? [] : initialAvatarImage,
    });

  // Priority: uploaded file > auth user profile picture > initial image
  const currentImage =
    files[0]?.preview || profilePictureUrl || initialAvatarImage[0]?.url;
  const isLoading = isUploading || loading;

  // Handle file selection and upload
  const handleFileChange = async (e) => {
    const selectedFiles = e.target.files;
    if (!selectedFiles || selectedFiles.length === 0) return;

    const file = selectedFiles[0];
    if (!file) return;

    try {
      setIsUploading(true);

      // Add file to preview first
      addFiles([file]);

      // Upload to EdgeStore
      const res = await edgestore.myPublicImages.upload({ file });

      // Update profile picture via API
      await updateProfilePicture(res.url);

      // Clear the uploaded file since it's now saved
      if (files[0]) {
        removeFile(files[0].id);
      }
    } catch (error) {
      console.error("Error uploading profile picture:", error);
      // Remove the preview if upload failed
      if (files[0]) {
        removeFile(files[0].id);
      }
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemoveProfilePicture = async () => {
    try {
      // If there's a preview file, just remove it
      if (files[0]?.preview) {
        removeFile(files[0].id);
        return;
      }

      // If removing the actual profile picture, update to empty
      if (profilePictureUrl) {
        await updateProfilePicture("");
      }
    } catch (error) {
      console.error("Error removing profile picture:", error);
    }
  };

  return (
    <div className="-mt-12 px-6 pb-4">
      <div className="border-background bg-muted relative flex size-24 items-center justify-center overflow-hidden rounded-full border-4 shadow-lg">
        {currentImage ? (
          <img
            src={currentImage}
            className="size-full object-cover"
            width={96}
            height={96}
            alt="Profile picture"
            loading="lazy"
          />
        ) : (
          <div className="flex size-full items-center justify-center bg-gradient-to-br from-gray-400 to-gray-600 text-white">
            <span className="text-xl font-bold">?</span>
          </div>
        )}

        {/* Loading overlay */}
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full">
            <div className="flex items-center gap-1 text-white">
              <Loader2 className="h-4 w-4 animate-spin" />
              <span className="text-xs font-medium">
                {isUploading ? "Uploading" : "Saving"}
              </span>
            </div>
          </div>
        )}

        {/* Upload button overlay */}
        {!isLoading && (
          <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-200 hover:opacity-100">
            <button
              type="button"
              className="focus-visible:border-ring focus-visible:ring-ring/50 flex size-8 cursor-pointer items-center justify-center rounded-full bg-black/70 text-white transition-all duration-200 outline-none hover:bg-black/90 hover:scale-110 focus-visible:ring-[3px]"
              onClick={openFileDialog}
              aria-label="Change profile picture"
            >
              <ImagePlusIcon size={14} aria-hidden="true" />
            </button>
          </div>
        )}

        {/* Remove button - positioned outside the circle */}
        {!isLoading && (files[0]?.preview || profilePictureUrl) && (
          <button
            type="button"
            hidden
            className="focus-visible:border-ring focus-visible:ring-ring/50 absolute -right-1 -top-1 fle hidden size-6 cursor-pointer items-center justify-center rounded-full bg-red-500 text-white transition-all duration-200 outline-none hover:bg-red-600 hover:scale-110 focus-visible:ring-[3px] shadow-md"
            onClick={handleRemoveProfilePicture}
            aria-label="Remove profile picture"
          >
            <XIcon size={12} aria-hidden="true" />
          </button>
        )}
      </div>

      <input
        {...getInputProps()}
        onChange={handleFileChange}
        className="sr-only"
        aria-label="Upload profile picture file"
      />
    </div>
  );
}
