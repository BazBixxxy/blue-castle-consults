import React, { useState, useCallback, useMemo, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  X,
  Plus,
  DollarSign,
  Package,
  Tag,
  Truck,
  CheckCircle,
} from "lucide-react";
import { cn, formatCurrency } from "@/lib/utils";
import { useCurrency } from "@/context/currency-context";
import useUpdateProduct from "../hooks/useUpdateProduct";
import ProductImages from "../../add/components/product-images";
import { categories } from "@/lib/lib";
import { Loader2 } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export default function EditProductForm({ product }) {
  const { loading, updateProduct } = useUpdateProduct();
  const { currency, rates, loading: currencyLoading } = useCurrency();

  // Convert price from USD to selected currency for display
  const convertPrice = (amount) => {
    if (amount == null || isNaN(amount)) return 0;
    if (!rates || !rates["USD"] || !rates[currency]) return amount; // Fallback to USD
    return (amount / rates["USD"]) * rates[currency];
  };

  // Form state
  const [formData, setFormData] = useState({
    name: product?.name || "",
    brand: product?.brand || "",
    category: product?.category || "",
    subCategory: product?.subCategory || "",
    price: product?.price?.toString() || "0",
    discount: product?.discount?.toString() || "0",
    stock: product?.stockQuantity?.toString() || "0",
    description: product?.description || "",
    shippingCost: product?.shippingCost?.toString() || "0",
    tax: product?.tax ? (product.tax * 100).toString() : "", // Convert decimal to percentage
    publishStatus: product?.publishStatus || "draft",
  });

  // Array fields
  const [shippingDetails, setShippingDetails] = useState(
    product?.shippingDetails?.map((detail) =>
      detail.includes("Free shipping on orders over")
        ? `Free shipping on orders over ${formatCurrency(50, currency)}`
        : detail
    ) || []
  );
  const [returnPolicy, setReturnPolicy] = useState(product?.returnPolicy || []);
  const [images, setImages] = useState(product?.images || []);

  // Local inputs for adding new items
  const [newShipping, setNewShipping] = useState("");
  const [newReturn, setNewReturn] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [errors, setErrors] = useState({});

  // Computed values
  const finalPrice = useMemo(() => {
    const basePrice = parseFloat(formData.price) || 0;
    const discountPercent = parseFloat(formData.discount) || 0;
    const taxPercent = parseFloat(formData.tax) || 0;
    const taxRate = taxPercent / 100; // Convert percentage to decimal
    const discountedPrice = basePrice * (1 - discountPercent / 100);
    return convertPrice(discountedPrice * (1 + taxRate)); // Include tax in final price
  }, [formData.price, formData.discount, formData.tax, currency, rates]);

  // Get subcategories based on selected category
  const subCategories = useMemo(() => {
    return formData.category ? categories[formData.category] || [] : [];
  }, [formData.category]);

  const isFormValid = useMemo(() => {
    return (
      formData.name.trim() &&
      formData.category &&
      formData.price &&
      parseFloat(formData.price) > 0 &&
      formData.stock &&
      parseInt(formData.stock) >= 0 &&
      formData.description.trim() &&
      images.length > 0 &&
      (formData.tax === "" || parseFloat(formData.tax) >= 0) // Allow empty tax or non-negative
    );
  }, [formData, images]);

  // Update shipping details when currency changes
  useEffect(() => {
    setShippingDetails((prev) => {
      const updatedDetails = prev.filter(
        (detail) => !detail.includes("Free shipping on orders over")
      );
      return [
        ...updatedDetails,
        `Free shipping on orders over ${formatCurrency(50, currency)}`,
      ];
    });
  }, [currency, rates]);

  // Handlers
  const updateFormData = useCallback(
    (field, value) => {
      setFormData((prev) => ({
        ...prev,
        [field]: value,
      }));
      // Clear error when user starts typing
      if (errors[field]) {
        setErrors((prev) => ({ ...prev, [field]: "" }));
      }
    },
    [errors]
  );

  const handleCategoryChange = useCallback((value) => {
    setFormData((prev) => ({
      ...prev,
      category: value,
      subCategory: "", // Reset subcategory when category changes
    }));
  }, []);

  const addShippingDetail = useCallback(() => {
    if (newShipping.trim() && !shippingDetails.includes(newShipping.trim())) {
      setShippingDetails((prev) => [...prev, newShipping.trim()]);
      setNewShipping("");
    }
  }, [newShipping, shippingDetails]);

  const removeShippingDetail = useCallback((index) => {
    setShippingDetails((prev) => prev.filter((_, i) => i !== index));
  }, []);

  const addReturnPolicy = useCallback(() => {
    if (newReturn.trim() && !returnPolicy.includes(newReturn.trim())) {
      setReturnPolicy((prev) => [...prev, newReturn.trim()]);
      setNewReturn("");
    }
  }, [newReturn, returnPolicy]);

  const removeReturnPolicy = useCallback((index) => {
    setReturnPolicy((prev) => prev.filter((_, i) => i !== index));
  }, []);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Product name is required";
    if (!formData.category) newErrors.category = "Category is required";
    if (!formData.price || parseFloat(formData.price) <= 0) {
      newErrors.price = "Valid price is required";
    }
    if (!formData.stock || parseInt(formData.stock) < 0) {
      newErrors.stock = "Valid stock quantity is required";
    }
    if (!formData.description.trim())
      newErrors.description = "Description is required";
    if (images.length === 0)
      newErrors.images = "At least one image is required";
    if (formData.shippingCost && parseFloat(formData.shippingCost) < 0) {
      newErrors.shippingCost = "Shipping cost cannot be negative";
    }
    if (formData.tax && parseFloat(formData.tax) < 0) {
      newErrors.tax = "Tax rate cannot be negative";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const resetForm = useCallback(() => {
    if (product) {
      setFormData({
        name: product.name || "",
        brand: product.brand || "",
        category: product.category || "",
        subCategory: product.subCategory || "",
        price: product.price?.toString() || "0",
        discount: product.discount?.toString() || "0",
        stock: product.stockQuantity?.toString() || "0",
        description: product.description || "",
        shippingCost: product.shippingCost?.toString() || "0",
        tax: product.tax ? (product.tax * 100).toString() : "", // Convert decimal to percentage
        publishStatus: product.publishStatus || "draft",
      });
      setShippingDetails(
        product.shippingDetails?.map((detail) =>
          detail.includes("Free shipping on orders over")
            ? `Free shipping on orders over ${formatCurrency(50, currency)}`
            : detail
        ) || []
      );
      setReturnPolicy(product.returnPolicy || []);
      setImages(product.images || []);
      setNewShipping("");
      setNewReturn("");
      setErrors({});
      setSubmitSuccess(false);
    }
  }, [product, currency]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitSuccess(false);

    try {
      const updatedProduct = {
        ...formData,
        price: parseFloat(formData.price) || 0, // Keep in USD
        discount: parseFloat(formData.discount) || 0,
        stockQuantity: parseInt(formData.stock, 10) || 0,
        shippingCost: parseFloat(formData.shippingCost) || 0, // Keep in USD
        tax: parseFloat(formData.tax) / 100 || 0, // Convert percentage to decimal
        shippingDetails,
        returnPolicy,
        images,
      };

      await updateProduct(updatedProduct);
      setSubmitSuccess(true);
      setErrors({ submit: null }); // Clear any previous submit errors
      setTimeout(() => resetForm(), 2000); // Reset form after success
    } catch (error) {
      console.error("Error updating product:", error);
      setErrors({ submit: "Failed to update product. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "draft":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
      case "archived":
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <Card className="shadow-lg">
      <CardHeader className="border-b pb-5">
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-2xl flex items-center gap-2">
              <Package className="h-6 w-6" />
              Edit Product
            </CardTitle>
            <CardDescription className="text-base mt-2">
              Update the details for{" "}
              <span className="font-semibold text-foreground">
                "{product?.name}"
              </span>
            </CardDescription>
          </div>
          <Badge className={getStatusColor(formData.publishStatus)}>
            {formData.publishStatus.charAt(0).toUpperCase() +
              formData.publishStatus.slice(1)}
          </Badge>
        </div>
        {submitSuccess && (
          <Alert className="mt-4 border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-green-700 dark:text-green-200">
              Product updated successfully! Form will reset shortly.
            </AlertDescription>
          </Alert>
        )}
        {errors.submit && (
          <Alert className="mt-4 border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950">
            <AlertDescription className="text-red-700 dark:text-red-200">
              {errors.submit}
            </AlertDescription>
          </Alert>
        )}
      </CardHeader>

      <CardContent className="space-y-8 pt-6">
        {/* Basic Information */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b">
            <Tag className="h-4 w-4" />
            <h3 className="font-semibold">Basic Information</h3>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Product Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => updateFormData("name", e.target.value)}
                placeholder="Enter product name"
                className={errors.name ? "border-red-500" : ""}
                aria-label="Product name"
              />
              {errors.name && (
                <p className="text-xs text-red-500">{errors.name}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="brand">Brand</Label>
              <Input
                id="brand"
                value={formData.brand}
                onChange={(e) => updateFormData("brand", e.target.value)}
                placeholder="Enter brand name"
                aria-label="Brand name"
              />
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Category *</Label>
              <Select
                onValueChange={handleCategoryChange}
                value={formData.category}
              >
                <SelectTrigger
                  className={cn(
                    errors.category ? "border-red-500" : "",
                    "w-full"
                  )}
                  aria-label="Product category"
                >
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Categories</SelectLabel>
                    {Object.keys(categories).map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {cat.charAt(0).toUpperCase() + cat.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              {errors.category && (
                <p className="text-xs text-red-500">{errors.category}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label>Sub Category</Label>
              <Select
                onValueChange={(value) => updateFormData("subCategory", value)}
                value={formData.subCategory}
                disabled={!formData.category}
                aria-label="Product sub-category"
              >
                <SelectTrigger className="w-full">
                  <SelectValue
                    placeholder={
                      formData.category
                        ? "Select sub-category"
                        : "Select category first"
                    }
                  />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Sub Categories</SelectLabel>
                    {subCategories.map((subCat) => (
                      <SelectItem key={subCat} value={subCat}>
                        {subCat.charAt(0).toUpperCase() + subCat.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Pricing & Inventory */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b">
            <DollarSign className="h-4 w-4" />
            <h3 className="font-semibold">Pricing & Inventory</h3>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="price">Base Price (USD) *</Label>
              <Input
                id="price"
                type="number"
                step="0.01"
                value={formData.price}
                onChange={(e) => updateFormData("price", e.target.value)}
                placeholder="0.00"
                min="0"
                className={errors.price ? "border-red-500" : ""}
                aria-label={`Base price in USD (displayed as ${currency})`}
              />
              <p className="text-xs text-muted-foreground">
                Displayed as:{" "}
                {currencyLoading
                  ? "..."
                  : formatCurrency(
                      convertPrice(parseFloat(formData.price) || 0),
                      currency
                    )}
              </p>
              {errors.price && (
                <p className="text-xs text-red-500">{errors.price}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="tax">Tax Rate (%)</Label>
              <Input
                id="tax"
                type="number"
                step="0.01"
                min="0"
                max="100"
                value={formData.tax}
                onChange={(e) => updateFormData("tax", e.target.value)}
                placeholder="0.00"
                className={errors.tax ? "border-red-500" : ""}
                aria-label="Tax rate percentage"
              />
              {errors.tax && (
                <p className="text-xs text-red-500">{errors.tax}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="discount">Discount (%)</Label>
              <Input
                id="discount"
                type="number"
                value={formData.discount}
                onChange={(e) => updateFormData("discount", e.target.value)}
                placeholder="0"
                min="0"
                max="100"
                aria-label="Discount percentage"
              />
            </div>
          </div>
          {(formData.discount > 0 || formData.tax > 0) && formData.price && (
            <div className="p-3 bg-green-50 dark:bg-green-950 rounded-lg border border-green-200 dark:border-green-800">
              <p className="text-sm text-green-700">
                Final price after {formData.discount}% discount and{" "}
                {formData.tax}% tax:{" "}
                <span
                  className="font-semibold"
                  aria-label={`Final price: ${formatCurrency(
                    finalPrice,
                    currency
                  )}`}
                >
                  {currencyLoading
                    ? "..."
                    : formatCurrency(finalPrice, currency)}
                </span>
                <span className="text-xs ml-2">
                  (Save{" "}
                  {currencyLoading
                    ? "..."
                    : formatCurrency(
                        convertPrice(parseFloat(formData.price) || 0) -
                          finalPrice /
                            (1 + (parseFloat(formData.tax) || 0) / 100),
                        currency
                      )}
                  )
                </span>
              </p>
            </div>
          )}
        </div>

        <Separator />
        {/* Stock Quantity */}
        <div className="space-y-2 md:w-1/2">
          <Label htmlFor="stock">Stock Quantity *</Label>
          <Input
            id="stock"
            type="number"
            value={formData.stock}
            onChange={(e) => updateFormData("stock", e.target.value)}
            placeholder="0"
            min="0"
            className={errors.stock ? "border-red-500" : ""}
            aria-label="Stock quantity"
          />
          {errors.stock && (
            <p className="text-xs text-red-500">{errors.stock}</p>
          )}
        </div>

        {/* Publish Status */}
        <div className="space-y-2">
          <Label>Publish Status</Label>
          <Select
            onValueChange={(value) => updateFormData("publishStatus", value)}
            value={formData.publishStatus}
            aria-label="Publish status"
          >
            <SelectTrigger className="md:w-1/2">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="draft">
                Draft - Still in progress, not visible to customers
              </SelectItem>
              <SelectItem value="active">
                Active - Visible to customers
              </SelectItem>
              <SelectItem value="archived">
                Archived - Not visible to customers
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Description */}
        <div className="space-y-2">
          <Label htmlFor="description">Product Description *</Label>
          <Textarea
            id="description"
            value={formData.description}
            onChange={(e) => updateFormData("description", e.target.value)}
            placeholder="Describe your product features, benefits, and specifications..."
            className={cn(
              "min-h-32",
              errors.description ? "border-red-500" : ""
            )}
            aria-label="Product description"
          />
          <div className="flex justify-between items-center">
            {errors.description && (
              <p className="text-xs text-red-500">{errors.description}</p>
            )}
            <p className="text-xs text-muted-foreground ml-auto">
              {formData.description.length} characters
            </p>
          </div>
        </div>

        {/* Shipping */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b">
            <Truck className="h-4 w-4" />
            <h3 className="font-semibold">Shipping Information</h3>
          </div>
          <div className="space-y-2">
            <Label htmlFor="shippingCost">Shipping Cost (USD)</Label>
            <Input
              id="shippingCost"
              type="number"
              step="0.01"
              value={formData.shippingCost}
              onChange={(e) => updateFormData("shippingCost", e.target.value)}
              placeholder="0.00"
              min="0"
              className={errors.shippingCost ? "border-red-500" : ""}
              aria-label={`Shipping cost in USD (displayed as ${currency})`}
            />
            <p className="text-xs text-muted-foreground">
              Displayed as:{" "}
              {currencyLoading
                ? "..."
                : formatCurrency(
                    convertPrice(parseFloat(formData.shippingCost) || 0),
                    currency
                  )}
            </p>
            {errors.shippingCost && (
              <p className="text-xs text-red-500">{errors.shippingCost}</p>
            )}
            <p className="text-xs text-muted-foreground">
              Leave empty or set to 0 for free shipping
            </p>
          </div>
        </div>

        {/* Shipping Details */}
        <div className="space-y-4">
          <Label>Shipping Details</Label>
          <div className="space-y-2">
            {shippingDetails.map((detail, index) => (
              <div
                key={index}
                className="flex items-center gap-2 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border group hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                <span className="flex-1 text-sm">{detail}</span>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => removeShippingDetail(index)}
                  className="text-red-500 hover:text-red-700 h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                  aria-label={`Remove shipping detail: ${detail}`}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
            <div className="flex gap-2">
              <Input
                value={newShipping}
                onChange={(e) => setNewShipping(e.target.value)}
                placeholder="Add shipping option (e.g., Same-day delivery: $15)"
                className="flex-1"
                onKeyPress={(e) =>
                  e.key === "Enter" && (e.preventDefault(), addShippingDetail())
                }
                aria-label="New shipping detail"
              />
              <Button
                type="button"
                onClick={addShippingDetail}
                disabled={
                  !newShipping.trim() ||
                  shippingDetails.includes(newShipping.trim())
                }
                size="sm"
                aria-label="Add shipping detail"
              >
                <Plus className="h-4 w-4 mr-1" />
                Add
              </Button>
            </div>
          </div>
        </div>

        {/* Return Policy */}
        <div className="space-y-4">
          <Label>Return Policy</Label>
          <div className="space-y-2">
            {returnPolicy.map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-2 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border group hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                <span className="flex-1 text-sm">{item}</span>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => removeReturnPolicy(index)}
                  className="text-red-500 hover:text-red-700 h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                  aria-label={`Remove return policy: ${item}`}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
            <div className="flex gap-2">
              <Input
                value={newReturn}
                onChange={(e) => setNewReturn(e.target.value)}
                placeholder="Add return policy (e.g., Exchange within 7 days)"
                className="flex-1"
                onKeyPress={(e) =>
                  e.key === "Enter" && (e.preventDefault(), addReturnPolicy())
                }
                aria-label="New return policy"
              />
              <Button
                type="button"
                onClick={addReturnPolicy}
                disabled={
                  !newReturn.trim() || returnPolicy.includes(newReturn.trim())
                }
                size="sm"
                aria-label="Add return policy"
              >
                <Plus className="h-4 w-4 mr-1" />
                Add
              </Button>
            </div>
          </div>
        </div>

        {/* Images */}
        <div className="space-y-2">
          <Label>Product Images *</Label>
          <ProductImages images={images} onImagesChange={setImages} />
          {errors.images && (
            <p className="text-xs text-red-500">{errors.images}</p>
          )}
        </div>
      </CardContent>

      <CardFooter className="flex flex-wrap gap-3 border-t pt-5">
        {!isFormValid && (
          <p className="text-xs text-muted-foreground mr-auto hidden md:block">
            Please fill in all required fields
          </p>
        )}
        <div className="ml-auto flex items-center gap-3.5">
          <Button
            variant="outline"
            type="button"
            size="sm"
            onClick={() => window.history.back()}
            disabled={loading || currencyLoading}
            aria-label="Cancel editing"
          >
            Cancel
          </Button>
          <Button
            type="button"
            onClick={handleSubmit}
            disabled={loading || !isFormValid || currencyLoading}
            size="sm"
            className="min-w-32"
            aria-label="Save changes"
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin h-4 w-4 mr-1" />
                <span>Saving...</span>
              </>
            ) : (
              "Save Changes"
            )}
          </Button>
          <Button
            variant="secondary"
            type="button"
            size="sm"
            onClick={resetForm}
            disabled={loading || currencyLoading}
            aria-label="Reset form to original values"
          >
            Reset Form
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
