import React, { useState, useCallback, useMemo } from "react";
import { UploaderProvider } from "@/components/upload/uploader-provider";
import { ImageUploader } from "@/components/upload/multi-image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { X, Plus, Star, Image, Link, AlertCircle, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { useEdgeStore } from "@/context/edgestore-context";

export default function ProductImages({ images, onImagesChange }) {
  const { edgestore } = useEdgeStore();
  const [urlInput, setUrlInput] = useState("");
  const [urlError, setUrlError] = useState("");
  // Main image is always at index 0, so we don't need to track index
  const [isUploading, setIsUploading] = useState(false);
  const [urlValidating, setUrlValidating] = useState(false);
  const [imageErrors, setImageErrors] = useState({});

  // Validate URL format
  const isValidUrl = (url) => {
    try {
      const urlObj = new URL(url);
      return urlObj.protocol === "http:" || urlObj.protocol === "https:";
    } catch {
      return false;
    }
  };

  // Validate if URL points to a valid image
  const validateImageUrl = useCallback(async (url) => {
    return new Promise((resolve) => {
      const img = new globalThis.Image();
      img.onload = () => resolve(true);
      img.onerror = () => resolve(false);
      img.src = url;
      // Timeout after 10 seconds
      setTimeout(() => resolve(false), 15000);
    });
  }, []);

  // Handle URL submission
  const handleAddUrl = useCallback(async () => {
    const trimmedUrl = urlInput.trim();

    if (!trimmedUrl) {
      setUrlError("Please enter a URL");
      return;
    }

    if (!isValidUrl(trimmedUrl)) {
      setUrlError(
        "Please enter a valid URL (must start with http:// or https://)"
      );
      return;
    }

    if (images.includes(trimmedUrl)) {
      setUrlError("This image URL is already added");
      return;
    }

    if (images.length >= 10) {
      setUrlError("Maximum 10 images allowed");
      return;
    }

    setUrlValidating(true);
    setUrlError("");

    try {
      const isValid = await validateImageUrl(trimmedUrl);
      if (!isValid) {
        setUrlError(
          "Unable to load image from this URL. Please check the URL and try again."
        );
        return;
      }

      onImagesChange([...images, trimmedUrl]);
      setUrlInput("");
      toast.success("Image added successfully");
    } catch (error) {
      setUrlError("Failed to validate image URL");
    } finally {
      setUrlValidating(false);
    }
  }, [urlInput, images, onImagesChange, validateImageUrl]);

  // Handle file upload
  const uploadFn = useCallback(
    async ({ file, onProgressChange, signal }) => {
      try {
        setIsUploading(true);
        const res = await edgestore.myPublicImages.upload({
          file,
          signal,
          onProgressChange,
        });

        if (images.length < 10) {
          // Add new image to the end of the array
          onImagesChange((prevImages) => [...prevImages, res.url]);
          toast.success(`${file.name} uploaded successfully`);
        } else {
          toast.error("Maximum 10 images allowed");
        }

        return res;
      } catch (error) {
        console.error("Upload error:", error);
        toast.error(`Failed to upload ${file.name}`);
        throw error;
      } finally {
        setIsUploading(false);
      }
    },
    [edgestore, onImagesChange] // Remove images dependency to avoid stale closure
  );

  // Remove image
  const handleRemoveImage = useCallback(
    (index) => {
      const newImages = images.filter((_, i) => i !== index);
      onImagesChange(newImages);

      // Clear image error
      setImageErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[index];
        // Reindex remaining errors
        const reindexedErrors= {};
        Object.keys(newErrors).forEach((key) => {
          const keyIndex = parseInt(key);
          if (keyIndex > index) {
            reindexedErrors[keyIndex - 1] = newErrors[keyIndex];
          } else if (keyIndex < index) {
            reindexedErrors[keyIndex] = newErrors[keyIndex];
          }
        });
        return reindexedErrors;
      });

      toast.success("Image removed");
    },
    [images, onImagesChange]
  );

  // Set main image (move to index 0)
  const handleSetMainImage = useCallback(
    (index) => {
      if (index === 0) return; // Already main image

      const newImages = [...images];
      // Move selected image to the front
      const [selectedImage] = newImages.splice(index, 1);
      newImages.unshift(selectedImage);

      onImagesChange(newImages);

      // Update image errors to reflect new indices
      setImageErrors((prev) => {
        const newErrors = {};

        // The image that was at index 0 is now at index 1
        if (prev[0]) newErrors[1] = true;

        // The image that was at the selected index is now at index 0
        if (prev[index]) {
          newErrors[0] = true;
          delete newErrors[index];
        }

        // Adjust other indices
        Object.keys(prev).forEach((key) => {
          const keyIndex = parseInt(key);
          if (keyIndex !== 0 && keyIndex !== index) {
            if (keyIndex < index) {
              // Images before the selected one shift right by 1
              newErrors[keyIndex + 1] = prev[keyIndex];
            } else {
              // Images after the selected one shift left by 1
              newErrors[keyIndex - 1] = prev[keyIndex];
            }
          }
        });

        return newErrors;
      });

      toast.success("Main image updated");
    },
    [images, onImagesChange]
  );

  // Handle image load error
  const handleImageError = useCallback((index) => {
    setImageErrors((prev) => ({ ...prev, [index]: true }));
  }, []);

  // Handle key press for URL input
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddUrl();
    }
  };

  // Memoized image grid
  const imageGrid = useMemo(
    () => (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {images.map((image, index) => (
          <div key={`${image}-${index}`} className="relative group">
            <div
              className={`aspect-square bg-gray-100 dark:bg-gray-800 rounded-lg border-2 overflow-hidden transition-all duration-200 hover:shadow-md ${
                index === 0
                  ? "border-blue-500 ring-2 ring-blue-200 dark:ring-blue-800"
                  : "border-dashed border-gray-200 hover:border-gray-300 dark:border-gray-700 dark:hover:border-gray-600"
              }`}
            >
              {!imageErrors[index] ? (
                <div className="relative w-full h-full">
                  <img
                    src={image}
                    alt={`Product image ${index + 1}`}
                    className="w-full h-full object-cover transition-transform group-hover:scale-105"
                    onError={() => handleImageError(index)}
                  />

                  {/* Main Image Badge */}
                  {index === 0 && (
                    <div className="absolute top-2 left-2">
                      <Badge
                        variant="default"
                        className="text-xs bg-blue-500 hover:bg-blue-600 border-0"
                      >
                        <Star className="h-3 w-3 mr-1 fill-white" />
                        Main
                      </Badge>
                    </div>
                  )}
                </div>
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  <div className="text-center">
                    <AlertCircle className="h-8 w-8 mx-auto mb-1" />
                    <p className="text-xs">Failed to load</p>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="absolute top-1 right-1 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                {index !== 0 && !imageErrors[index] && (
                  <Button
                    type="button"
                    variant="secondary"
                    size="sm"
                    className="h-6 w-6 p-0 shadow-lg bg-blue-500 hover:bg-blue-600 text-white border-0"
                    onClick={() => handleSetMainImage(index)}
                    title="Set as main image"
                  >
                    <Star className="h-3 w-3" />
                  </Button>
                )}
                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  className="h-6 w-6 p-0 shadow-lg"
                  onClick={() => handleRemoveImage(index)}
                  title="Remove image"
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    ),
    [
      images,
      imageErrors,
      handleRemoveImage,
      handleSetMainImage,
      handleImageError,
    ]
  );

  return (
    <UploaderProvider uploadFn={uploadFn} autoUpload>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Image className="h-4 w-4" />
            <Label>Product Images</Label>
          </div>
          <Badge variant="secondary" className="flex items-center gap-1">
            <Image className="h-3 w-3" />
            {images.length}/10
          </Badge>
        </div>

        {/* Image Grid */}
        {images.length > 0 ? (
          imageGrid
        ) : (
          <div className="text-center py-8 border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 transition-colors">
            <Image className="h-12 w-12 mx-auto mb-2 text-gray-400" />
            <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">
              No images added yet
            </p>
            <p className="text-xs text-gray-400 dark:text-gray-500 mb-3">
              Upload images or add URLs to showcase your product
            </p>
          </div>
        )}

        {/* Upload Controls */}
        {images.length < 10 && (
          <div className="space-y-4">
            {/* URL Input */}
            <div className="flex gap-2">
              <div className="flex-1 relative">
                <Link className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  value={urlInput}
                  onChange={(e) => {
                    setUrlInput(e.target.value);
                    setUrlError("");
                  }}
                  onKeyPress={handleKeyPress}
                  placeholder="Enter image URL (https://...)"
                  className={cn("pl-10", urlError ? "border-red-500" : "")}
                  disabled={urlValidating}
                />
              </div>
              <Button
                type="button"
                onClick={handleAddUrl}
                disabled={
                  isUploading ||
                  urlValidating ||
                  !urlInput.trim() ||
                  images.includes(urlInput.trim())
                }
                size="default"
                className="min-w-20"
              >
                {urlValidating ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <>
                    <Plus className="h-4 w-4 mr-1" />
                    Add URL
                  </>
                )}
              </Button>
            </div>

            {/* File Upload */}
            <ImageUploader
              maxFiles={10 - images.length}
              maxSize={5 * 1024 * 1024} // 5 MB
              disabled={isUploading}
            />
          </div>
        )}

        {/* Error Alert */}
        {urlError && (
          <Alert className="border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950">
            <AlertCircle className="h-4 w-4 text-red-600" />
            <AlertDescription className="text-red-700 dark:text-red-200">
              {urlError}
            </AlertDescription>
          </Alert>
        )}

        {/* Helper Text */}
        <div className="text-xs text-muted-foreground space-y-1">
          <p>• Upload up to 10 images (max 5MB each)</p>
          <p>• Supported formats: JPG, PNG, GIF, WebP</p>
          <p>• First image (top-left) is always the main product image</p>
          <p>
            • Click the star icon to set any image as main (moves to first
            position)
          </p>
          <p>
            • URLs must be publicly accessible and start with http:// or
            https://
          </p>
        </div>
      </div>
    </UploaderProvider>
  );
}
