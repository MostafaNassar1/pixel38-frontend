"use client";

import { useState, useEffect, useCallback } from "react";
import { useAuth } from "../../lib/AuthContext";
import { adminFetch } from "../../lib/api";

type HomepageSection = {
  id?: string;
  section: string;
  title?: string;
  subtitle?: string;
  description?: string;
  content?: Record<string, unknown>;
  imageUrl?: string;
  order?: number;
  isActive?: boolean;
};

export default function HomepagePage() {
  const { accessToken } = useAuth();
  const [sections, setSections] = useState<HomepageSection[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState("");

  const loadSections = useCallback(async () => {
    if (!accessToken) return;
    setIsLoading(true);
    const data = await adminFetch("/admin/homepage", accessToken);
    setSections(data);
    setIsLoading(false);
  }, [accessToken]);

  useEffect(() => {
    loadSections();
  }, [loadSections]);

  const getSection = (type: string): HomepageSection => {
    return sections.find((s) => s.section === type) || { section: type };
  };

  const updateSection = (type: string, updates: Partial<HomepageSection>) => {
    setSections((prev) => {
      const exists = prev.some((s) => s.section === type);
      if (exists) {
        return prev.map((s) => (s.section === type ? { ...s, ...updates } : s));
      }
      return [...prev, { section: type, ...updates }];
    });
  };

  const handleSave = async () => {
    if (!accessToken) return;
    setIsSaving(true);
    setMessage("");

    try {
      await adminFetch("/admin/homepage", accessToken, {
        method: "PUT",
        body: JSON.stringify(sections),
      });
      setMessage("Saved successfully");
      loadSections();
    } catch {
      setMessage("Failed to save");
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return <p className="text-white p-8">Loading homepage content...</p>;
  }

  const hero = getSection("hero");
  const banner = getSection("banner");
  const advantages = getSection("advantages");

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-3xl font-bold text-foreground">Homepage</h1>
        <button
          onClick={handleSave}
          disabled={isSaving}
          className="bg-accent-blue text-foreground font-semibold px-6 py-2 rounded-full hover:opacity-90 transition-opacity disabled:opacity-50"
        >
          {isSaving ? "Saving..." : "Save Changes"}
        </button>
      </div>

      {message && <p className="mt-4 text-accent-orange">{message}</p>}

      <div className="mt-8 space-y-6">
        <section className="bg-card-brown rounded-2xl p-6">
          <h2 className="text-foreground font-semibold text-lg">Hero Section</h2>
          <div className="mt-4 space-y-3">
            <input
              type="text"
              placeholder="Title"
              value={hero.title || ""}
              onChange={(e) => updateSection("hero", { title: e.target.value })}
              className="w-full bg-transparent border border-muted rounded-full px-5 py-3 text-foreground placeholder:text-muted focus:outline-none focus:border-accent-blue transition-colors"
            />
            <input
              type="text"
              placeholder="Subtitle"
              value={hero.subtitle || ""}
              onChange={(e) => updateSection("hero", { subtitle: e.target.value })}
              className="w-full bg-transparent border border-muted rounded-full px-5 py-3 text-foreground placeholder:text-muted focus:outline-none focus:border-accent-blue transition-colors"
            />
          </div>
        </section>

        <section className="bg-card-brown rounded-2xl p-6">
          <h2 className="text-foreground font-semibold text-lg">Banner</h2>
          <div className="mt-4 space-y-3">
            <input
              type="text"
              placeholder="Banner title"
              value={banner.title || ""}
              onChange={(e) => updateSection("banner", { title: e.target.value })}
              className="w-full bg-transparent border border-muted rounded-full px-5 py-3 text-foreground placeholder:text-muted focus:outline-none focus:border-accent-blue transition-colors"
            />
            <textarea
              placeholder="Banner description"
              value={banner.description || ""}
              onChange={(e) => updateSection("banner", { description: e.target.value })}
              rows={2}
              className="w-full bg-transparent border border-muted rounded-3xl px-5 py-3 text-foreground placeholder:text-muted focus:outline-none focus:border-accent-blue transition-colors resize-none"
            />
          </div>
        </section>

        <section className="bg-card-brown rounded-2xl p-6">
          <h2 className="text-foreground font-semibold text-lg">Advantages Text</h2>
          <div className="mt-4 space-y-3">
            <textarea
              placeholder="Advantages description"
              value={advantages.description || ""}
              onChange={(e) => updateSection("advantages", { description: e.target.value })}
              rows={3}
              className="w-full bg-transparent border border-muted rounded-3xl px-5 py-3 text-foreground placeholder:text-muted focus:outline-none focus:border-accent-blue transition-colors resize-none"
            />
          </div>
        </section>
      </div>
    </div>
  );
}