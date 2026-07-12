"use client";

import { useState, useEffect, useCallback } from "react";
import { useAuth } from "../../lib/AuthContext";
import { adminFetch } from "../../lib/api";
import ServiceForm from "../../components/admin/ServiceForm";

type Service = {
  id: string;
  title: string;
  description: string;
  order: number;
  isActive: boolean;
};

export default function ServicesPage() {
  const { accessToken } = useAuth();
  const [services, setServices] = useState<Service[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const loadServices = useCallback(async () => {
    if (!accessToken) return;
    setIsLoading(true);
    const data = await adminFetch("/admin/services", accessToken);
    setServices(data);
    setIsLoading(false);
  }, [accessToken]);

  useEffect(() => {
    loadServices();
  }, [loadServices]);

  const handleDelete = async (id: string) => {
    if (!accessToken) return;
    if (!confirm("Delete this service?")) return;

    await adminFetch(`/admin/services/${id}`, accessToken, { method: "DELETE" });
    loadServices();
  };

  const openCreateForm = () => {
    setEditingService(null);
    setIsFormOpen(true);
  };

  const openEditForm = (service: Service) => {
    setEditingService(service);
    setIsFormOpen(true);
  };

  if (isLoading) {
    return <p className="text-white p-8">Loading services...</p>;
  }

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-3xl font-bold text-foreground">Services</h1>
        <button
          onClick={openCreateForm}
          className="bg-accent-blue text-foreground font-semibold px-6 py-2 rounded-full hover:opacity-90 transition-opacity"
        >
          + Add Service
        </button>
      </div>

      <div className="mt-8 space-y-3">
        {services.length === 0 && (
          <p className="text-muted">No services yet. Click &quot;Add Service&quot; to create one.</p>
        )}

        {services.map((service) => (
          <div
            key={service.id}
            className="bg-card-brown rounded-2xl p-5 flex items-center justify-between"
          >
            <div>
              <h3 className="text-foreground font-semibold">{service.title}</h3>
              <p className="text-muted text-sm mt-1">{service.description}</p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => openEditForm(service)}
                className="text-accent-blue text-sm font-semibold hover:underline"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(service.id)}
                className="text-red-400 text-sm font-semibold hover:underline"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {isFormOpen && (
        <ServiceForm
          service={editingService}
          onClose={() => setIsFormOpen(false)}
          onSaved={loadServices}
        />
      )}
    </div>
  );
}