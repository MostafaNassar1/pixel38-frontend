"use client";

import Link from "next/link";
import { useAuth } from "../lib/AuthContext";

export default function AdminPage() {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-3xl font-bold text-foreground">
          Admin Dashboard
        </h1>
        <div className="flex items-center gap-4">
          <span className="text-muted text-sm">{user?.email}</span>
          <button
            onClick={logout}
            className="bg-accent-blue text-foreground text-sm font-semibold px-5 py-2 rounded-full hover:opacity-90 transition-opacity"
          >
            Log out
          </button>
        </div>
      </div>

      <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link
          href="/admin/homepage"
          className="bg-card-brown rounded-2xl p-6 hover:opacity-90 transition-opacity"
        >
          <h2 className="text-foreground font-semibold text-lg">Homepage</h2>
          <p className="text-muted text-sm mt-2">Edit hero, banners, and text sections</p>
        </Link>

        <Link
          href="/admin/services"
          className="bg-card-brown rounded-2xl p-6 hover:opacity-90 transition-opacity"
        >
          <h2 className="text-foreground font-semibold text-lg">Services</h2>
          <p className="text-muted text-sm mt-2">Create, edit, and delete services</p>
        </Link>

        <Link
          href="/admin/products"
          className="bg-card-brown rounded-2xl p-6 hover:opacity-90 transition-opacity"
        >
          <h2 className="text-foreground font-semibold text-lg">Products</h2>
          <p className="text-muted text-sm mt-2">Manage wood types and product images</p>
        </Link>
      </div>
    </div>
  );
}