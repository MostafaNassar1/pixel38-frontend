"use client";

import { useState } from "react";
import { useAuth } from "../../lib/AuthContext";
import { adminFetch } from "../../lib/api";

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

type Props = {
  product: Product | null;
  onClose: () => void;
  onSaved: () => void;
};

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api";

export default function ProductForm({ product, onClose, onSaved }: Props) {
  const { accessToken } = useAuth();
  const isEditing = !!product;

  const [name, setName] = useState(product?.name || "");
  const [description, setDescription] = useState(product?.description || "");
  const [category, setCategory] = useState(product?.category || "");
  const [price, setPrice] = useState(product?.price || "");
  const [images, setImages] = useState<ProductImage[]>(product?.images || []);
  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState("");

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !accessToken) return;

    setIsUploading(true);
    setError("");

    try {
      // Step 1: upload the raw file
      const formData = new FormData();
      formData.append("file", file);

      const uploadRes = await fetch(`${API_URL}/admin/upload`, {
        method: "POST",
        headers: { Authorization: `Bearer ${accessToken}` },
        body: formData,
      });
      if (!uploadRes.ok) throw new Error("Upload failed");
      const { url } = await uploadRes.json();

      // Step 2 (edit mode only): immediately attach it to the product
      if (isEditing) {
        const newImage = await adminFetch(
          `/admin/products/${product.id}/images`,
          accessToken,
          {
            method: "POST",
            body: JSON.stringify({ imageUrl: url, order: images.length }),
          },
        );
        setImages([...images, newImage]);
      } else {
        
        setImages([...images, { id: `temp-${Date.now()}`, imageUrl: url, order: images.length }]);
      }
    } catch {
      setError("Image upload failed");
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemoveImage = async (image: ProductImage) => {
    if (isEditing && accessToken && !image.id.startsWith("temp-")) {
      await adminFetch(`/admin/products/${product!.id}/images/${image.id}`, accessToken, {
        method: "DELETE",
      });
    }
    setImages(images.filter((img) => img.id !== image.id));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!accessToken) return;

    setIsSaving(true);
    setError("");

    const payload = {
      name,
      description,
      category,
      price: price ? Number(price) : undefined,
    };

    try {
      if (isEditing) {
        await adminFetch(`/admin/products/${product.id}`, accessToken, {
          method: "PUT",
          body: JSON.stringify(payload),
        });
      } else {
        const created = await adminFetch("/admin/products", accessToken, {
          method: "POST",
          body: JSON.stringify(payload),
        });
        // Now attach any images that were uploaded before the product existed
        for (const img of images) {
          await adminFetch(`/admin/products/${created.id}/images`, accessToken, {
            method: "POST",
            body: JSON.stringify({ imageUrl: img.imageUrl, order: img.order }),
          });
        }
      }
      onSaved();
      onClose();
    } catch {
      setError("Failed to save product");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50 overflow-y-auto">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg bg-card-brown rounded-3xl p-8 my-8"
      >
        <h2 className="font-display text-2xl font-bold text-foreground">
          {isEditing ? "Edit Product" : "New Product"}
        </h2>

        <div className="mt-6 space-y-4">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full bg-transparent border border-muted rounded-full px-5 py-3 text-foreground placeholder:text-muted focus:outline-none focus:border-accent-blue transition-colors"
          />
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            rows={3}
            className="w-full bg-transparent border border-muted rounded-3xl px-5 py-3 text-foreground placeholder:text-muted focus:outline-none focus:border-accent-blue transition-colors resize-none"
          />
          <input
            type="text"
            placeholder="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
            className="w-full bg-transparent border border-muted rounded-full px-5 py-3 text-foreground placeholder:text-muted focus:outline-none focus:border-accent-blue transition-colors"
          />
          <input
            type="number"
            step="0.01"
            placeholder="Price (optional)"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full bg-transparent border border-muted rounded-full px-5 py-3 text-foreground placeholder:text-muted focus:outline-none focus:border-accent-blue transition-colors"
          />
        </div>

        <div className="mt-6">
          <label className="text-foreground text-sm font-semibold">Images</label>

          <div className="mt-3 flex flex-wrap gap-3">
            {images.map((img) => (
              <div key={img.id} className="relative w-20 h-20 rounded-xl overflow-hidden group">
                <img
                  src={`http://localhost:3000${img.imageUrl}`}
                  alt=""
                  className="w-full h-full object-cover"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveImage(img)}
                  className="absolute inset-0 bg-black/60 text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                >
                  Remove
                </button>
              </div>
            ))}

            <label className="w-20 h-20 rounded-xl border border-dashed border-muted flex items-center justify-center text-muted text-xs cursor-pointer hover:border-accent-blue transition-colors">
              {isUploading ? "..." : "+ Add"}
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                disabled={isUploading}
                className="hidden"
              />
            </label>
          </div>
        </div>

        {error && <p className="mt-4 text-sm text-red-400">{error}</p>}

        <div className="mt-6 flex gap-3">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 border border-muted text-foreground font-semibold py-3 rounded-full hover:bg-white/5 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSaving}
            className="flex-1 bg-accent-blue text-foreground font-semibold py-3 rounded-full hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            {isSaving ? "Saving..." : "Save"}
          </button>
        </div>
      </form>
    </div>
  );
}