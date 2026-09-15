import { TableCell, TableRow } from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";

export default function TableSkeleton() {
  return (
    <TableRow>
      {/* Index */}
      <TableCell>
        <Skeleton className="h-5 w-6" />
      </TableCell>

      {/* Product image */}
      <TableCell>
        <Skeleton className="aspect-square h-10 w-10 rounded-md" />
      </TableCell>

      {/* Product name */}
      <TableCell className="font-medium">
        <Skeleton className="h-6 w-32" />
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

      {/* Publish status */}
      <TableCell>
        <Skeleton className="h-6 w-20 rounded-md" />
      </TableCell>

      {/* Created at */}
      <TableCell>
        <Skeleton className="h-6 w-28" />
      </TableCell>

      {/* Actions */}
      <TableCell className="text-right">
        <Button disabled size="icon" variant="ghost">
          <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
        </Button>
      </TableCell>
    </TableRow>
  );
}
