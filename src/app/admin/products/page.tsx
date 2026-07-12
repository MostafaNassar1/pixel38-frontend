"use client";

import { useState, useEffect, useCallback } from "react";
import { useAuth } from "../../lib/AuthContext";
import { adminFetch } from "../../lib/api";
import ProductForm from "../../components/admin/ProductForm";

type ProductImage = { id: string; imageUrl: string; order: number };

type Product = {
  id: string;
  name: string;
  description: string;
  category: string;
  price: string | null;
  traits: { label: string; positive: boolean }[] | null;
  isActive: boolean;
  images: ProductImage[];
};

export default function ProductsPage() {
  const { accessToken } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const loadProducts = useCallback(async () => {
    if (!accessToken) return;
    setIsLoading(true);
    const data = await adminFetch("/admin/products", accessToken);
    setProducts(data);
    setIsLoading(false);
  }, [accessToken]);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  const handleDelete = async (id: string) => {
    if (!accessToken) return;
    if (!confirm("Delete this product? This will also delete its images.")) return;

    await adminFetch(`/admin/products/${id}`, accessToken, { method: "DELETE" });
    loadProducts();
  };

  const openCreateForm = () => {
    setEditingProduct(null);
    setIsFormOpen(true);
  };

  const openEditForm = (product: Product) => {
    setEditingProduct(product);
    setIsFormOpen(true);
  };

  if (isLoading) {
    return <p className="text-white p-8">Loading products...</p>;
  }

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-3xl font-bold text-foreground">Products</h1>
        <button
          onClick={openCreateForm}
          className="bg-accent-blue text-foreground font-semibold px-6 py-2 rounded-full hover:opacity-90 transition-opacity"
        >
          + Add Product
        </button>
      </div>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.length === 0 && (
          <p className="text-muted col-span-full">
            No products yet. Click &quot;Add Product&quot; to create one.
          </p>
        )}

        {products.map((product) => (
          <div key={product.id} className="bg-card-brown rounded-2xl p-5">
            {product.images[0] && (
              <img
                src={`http://localhost:3000${product.images[0].imageUrl}`}
                alt={product.name}
                className="w-full h-32 object-cover rounded-xl mb-3"
              />
            )}
            <h3 className="text-foreground font-semibold">{product.name}</h3>
            <p className="text-muted text-sm mt-1">{product.category}</p>
            {product.price && (
              <p className="text-accent-orange text-sm mt-1">{product.price} CZK</p>
            )}

            <div className="flex items-center gap-3 mt-4">
              <button
                onClick={() => openEditForm(product)}
                className="text-accent-blue text-sm font-semibold hover:underline"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(product.id)}
                className="text-red-400 text-sm font-semibold hover:underline"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {isFormOpen && (
        <ProductForm
          product={editingProduct}
          onClose={() => setIsFormOpen(false)}
          onSaved={loadProducts}
        />
      )}
    </div>
  );
}