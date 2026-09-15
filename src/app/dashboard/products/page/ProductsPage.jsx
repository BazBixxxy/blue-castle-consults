import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { File, PlusCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import productApi from "@/services/api/productApi";
import BackButton from "@/components/back-button";
import ProductFilters from "../components/product-filters";
import { Link } from "react-router-dom";
import TableSkeleton from "../components/table-skeleton";
import TableComponent from "../components/table-component";

export default function Page() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [pagination, setPagination] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const res = await productApi.fetchOwnerProducts({ params: searchParams });
        const response = res.data;

        setProducts(response.data);
        setPagination(response.pagination);
      } catch (error) {
        console.error("Error fetching products:", error);
        toast.error(
          error.response?.data?.message || "Failed to fetch products"
        );
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [searchParams]);

  const handlePageChange = (page) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page.toString());
    navigate(`?${params.toString()}`);
  };

  const generatePaginationItems = () => {
    if (!pagination) return [];

    const { currentPage, totalPages } = pagination;
    const items = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      // Show all pages if total is less than max visible
      for (let i = 1; i <= totalPages; i++) {
        items.push(i);
      }
    } else {
      // Show ellipsis logic for many pages
      if (currentPage <= 3) {
        // Show first few pages
        for (let i = 1; i <= 4; i++) {
          items.push(i);
        }
        items.push("ellipsis");
        items.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        // Show last few pages
        items.push(1);
        items.push("ellipsis");
        for (let i = totalPages - 3; i <= totalPages; i++) {
          items.push(i);
        }
      } else {
        // Show middle pages
        items.push(1);
        items.push("ellipsis");
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          items.push(i);
        }
        items.push("ellipsis");
        items.push(totalPages);
      }
    }

    return items;
  };

  return (
    <main className="max-w-screen-xl mx-auto">
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-2">
          <BackButton />
          <h1 className="text-xl font-semibold">My Product Catalogue</h1>
        </div>
        <div className="ml-auto flex flex-wrap items-center gap-2">
          <ProductFilters />
          <Button size="sm" variant="outline" className="h-7 gap-1" hidden>
            <File className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              Export
            </span>
          </Button>
          <Link to={`/dashboard/products/add`}>
            <Button size="sm" className="h-7 gap-1">
              <PlusCircle className="h-3.5 w-3.5" />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                Add Product
              </span>
            </Button>
          </Link>
        </div>
      </div>

      <Card x-chunk="dashboard-06-chunk-0" className="mt-4 lg:w-full">
        <CardHeader>
          <CardTitle>Products</CardTitle>
          <CardDescription>
            Manage your products and view their sales performance.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableCaption>
              <div className="text-xs text-muted-foreground">
                {pagination && (
                  <>
                    Showing{" "}
                    <strong>
                      {pagination.startIndex + 1}-
                      {Math.min(
                        pagination.startIndex + pagination.itemsPerPage,
                        pagination.totalItems
                      )}
                    </strong>{" "}
                    of <strong>{pagination.totalItems}</strong> products
                  </>
                )}
              </div>
            </TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px] shrink-0">
                  <span className="sr-only">Image</span>
                </TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead>Total Sales</TableHead>
                <TableHead>Created at</TableHead>
                <TableHead>
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading
                ? Array.from({ length: pagination?.itemsPerPage || 5 }).map(
                    (_, i) => <TableSkeleton key={i} />
                  )
                : products.map((product) => (
                    <TableComponent product={product} key={product._id} />
                  ))}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter>
          {pagination && pagination.totalPages > 1 && (
            <div className="w-full flex justify-center">
              <Pagination>
                <PaginationContent>
                  {pagination.hasPrevious && (
                    <PaginationItem>
                      <PaginationPrevious
                        onClick={() =>
                          handlePageChange(pagination.currentPage - 1)
                        }
                        className="cursor-pointer"
                      />
                    </PaginationItem>
                  )}

                  {generatePaginationItems().map((item, index) => (
                    <PaginationItem key={index}>
                      {item === "ellipsis" ? (
                        <PaginationEllipsis />
                      ) : (
                        <PaginationLink
                          onClick={() => handlePageChange(item)}
                          isActive={item === pagination.currentPage}
                          className="cursor-pointer"
                        >
                          {item}
                        </PaginationLink>
                      )}
                    </PaginationItem>
                  ))}

                  {pagination.hasNext && (
                    <PaginationItem>
                      <PaginationNext
                        onClick={() =>
                          handlePageChange(pagination.currentPage + 1)
                        }
                        className="cursor-pointer"
                      />
                    </PaginationItem>
                  )}
                </PaginationContent>
              </Pagination>
            </div>
          )}

          {/* Show pagination info */}
          {pagination && (
            <div className="flex items-center justify-between text-xs text-muted-foreground mt-4">
              <div>
                Page {pagination.currentPage} of {pagination.totalPages}
              </div>
              <div>{pagination.itemsPerPage} items per page</div>
            </div>
          )}
        </CardFooter>
      </Card>
    </main>
  );
}
