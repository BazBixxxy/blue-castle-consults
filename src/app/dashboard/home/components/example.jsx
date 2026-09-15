import { useState } from "react";
import { ImagePlusIcon, UploadIcon } from "lucide-react";
import { useEdgeStore } from "@/context/edgestore-context";
import { Button } from "@/components/ui/button";

export default function Example() {
  const [file, setFile] = useState(null);
  const [image, setImage] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const { edgestore } = useEdgeStore();

  return (
    <div className="max-w-md mx-auto space-y-4 p-4 rounded-2xl border bg-card shadow-sm">
      <h2 className="text-lg font-semibold">Upload an Image</h2>

      {/* File input */}
      <label className="flex w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/30 bg-muted/40 p-6 text-center hover:border-primary transition">
        <ImagePlusIcon className="mb-2 h-8 w-8 text-muted-foreground" />
        <span className="text-sm text-muted-foreground">
          {file ? file.name : "Click to choose an image"}
        </span>
        <input
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            if (e.target.files?.[0]) {
              setFile(e.target.files[0]);
            }
          }}
        />
      </label>

      {/* Upload button */}
      <Button
        onClick={async () => {
          if (!file) return;
          const res = await edgestore.myPublicImages.upload({ file });
          setImage(res.url);
          setThumbnail(res.thumbnailUrl || "");
        }}
        disabled={!file}
        className="w-full"
      >
        <UploadIcon className="mr-2 h-4 w-4" />
        Upload
      </Button>

      {/* Preview */}
      {image && (
        <div className="space-y-2">
          <p className="text-sm font-medium">Preview:</p>
          <div className="flex items-center gap-4">
            <img
              src={image}
              alt="Uploaded thumbnail"
              className="h-20 w-20 rounded-md object-cover border"
            />
            <a
              href={image}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-primary underline"
            >
              View full image
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
