import {
  Dialog,
  DialogClose,
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
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { ListFilter } from "lucide-react";
import { Label } from "@/components/ui/label";
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { categories } from "@/lib/lib";

export default function ProductFilters() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // State for form values
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubCategory, setSelectedSubCategory] = useState("");
  const [selectedSort, setSelectedSort] = useState("");
  const [selectedOrder, setSelectedOrder] = useState("");
  const [publishStatus, setPublishStatus] = useState("");

  // Available subcategories based on selected category
  const availableSubCategories = selectedCategory
    ? categories[selectedCategory] || []
    : [];

  // Initialize state from URL params on component mount
  useEffect(() => {
    const category = searchParams.get("category") || "";
    const subCategory = searchParams.get("subCategory") || "";
    const sort = searchParams.get("sort") || "";
    const order = searchParams.get("order") || "";
    const status = searchParams.get("publishStatus") || "";

    setSelectedCategory(category);
    setSelectedSubCategory(subCategory);
    setSelectedSort(sort);
    setSelectedOrder(order);
    setPublishStatus(status);
  }, [searchParams]);

  // Reset subcategory when category changes
  useEffect(() => {
    if (
      selectedCategory &&
      !availableSubCategories.includes(selectedSubCategory)
    ) {
      setSelectedSubCategory("");
    }
  }, [selectedCategory, selectedSubCategory, availableSubCategories]);

  const updateURLParams = () => {
    const params = new URLSearchParams(searchParams.toString());

    // Update or remove parameters based on selections
    if (selectedCategory) {
      params.set("category", selectedCategory);
    } else {
      params.delete("category");
    }

    if (selectedSubCategory) {
      params.set("subCategory", selectedSubCategory);
    } else {
      params.delete("subCategory");
    }

    if (selectedSort) {
      params.set("sort", selectedSort);
    } else {
      params.delete("sort");
    }

    if (selectedOrder) {
      params.set("order", selectedOrder);
    } else {
      params.delete("order");
    }

    if (publishStatus) {
      params.set("publishStatus", publishStatus);
    } else {
      params.delete("publishStatus");
    }

    // Navigate to the new URL with updated parameters
    navigate(`?${params.toString()}`);
  };

  const clearFilters = () => {
    setSelectedCategory("");
    setSelectedSubCategory("");
    setSelectedSort("");
    setSelectedOrder("");
    setPublishStatus("");

    // Remove all filter parameters from URL
    const params = new URLSearchParams(searchParams.toString());
    params.delete("category");
    params.delete("subCategory");
    params.delete("sort");
    params.delete("order");
    params.delete("publishStatus");

    navigate(`?${params.toString()}`);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="h-7 gap-1">
          <ListFilter className="h-3.5 w-3.5" />
          <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
            Filter
          </span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Product Filters</DialogTitle>
          <DialogDescription>
            Filter and sort your products based on the parameters and criteria
            provided.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4">
          <div className="space-y-2">
            <div className="space-y-2">
              <Label>Publish Status</Label>
              <Select value={publishStatus} onValueChange={setPublishStatus}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Publish Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Publish Status</SelectLabel>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="archived">Archived</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Category</Label>
              <Select
                value={selectedCategory}
                onValueChange={setSelectedCategory}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Categories</SelectLabel>
                    {Object.keys(categories).map((category) => (
                      <SelectItem key={category} value={category}>
                        {category.charAt(0).toUpperCase() + category.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Sub Category</Label>
              <Select
                value={selectedSubCategory}
                onValueChange={setSelectedSubCategory}
                disabled={!selectedCategory}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a sub category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Sub Categories</SelectLabel>
                    {availableSubCategories.map((subCategory) => (
                      <SelectItem key={subCategory} value={subCategory}>
                        {subCategory.charAt(0).toUpperCase() +
                          subCategory.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Sort</Label>
              <Select value={selectedSort} onValueChange={setSelectedSort}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Sort</SelectLabel>
                    <SelectItem value="createdAt">Date Created</SelectItem>
                    <SelectItem value="name">Name</SelectItem>
                    <SelectItem value="price">Price</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Order</Label>
              <Select value={selectedOrder} onValueChange={setSelectedOrder}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Order by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Order</SelectLabel>
                    <SelectItem value="desc">Descending</SelectItem>
                    <SelectItem value="asc">Ascending</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        <DialogFooter className="gap-2 mt-2">
          <Button variant="outline" onClick={clearFilters}>
            Clear Filters
          </Button>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <DialogClose asChild>
            <Button onClick={updateURLParams}>Apply Filters</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
