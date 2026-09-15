"use client";
import { TableCell, TableRow } from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";

export default function TableSkeleton() {
  return (
    <TableRow>
      {/* Product image */}
      <TableCell>
        <Skeleton className="aspect-square rounded-md" />
      </TableCell>

      {/* Product name */}
      <TableCell className="font-medium">
        <Skeleton className="h-6 w-32" />
      </TableCell>

      {/* Publish status */}
      <TableCell>
        <Skeleton className="h-6 w-20 rounded-md" />
      </TableCell>

      {/* Price */}
      <TableCell>
        <Skeleton className="h-6 w-16" />
      </TableCell>

      {/* Stock */}
      <TableCell>
        <Skeleton className="h-6 w-12" />
      </TableCell>

      {/* Total sales */}
      <TableCell>
        <Skeleton className="h-6 w-20" />
      </TableCell>

      {/* Created at */}
      <TableCell>
        <Skeleton className="h-6 w-28" />
      </TableCell>

      {/* Actions */}
      <TableCell>
        <Button disabled size="icon" variant="ghost">
          <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
        </Button>
      </TableCell>
    </TableRow>
  );
}
