import React from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function BackButton() {
  const navigate = useNavigate();
  const handleNavigate = () => navigate(-1);
  return (
    <Button
      variant="ghost"
      type="button"
      size="icon"
      onClick={handleNavigate}
      className="size-8"
    >
      <ChevronLeft className="size-4" />
      <span className="sr-only">Back</span>
    </Button>
  );
}
