// main landing page
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { Layout } from "../components/layout/Layout";
import { PatientForm } from "../components/features/PatientForm";
import { PatientList } from "../components/features/PatientList";
import { patientAPI } from "../api/patientApi";
import type { Patient } from "../types/patient";
import {ChevronLeft, ChevronRight} from 'lucide-react'


export const Dashboard: React.FC = () => {
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  // Function to fetch data from your custom DB
  const fetchPatients = async (pageNumber = 1) => {
    try {
      let response = await patientAPI.getAll(pageNumber, 10, searchQuery);

      // update data and total pages
      setPatients(response.data);
      setTotalPages(response.pagination.totalPages);
      setPage(response.pagination.page);

    } catch (error) {
      // toast.error("Connection Error: Could not fetch patients.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch on load
  useEffect(() => {
    fetchPatients(page);
  }, [page]);

  // relods data when search queery changes
  useEffect(() => {
    // reset to page 1 when searching
    setPage(1);
    fetchPatients(1);
  },  [searchQuery]);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to discharge this patient?")) return;
    try {
      await patientAPI.delete(id);
      toast.success("Patient discharged.");
      fetchPatients(); // Refresh list
    } catch (error) {
      toast.error("Failed to delete.");
    }
  };

  const handleEdit = async (patient: Patient) => {
    // 1. Ask the user for the new status
    const newStatus = prompt(
      "Update Status (Admitted / Discharged / ICU):",
      patient.status
    );

    
    if (newStatus && newStatus !== patient.status) {
      try {
        // 3. Send it to the backend
        await patientAPI.update({ ...patient, status: newStatus });
        toast.success("Status updated!");
        fetchPatients(); // Refresh the table
      } catch (error) {
        toast.error("Update failed.");
      }
    }
  };

  return (
    <Layout>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Form */}
        <div className="lg:col-span-1">
          <PatientForm onSuccess={fetchPatients} />
        </div>

        {/* Right Column: List */}
        <div className="lg:col-span-2">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Patient Records
          </h2>

          {/* Search component */}
          <div className="mb-4">
            <div className="relative">
              <input
                type="text"
                placeholder="🔍 Search by Name or ID..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <div className="absolute left-3 top-2.5 text-gray-400">
                {/* You can use a Search Icon here if you have one imported */}
              </div>
            </div>
          </div>
          <PatientList
            patients={patients}
            isLoading={loading}
            onDelete={handleDelete}
            onEdit={handleEdit}
          />

          {/* ✅ NEW: Pagination Controls */}
          <div className="flex justify-between items-center mt-4 bg-white p-3 rounded-lg border border-gray-200">
            <span className="text-sm text-gray-600">
              Page <b>{page}</b> of <b>{totalPages}</b>
            </span>

            <div className="flex gap-2">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="p-2 border rounded hover:bg-gray-50 disabled:opacity-50"
              >
                <ChevronLeft size={20} />
              </button>

              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="p-2 border rounded hover:bg-gray-50 disabled:opacity-50"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};
