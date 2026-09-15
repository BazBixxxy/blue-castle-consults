import { useState } from "react";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  Phone,
  Mail,
  MapPin,
  Package,
  Calendar,
  DollarSign,
  User,
  MessageSquare,
  ArrowLeft,
  Truck,
  CheckCircle,
  Clock,
  X,
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { useLoaderData } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import orderApi from "@/services/api/orderApi";
import { useCurrency } from "@/context/currency-context";
import { formatCurrency } from "@/lib/utils";
import { useMemo } from "react";
import ChatDialog from "@/components/chat/components/ChatDialog";

const statusConfig = {
  pending: {
    label: "Pending",
    color:
      "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
    icon: Clock,
  },
  shipped: {
    label: "Shipped",
    color:
      "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
    icon: Truck,
  },
  cancelled: {
    label: "Cancelled",
    color: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
    icon: X,
  },
  fulfilled: {
    label: "Fulfilled",
    color: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
    icon: CheckCircle,
  },
};

export default function OwnerOrderDetailsPage() {
  const order = useLoaderData();
  const { currency, rates, loading: currencyLoading } = useCurrency();
  const [updating, setUpdating] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newStatus, setNewStatus] = useState("");
  const [ownerMessage, setOwnerMessage] = useState("");
  const [error, setError] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  const orderId = Array.isArray(id) ? id[0] : id;

  // Convert price from USD to selected currency for display
  const convertPrice = (amount) => {
    if (amount == null || isNaN(amount)) return 0;
    if (!rates || !rates["USD"] || !rates[currency]) return amount; // Fallback to USD
    return (amount / rates["USD"]) * rates[currency];
  };

  // Compute discounted price, subtotal, and total in USD
  const discountedPriceUSD = useMemo(() => {
    const basePrice = parseFloat(order?.product?.price) || 0;
    const discountPercent = parseFloat(order?.discount) || 0;
    return basePrice * (1 - discountPercent / 100);
  }, [order?.product?.price, order?.discount]);

  const subtotalUSD = useMemo(() => {
    const quantity = parseInt(order?.quantity) || 0;
    return discountedPriceUSD * quantity;
  }, [discountedPriceUSD, order?.quantity]);

  const shippingCostUSD = useMemo(() => {
    return parseFloat(order?.shippingCost) || 0;
  }, [order?.shippingCost]);

  const taxUSD = useMemo(() => {
    return parseFloat(order?.tax) || 0;
  }, [order?.tax]);

  const totalUSD = useMemo(() => {
    return subtotalUSD + shippingCostUSD + taxUSD;
  }, [subtotalUSD, shippingCostUSD, taxUSD]);

  // Convert to selected currency for display
  const discountedPrice = useMemo(
    () => convertPrice(discountedPriceUSD),
    [discountedPriceUSD, currency, rates]
  );
  const subtotal = useMemo(
    () => convertPrice(subtotalUSD),
    [subtotalUSD, currency, rates]
  );
  const shippingCost = useMemo(
    () => convertPrice(shippingCostUSD),
    [shippingCostUSD, currency, rates]
  );
  const tax = useMemo(() => convertPrice(taxUSD), [taxUSD, currency, rates]);
  const total = useMemo(
    () => convertPrice(totalUSD),
    [totalUSD, currency, rates]
  );

  const handleUpdateOrder = async () => {
    if (!newStatus && !ownerMessage.trim()) {
      setError("Please select a status or add a message");
      toast.error("Please select a status or add a message");
      return;
    }

    if (!orderId || !order) {
      setError("Invalid order");
      toast.error("Invalid order");
      return;
    }

    try {
      setUpdating(true);
      setError(null);

      // Handle fulfillment separately
      if (newStatus === "fulfilled") {
        const fulfillData = {
          ownerMsg:
            ownerMessage.trim() || "Order has been fulfilled successfully.",
        };

        await orderApi.fulfillOrder({
          id: orderId,
          data: fulfillData,
        });

        toast.success("Order fulfilled successfully");
      } else {
        // Handle regular status updates (shipped, cancelled)
        const updateData = {};

        if (newStatus) updateData.status = newStatus;
        if (ownerMessage.trim()) updateData.ownerMsg = ownerMessage.trim();

        await orderApi.updateOrder({
          id: orderId,
          data: updateData,
        });

        toast.success("Order updated successfully");
      }

      // Reload the page to reflect updated order data
      navigate(0);
      setIsDialogOpen(false);
      setNewStatus("");
      setOwnerMessage("");
    } catch (error) {
      console.error("Error updating order:", error);
      const errorMessage =
        error.response?.data?.message || "Failed to update order";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setUpdating(false);
    }
  };

  const handleQuickAction = (status, message) => {
    setNewStatus(status);
    if (message) setOwnerMessage(message);
    setIsDialogOpen(true);
  };

  if (!order || !orderId) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-4">Order not found</h2>
          <Button
            onClick={() => navigate(-1)}
            variant="outline"
            aria-label="Go back to orders"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Go Back
          </Button>
        </div>
      </div>
    );
  }

  const StatusIcon = statusConfig[order.status]?.icon || Clock;
  const canUpdateOrder = order.status !== "fulfilled";

  return (
    <main className="min-h-screen max-w-screen-xl mx-auto">
      <div>
        {/* Header */}
        <div className="mb-8">
          <Button
            onClick={() => navigate(-1)}
            variant="ghost"
            className="mb-4"
            aria-label="Back to orders"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Orders
          </Button>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="mt-1 text-xl">
                Ordered on{" "}
                {new Date(order.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </h1>
            </div>

            <div className="flex items-center gap-3">
              <Badge
                className={`${statusConfig[order.status]?.color} px-3 py-1`}
              >
                <StatusIcon className="w-4 h-4 mr-1" />
                {statusConfig[order.status]?.label || order.status}
              </Badge>

              <ChatDialog receiver={order.user} />
              {canUpdateOrder && (
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                  <DialogTrigger asChild>
                    <Button variant="default" aria-label="Update order status">
                      Update Order
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                      <DialogTitle>Update Order Status</DialogTitle>
                      <DialogDescription>
                        Change the order status and add a message for the
                        customer.
                      </DialogDescription>
                    </DialogHeader>

                    <div className="space-y-4 py-4">
                      {error && (
                        <div className="text-sm text-red-500">{error}</div>
                      )}
                      <div className="space-y-2">
                        <Label htmlFor="status">Status</Label>
                        <Select
                          value={newStatus}
                          onValueChange={(value) => setNewStatus(value)}
                          aria-label="Select new order status"
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select new status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="pending">Pending</SelectItem>
                            <SelectItem value="shipped">Shipped</SelectItem>
                            <SelectItem value="fulfilled">Fulfilled</SelectItem>
                            <SelectItem value="cancelled">Cancelled</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="message">Message to Customer</Label>
                        <Textarea
                          id="message"
                          placeholder="Add a message for the customer..."
                          value={ownerMessage}
                          onChange={(e) => setOwnerMessage(e.target.value)}
                          className="min-h-32"
                          aria-label="Message to customer"
                        />
                      </div>
                    </div>

                    <DialogFooter>
                      <Button
                        type="button"
                        variant="secondary"
                        onClick={() => {
                          setIsDialogOpen(false);
                          setNewStatus("");
                          setOwnerMessage(order.ownerMsg || "");
                          setError(null);
                        }}
                        aria-label="Cancel update"
                      >
                        Cancel
                      </Button>
                      <Button
                        type="button"
                        onClick={handleUpdateOrder}
                        disabled={updating || currencyLoading}
                        aria-label="Update order"
                      >
                        {updating ? "Updating..." : "Update Order"}
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Order Management & Communication */}
          <div className="lg:col-span-2 space-y-6">
            {/* Order Status & Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="w-5 h-5" />
                  Order Management
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h3 className="font-semibold text-lg">Current Status</h3>
                    <p className="text-muted-foreground text-sm">
                      Last updated{" "}
                      {formatDistanceToNow(new Date(order.updatedAt), {
                        addSuffix: true,
                      })}
                    </p>
                  </div>
                  <Badge
                    className={`${statusConfig[order.status]?.color} px-4 py-2`}
                  >
                    <StatusIcon className="w-4 h-4 mr-2" />
                    {statusConfig[order.status]?.label || order.status}
                  </Badge>
                </div>

                {canUpdateOrder && (
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <h4 className="font-medium mb-3">Quick Actions</h4>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          handleQuickAction(
                            "shipped",
                            "Your order has been shipped and is on its way!"
                          )
                        }
                        disabled={currencyLoading}
                        aria-label="Mark order as shipped"
                      >
                        Mark as Shipped
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          handleQuickAction(
                            "fulfilled",
                            "Your order has been completed successfully!"
                          )
                        }
                        disabled={currencyLoading}
                        aria-label="Mark order as fulfilled"
                      >
                        Mark as Fulfilled
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          handleQuickAction(
                            "cancelled",
                            "Unfortunately, we had to cancel your order."
                          )
                        }
                        disabled={currencyLoading}
                        aria-label="Cancel order"
                      >
                        Cancel Order
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setNewStatus("");
                          setIsDialogOpen(true);
                        }}
                        disabled={currencyLoading}
                        aria-label="Add message to customer"
                      >
                        Add Message
                      </Button>
                    </div>
                  </div>
                )}

                {!canUpdateOrder && (
                  <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                    <p className="text-sm text-green-700 font-medium">
                      ✅ This order has been fulfilled and cannot be edited
                      further.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Messages & Communication */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="w-5 h-5" />
                  Order Communication
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {order.customerMsg && (
                  <div className="p-4 bg-muted/40 border rounded-lg">
                    <div className="flex items-start gap-3">
                      <img
                        src={
                          order.user?.profilePicture ||
                          "https://via.placeholder.com/32"
                        }
                        alt={`${order.user?.firstName || ""} ${
                          order.user?.lastName || ""
                        } avatar`}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                      <div className="flex-1">
                        <p className="text-sm font-medium mb-1">
                          {(order.user?.firstName || "") +
                            " " +
                            (order.user?.lastName || "") || "Customer"}
                        </p>
                        <p className="text-sm text-muted-foreground mb-2">
                          {order.createdAt
                            ? formatDistanceToNow(new Date(order.createdAt), {
                                addSuffix: true,
                              })
                            : "N/A"}
                        </p>
                        <p className="text-sm">{order.customerMsg}</p>
                      </div>
                    </div>
                  </div>
                )}

                {order.ownerMsg && (
                  <div className="p-4 border bg-muted/40 rounded-lg">
                    <div className="flex items-start gap-3">
                      <img
                        src={
                          order.product?.owner?.profilePicture ||
                          "https://via.placeholder.com/32"
                        }
                        alt={`${order.product?.owner?.firstName || ""} ${
                          order.product?.owner?.lastName || ""
                        } avatar`}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                      <div className="flex-1">
                        <p className="text-sm font-medium mb-1">Your Message</p>
                        <p className="text-sm text-muted-foreground mb-2">
                          {order.updatedAt
                            ? formatDistanceToNow(new Date(order.updatedAt), {
                                addSuffix: true,
                              })
                            : "N/A"}
                        </p>
                        <p className="text-sm">{order.ownerMsg}</p>
                      </div>
                    </div>
                  </div>
                )}

                {!order.customerMsg && !order.ownerMsg && (
                  <div className="text-center py-8 text-muted-foreground">
                    <MessageSquare className="w-8 h-8 mx-auto mb-2 opacity-50" />
                    <p className="text-sm">No messages yet</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Product Summary (Condensed) */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="w-5 h-5" />
                  Product Summary
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-start gap-4">
                  <div className="w-20 h-20 bg-muted rounded-lg overflow-hidden flex-shrink-0">
                    <img
                      src={
                        order.product?.images?.[0] ||
                        "https://via.placeholder.com/80"
                      }
                      alt={
                        order.product?.name
                          ? `Image of ${order.product.name}`
                          : "Product image"
                      }
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 space-y-2">
                    <h3 className="font-semibold">
                      {order.product?.name || "N/A"}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {order.product?.brand || "N/A"}
                    </p>
                    <div className="flex items-center gap-4 text-sm">
                      <span>
                        Qty: {order.quantity != null ? order.quantity : "N/A"}
                      </span>
                      <span>
                        Price:{" "}
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
                        {order.discount > 0 && (
                          <span
                            className="text-green-700  ml-2"
                            aria-label={`Discounted price after ${
                              order.discount
                            }% discount: ${formatCurrency(
                              discountedPrice,
                              currency
                            )}`}
                          >
                            ({formatCurrency(discountedPrice, currency)})
                          </span>
                        )}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary & Customer Info */}
          <div className="space-y-6">
            {/* Customer Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5" />
                  Customer Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <img
                    src={
                      order.user?.profilePicture ||
                      "https://via.placeholder.com/48"
                    }
                    alt={`${order.user?.firstName || ""} ${
                      order.user?.lastName || ""
                    } avatar`}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-semibold">
                      {(order.user?.firstName || "") +
                        " " +
                        (order.user?.lastName || "") || "N/A"}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {order.user?.gender || "N/A"}
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Mail className="w-4 h-4 text-muted-foreground shrink-0" />
                    <a
                      href={`mailto:${order.user?.email || ""}`}
                      className="text-primary hover:text-primary/80 transition-colors"
                      aria-label={`Email ${order.user?.email || "customer"}`}
                    >
                      {order.user?.email || "N/A"}
                    </a>
                  </div>

                  <div className="flex items-center gap-3">
                    <Phone className="w-4 h-4 text-muted-foreground shrink-0" />
                    <a
                      href={`tel:${order.user?.phoneNumber || ""}`}
                      className="text-primary hover:text-primary/80 transition-colors"
                      aria-label={`Call ${
                        order.user?.phoneNumber || "customer"
                      }`}
                    >
                      {order.user?.phoneNumber || "N/A"}
                    </a>
                  </div>

                  <div className="flex items-start gap-3">
                    <MapPin className="w-4 h-4 text-muted-foreground shrink-0 mt-0.5" />
                    <span className="text-sm">
                      {order.user?.address || "N/A"}
                    </span>
                  </div>
                </div>

                <Button
                  className="w-full"
                  variant="outline"
                  asChild
                  aria-label={`Call customer ${order.user?.firstName || ""} ${
                    order.user?.lastName || ""
                  }`}
                >
                  <a href={`tel:${order.user?.phoneNumber || ""}`}>
                    <Phone className="w-4 h-4 mr-2" />
                    Call Customer
                  </a>
                </Button>
              </CardContent>
            </Card>

            {/* Order Summary */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="w-5 h-5" />
                  Order Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      Subtotal (
                      {order.quantity != null ? order.quantity : "N/A"} items)
                    </span>
                    <span
                      aria-label={`Subtotal: ${
                        currencyLoading
                          ? "Loading"
                          : formatCurrency(subtotal, currency)
                      }`}
                    >
                      {currencyLoading
                        ? "..."
                        : formatCurrency(subtotal, currency)}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Shipping</span>
                    <span
                      aria-label={`Shipping cost: ${
                        currencyLoading
                          ? "Loading"
                          : formatCurrency(shippingCost, currency)
                      }`}
                    >
                      {currencyLoading
                        ? "..."
                        : formatCurrency(shippingCost, currency)}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Tax</span>
                    <span
                      aria-label={`Tax: ${
                        currencyLoading
                          ? "Loading"
                          : formatCurrency(tax, currency)
                      }`}
                    >
                      {currencyLoading ? "..." : formatCurrency(tax, currency)}
                    </span>
                  </div>

                  <Separator />

                  <div className="flex justify-between font-semibold text-lg">
                    <span>Total ({currency})</span>
                    <span
                      className="text-green-600"
                      aria-label={`Total: ${
                        currencyLoading
                          ? "Loading"
                          : formatCurrency(total, currency)
                      }`}
                    >
                      {currencyLoading
                        ? "..."
                        : formatCurrency(total, currency)}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Order Timeline */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  Order Timeline
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-sm">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <div>
                      <p className="font-medium">Order Created</p>
                      <p className="text-muted-foreground">
                        {order.createdAt
                          ? new Date(order.createdAt).toLocaleString()
                          : "N/A"}
                      </p>
                    </div>
                  </div>

                  {order.updatedAt !== order.createdAt && (
                    <div className="flex items-center gap-3 text-sm">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <div>
                        <p className="font-medium">Last Updated</p>
                        <p className="text-muted-foreground">
                          {order.updatedAt
                            ? new Date(order.updatedAt).toLocaleString()
                            : "N/A"}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </main>
  );
}
