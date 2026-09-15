import { TableCell, TableRow } from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import { useCurrency } from "@/context/currency-context";
import { cn, formatCurrency } from "@/lib/utils";
import { useMemo } from "react";

export default function TableComponent({ product }) {
  const { currency, rates, loading: currencyLoading } = useCurrency();

  // Convert price from USD to selected currency for display
  const convertPrice = (amount) => {
    if (amount == null || isNaN(amount)) return 0;
    if (!rates || !rates["USD"] || !rates[currency]) return amount; // Fallback to USD
    return (amount / rates["USD"]) * rates[currency];
  };

  // Compute final price if discount and tax exist
  const finalPrice = useMemo(() => {
    const basePrice = parseFloat(product?.price) || 0;
    const discountPercent = parseFloat(product?.discount) || 0;
    const taxPercent = parseFloat(product?.tax) * 100 || 0; // Convert decimal to percentage
    const taxRate = taxPercent / 100; // Convert percentage to decimal
    const discountedPrice = basePrice * (1 - discountPercent / 100);
    return convertPrice(discountedPrice * (1 + taxRate)); // Include tax in final price
  }, [product?.price, product?.discount, product?.tax, currency, rates]);

  return (
    <TableRow>
      <TableCell>
        <img
          alt={product?.name ? `Image of ${product.name}` : "Product image"}
          src={
            product?.images && product.images.length > 0
              ? product.images[0]
              : "https://via.placeholder.com/64"
          }
          className="aspect-square rounded-md object-cover w-16 h-16 shrink-0"
        />
      </TableCell>
      <TableCell className="font-medium">
        <div className="grid gap-1">
          <p className="text-sm font-medium whitespace-nowrap lg:whitespace-pre-wrap xl:line-clamp-2">
            {product?.name || "N/A"}
          </p>
          <p className="text-sm text-muted-foreground">
            {product?.brand || "N/A"}
          </p>
        </div>
      </TableCell>
      <TableCell>
        <Badge
          variant={
            product?.publishStatus === "archived"
              ? "destructive"
              : product?.publishStatus === "draft"
              ? "secondary"
              : ""
          }
          className={cn("capitalize")}
        >
          {product?.publishStatus || "N/A"}
        </Badge>
      </TableCell>
      <TableCell>
        <div className="grid items-center gap-2">
          <span
            className="font-semibold line-clamp-1"
            aria-label={`Price: ${
              currencyLoading
                ? "Loading"
                : formatCurrency(convertPrice(product?.price || 0), currency)
            }`}
          >
            {currencyLoading
              ? "..."
              : formatCurrency(convertPrice(product?.price || 0), currency)}
          </span>
          {(product?.discount > 0 || product?.tax > 0) && (
            <span
              className="text-sm text-green-600"
              aria-label={`Final price after ${
                product?.discount
              }% discount and ${product?.tax * 100}% tax: ${formatCurrency(
                finalPrice,
                currency
              )}`}
            >
              ({formatCurrency(finalPrice, currency)})
            </span>
          )}
        </div>
      </TableCell>
      <TableCell className="whitespace-nowrap">
        {product?.stockQuantity != null
          ? product.stockQuantity.toLocaleString()
          : "N/A"}{" "}
        in stock
      </TableCell>
      <TableCell className="whitespace-nowrap">
        {product?.unitsSold != null ? product.unitsSold.toLocaleString() : "0"}{" "}
        units sold
      </TableCell>
      <TableCell className="whitespace-nowrap">
        {product?.createdAt
          ? format(new Date(product.createdAt), "do MMMM, yyyy, h:mmaaa")
          : "N/A"}
      </TableCell>
      <TableCell>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button aria-haspopup="true" size="icon" variant="ghost">
              <MoreHorizontal className="h-4 w-4" />
              <span className="sr-only">
                Toggle menu for {product?.name || "product"}
              </span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <Link to={`/dashboard/products/${product?._id}/edit`}>
              <DropdownMenuItem>Edit</DropdownMenuItem>
            </Link>
            <DropdownMenuItem className="text-destructive">
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );
}
