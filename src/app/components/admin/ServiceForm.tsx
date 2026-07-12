"use client";

import { useState } from "react";
import { useAuth } from "../../lib/AuthContext";
import { adminFetch } from "../../lib/api";

type Service = {
  id: string;
  title: string;
  description: string;
  order: number;
  isActive: boolean;
};

type Props = {
  service: Service | null; // null = creating new, otherwise editing this one
  onClose: () => void;
  onSaved: () => void;
};

export default function ServiceForm({ service, onClose, onSaved }: Props) {
  const { accessToken } = useAuth();
  const [title, setTitle] = useState(service?.title || "");
  const [description, setDescription] = useState(service?.description || "");
  const [order, setOrder] = useState(service?.order ?? 0);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");

  const isEditing = !!service;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!accessToken) return;

    setIsSaving(true);
    setError("");

    try {
      if (isEditing) {
        await adminFetch(`/admin/services/${service.id}`, accessToken, {
          method: "PUT",
          body: JSON.stringify({ title, description, order }),
        });
      } else {
        await adminFetch("/admin/services", accessToken, {
          method: "POST",
          body: JSON.stringify({ title, description, order }),
        });
      }
      onSaved();
      onClose();
    } catch {
      setError("Failed to save service");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-card-brown rounded-3xl p-8"
      >
        <h2 className="font-display text-2xl font-bold text-foreground">
          {isEditing ? "Edit Service" : "New Service"}
        </h2>

        <div className="mt-6 space-y-4">
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
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
            type="number"
            placeholder="Order"
            value={order}
            onChange={(e) => setOrder(Number(e.target.value))}
            className="w-full bg-transparent border border-muted rounded-full px-5 py-3 text-foreground placeholder:text-muted focus:outline-none focus:border-accent-blue transition-colors"
          />
        </div>

        {error && <p className="mt-3 text-sm text-red-400">{error}</p>}

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