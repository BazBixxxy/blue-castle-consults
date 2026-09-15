import { useEffect, useState, useCallback } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  CircleCheck,
  CircleX,
  ChevronLeft,
  ChevronRight,
  Clock,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import orderApi from "@/services/api/orderApi";
import BackButton from "@/components/back-button";
import TableSkeleton from "../components/table-skeleton";
import TableComponent from "../components/table-components";
import { Truck } from "lucide-react";

export default function DashboardOrdersPage() {
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState("all");
  const [orders, setOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    itemsPerPage: 10,
    hasMore: false,
    hasPrevious: false,
    hasNext: false,
    prevPage: null,
    nextPage: null,
    startIndex: 0,
    nextIndex: null,
  });

  const fetchOrders = useCallback(async (page = 1, orderStatus = "all") => {
    setLoading(true);
    try {
      const params = {
        page,
        limit: 10,
      };

      if (orderStatus !== "all") {
        params.status = orderStatus;
      }

      const res = await orderApi.ownerOrders({ params });
      const response = res.data;

      setOrders(response.data);
      // Update pagination state with the response data
      setPagination(response.pagination);
      setCurrentPage(response.pagination.currentPage);
    } catch (error) {
      console.error("Error fetching orders:", error);
      toast.error(error.response?.data?.message || "Failed to fetch orders");
      setOrders([]);
      // Reset pagination on error
      setPagination({
        currentPage: 1,
        totalPages: 1,
        totalItems: 0,
        itemsPerPage: 10,
        hasMore: false,
        hasPrevious: false,
        hasNext: false,
        prevPage: null,
        nextPage: null,
        startIndex: 0,
        nextIndex: null,
      });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchOrders(1, status);
  }, [fetchOrders, status]);

  const handleStatusChange = (newStatus) => {
    setStatus(newStatus);
    setCurrentPage(1);
    fetchOrders(1, newStatus);
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= pagination.totalPages) {
      setCurrentPage(page);
      fetchOrders(page, status);
    }
  };

  const getFilteredOrdersCount = () => {
    return pagination.totalItems;
  };

  // Generate page numbers for pagination display
  const getPageNumbers = () => {
    const pages = [];
    const { currentPage, totalPages } = pagination;

    // Always show first page
    if (totalPages > 0) pages.push(1);

    // Show ellipsis and pages around current page for larger page counts
    if (totalPages > 7) {
      if (currentPage > 4) pages.push("...");

      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) {
        if (!pages.includes(i)) pages.push(i);
      }

      if (currentPage < totalPages - 3) pages.push("...");
      if (totalPages > 1) pages.push(totalPages);
    } else {
      // Show all pages for smaller page counts
      for (let i = 2; i <= totalPages; i++) {
        pages.push(i);
      }
    }

    return pages;
  };

  return (
    <main className="max-w-[1500px] mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <BackButton />
          <div>
            <h1 className="text-3xl font-bold">Orders</h1>
            <p className="text-muted-foreground">
              View and manage your recent orders.
              {!loading && (
                <span className="ml-1">
                  ({getFilteredOrdersCount()}{" "}
                  {getFilteredOrdersCount() === 1 ? "order" : "orders"})
                </span>
              )}
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <Select
            value={status}
            onValueChange={handleStatusChange}
            disabled={loading}
          >
            <SelectTrigger className="w-full sm:w-[200px]">
              <SelectValue placeholder="Select order status" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Status</SelectLabel>
                <SelectItem value="all">All Orders</SelectItem>
                <SelectItem value="pending">
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 text-yellow-600 mr-2" />
                    Pending Orders
                  </div>
                </SelectItem>
                <SelectItem value="shipped">
                  <div className="flex items-center">
                    <Truck className="w-4 h-4 text-orange-600 mr-2" />
                    Shipped Orders
                  </div>
                </SelectItem>
                <SelectItem value="fulfilled">
                  <div className="flex items-center">
                    <CircleCheck className="w-4 h-4 text-green-600 mr-2" />
                    Fulfilled Orders
                  </div>
                </SelectItem>
                <SelectItem value="cancelled">
                  <div className="flex items-center">
                    <CircleX className="w-4 h-4 text-destructive mr-2" />
                    Cancelled Orders
                  </div>
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Orders Table */}
      <Card className="mt-4 lg:w-full">
        <CardHeader className="px-6 pt-6 pb-0">
          <CardTitle className="text-base font-semibold">Order List</CardTitle>
          <CardDescription></CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">
                    <span className="sr-only">Image</span>
                  </TableHead>
                  <TableHead>Order</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead className="text-center whitespace-nowrap">
                    Items/Quantity
                  </TableHead>
                  <TableHead className="text-center whitespace-nowrap">
                    Status
                  </TableHead>
                  <TableHead className="text-center whitespace-nowrap">
                    Unit Price
                  </TableHead>
                  <TableHead className="text-center whitespace-nowrap">
                    Discount
                  </TableHead>
                  <TableHead className="text-center whitespace-nowrap">
                    Total Amount
                  </TableHead>
                  <TableHead className="text-center whitespace-nowrap">
                    Date
                  </TableHead>
                  <TableHead className="w-[50px]">
                    <span className="sr-only">Actions</span>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  // Show skeleton loading
                  Array.from({ length: 5 }).map((_, i) => (
                    <TableSkeleton key={i} />
                  ))
                ) : orders.length === 0 ? (
                  // Show empty state
                  <TableRow>
                    <td colSpan={11} className="h-32 text-center">
                      <div className="flex flex-col items-center justify-center space-y-2">
                        <div className="text-muted-foreground">
                          {status === "all"
                            ? "No orders found"
                            : `No ${status} orders found`}
                        </div>
                        {status !== "all" && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleStatusChange("all")}
                          >
                            View all orders
                          </Button>
                        )}
                      </div>
                    </td>
                  </TableRow>
                ) : (
                  // Show orders
                  orders.map((order, i) => (
                    <TableComponent
                      order={order}
                      key={order._id}
                      index={i}
                      setOrders={setOrders}
                    />
                  ))
                )}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          {!loading && pagination.totalPages > 1 && (
            <div className="flex items-center justify-between space-x-2 py-4">
              <div className="flex-1 text-sm text-muted-foreground">
                Showing {pagination.startIndex + 1} to{" "}
                {Math.min(
                  pagination.startIndex + pagination.itemsPerPage,
                  pagination.totalItems
                )}{" "}
                of {pagination.totalItems} results
              </div>

              <div className="flex items-center space-x-2">
                {/* Previous button */}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={!pagination.hasPrevious || loading}
                >
                  <ChevronLeft className="h-4 w-4" />
                  Previous
                </Button>

                {/* Page numbers */}
                <div className="flex items-center space-x-1">
                  {getPageNumbers().map((page, index) => (
                    <div key={index}>
                      {page === "..." ? (
                        <span className="px-3 py-2 text-sm text-muted-foreground">
                          ...
                        </span>
                      ) : (
                        <Button
                          variant={currentPage === page ? "default" : "outline"}
                          size="sm"
                          onClick={() => handlePageChange(page)}
                          disabled={loading}
                          className="min-w-[40px]"
                        >
                          {page}
                        </Button>
                      )}
                    </div>
                  ))}
                </div>

                {/* Next button */}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={!pagination.hasNext || loading}
                >
                  Next
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </main>
  );
}
