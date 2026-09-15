import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CircleCheck, Clock, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn, formatCurrency } from "@/lib/utils";
import { TableCell, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { formatDistanceToNow } from "date-fns";
import { toast } from "sonner";
import orderApi from "@/services/api/orderApi";
import { Link } from "react-router-dom";
import { MoreHorizontal } from "lucide-react";
import { useCurrency } from "@/context/currency-context";
import { useMemo } from "react";

export default function TableComponent({ order, index, setOrders }) {
  const { currency, rates, loading: currencyLoading } = useCurrency();

  // Convert price from USD to selected currency for display
  const convertPrice = (amount) => {
    if (amount == null || isNaN(amount)) return 0;
    if (!rates || !rates["USD"] || !rates[currency]) return amount; // Fallback to USD
    return (amount / rates["USD"]) * rates[currency];
  };

  // Compute discounted price and total
  const discountedPrice = useMemo(() => {
    const basePrice = parseFloat(order?.product?.price) || 0;
    const discountPercent = parseFloat(order?.discount) || 0;
    return basePrice * (1 - discountPercent / 100); // keep in USD
  }, [order?.product?.price, order?.discount]);

  const total = useMemo(() => {
    const quantity = parseInt(order?.quantity) || 0;
    const shippingCost = parseFloat(order?.shippingCost) || 0;
    const tax = parseFloat(order?.tax) || 0;
    const totalUSD = discountedPrice * quantity + shippingCost + tax;
    return convertPrice(totalUSD); // convert once
  }, [
    discountedPrice,
    order?.quantity,
    order?.shippingCost,
    order?.tax,
    currency,
    rates,
  ]);

  const updateOrder = async (orderId) => {
    try {
      await orderApi.updateOrder({
        id: orderId,
        params: { status: "cancelled" },
      });
      setOrders((prev) =>
        prev.map((o) => (o._id === orderId ? { ...o, status: "cancelled" } : o))
      );
      toast.success("Order cancelled successfully");
    } catch (error) {
      console.error("Error cancelling order:", error);
      toast.error(error.response?.data?.message || "Failed to cancel order");
    }
  };

  // Get status color to match ProductForm, EditProductForm, and product TableComponent
  const getStatusColor = (status) => {
    switch (status) {
      case "fulfilled":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "pending":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
      case "shipped":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200";
      case "cancelled":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <TableRow
      className={cn(
        "hover:bg-muted/50 transition-colors",
        index % 2 === 0 ? "bg-background" : "bg-accent/20"
      )}
    >
      {/* Product Image */}
      <TableCell>
        <img
          alt={
            order?.product?.name
              ? `Image of ${order.product.name}`
              : "Product image"
          }
          src={
            order?.product?.images && order.product.images.length > 0
              ? order.product.images[0]
              : "https://via.placeholder.com/64"
          }
          className="aspect-square rounded-md object-cover w-16 h-16"
        />
      </TableCell>

      {/* Product Info */}
      <TableCell className="font-medium whitespace-nowrap">
        <div className="grid gap-1">
          <p className="text-sm font-medium leading-none">
            {order?.product?.name || "N/A"}
          </p>
          <p className="text-xs text-muted-foreground">
            {order?.product?.brand || "N/A"}
          </p>
        </div>
      </TableCell>

      {/* Customer */}
      <TableCell className="flex items-center gap-4">
        <Avatar className="h-9 w-9 sm:flex">
          <AvatarImage
            src={order?.user?.profilePicture || ""}
            alt={`${order?.user?.firstName || ""} ${
              order?.user?.lastName || ""
            } avatar`}
            className="object-cover"
          />
          <AvatarFallback>
            {(order?.user?.firstName?.[0] || "") +
              (order?.user?.lastName?.[0] || "") || "N/A"}
          </AvatarFallback>
        </Avatar>
        <div className="grid gap-1">
          <p className="text-sm font-medium leading-none whitespace-nowrap">
            {(order?.user?.firstName || "") +
              " " +
              (order?.user?.lastName || "") || "N/A"}
          </p>
          <p className="text-sm text-muted-foreground whitespace-nowrap">
            {order?.user?.email || "N/A"}
          </p>
        </div>
      </TableCell>

      {/* Quantity */}
      <TableCell className="text-center whitespace-nowrap">
        {order?.quantity != null ? order.quantity : "N/A"}
      </TableCell>

      {/* Status */}
      <TableCell className="text-center whitespace-nowrap">
        <Badge className={getStatusColor(order?.status)}>
          {order?.status === "shipped" && <Truck className="mr-1 size-4" />}
          {order?.status === "pending" && <Clock className="mr-1 size-4" />}
          {order?.status === "fulfilled" && (
            <CircleCheck className="mr-1 size-4" />
          )}
          {order?.status
            ? order.status.charAt(0).toUpperCase() + order.status.slice(1)
            : "N/A"}
        </Badge>
      </TableCell>

      {/* Price */}
      <TableCell className="text-center">
        <div className="grid items-center justify-center gap-2">
          <span
            className="font-semibold"
            aria-label={`Original price: ${
              currencyLoading
                ? "Loading"
                : formatCurrency(
                    convertPrice(order?.product?.price || 0),
                    currency
                  )
            }`}
          >
            {currencyLoading
              ? "..."
              : formatCurrency(
                  convertPrice(order?.product?.price || 0),
                  currency
                )}
          </span>
          {order?.discount > 0 && (
            <span
              className="text-sm text-green-600"
              aria-label={`Discounted price after ${
                order.discount
              }% discount: ${formatCurrency(discountedPrice, currency)}`}
            >
              ({formatCurrency(discountedPrice, currency)})
            </span>
          )}
        </div>
      </TableCell>

      {/* Discount */}
      <TableCell className="text-center whitespace-nowrap">
        {order?.discount > 0 ? `${order.discount}%` : "-"}
      </TableCell>

      {/* Total */}
      <TableCell className="text-center whitespace-nowrap">
        <span
          className="font-semibold"
          aria-label={`Total price: ${
            currencyLoading ? "Loading" : formatCurrency(total, currency)
          }`}
        >
          {currencyLoading ? "..." : formatCurrency(total, currency)}
        </span>
      </TableCell>

      {/* CreatedAt */}
      <TableCell className="text-center whitespace-nowrap">
        {order?.createdAt
          ? formatDistanceToNow(new Date(order.createdAt), { addSuffix: true })
          : "N/A"}
      </TableCell>

      {/* Actions */}
      <TableCell className="w-[50px]">
        <DropdownMenu>
          <DropdownMenuTrigger asChild className="w-full h-full">
            <Button variant="ghost" size="icon">
              <MoreHorizontal className="size-5" />
              <span className="sr-only">
                Actions for order {order?._id || "unknown"}
              </span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <Link to={`/dashboard/orders/${order?._id}`} className="contents">
              <DropdownMenuItem>View Details</DropdownMenuItem>
            </Link>
            {(order?.status === "pending" || order?.status === "shipped") && (
              <DropdownMenuItem onClick={() => updateOrder(order?._id)}>
                Cancel Order
              </DropdownMenuItem>
            )}
            <DropdownMenuSeparator />
            <DropdownMenuItem>Contact Support</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );
}
