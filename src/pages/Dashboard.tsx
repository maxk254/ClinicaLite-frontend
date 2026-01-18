// main landing page
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { Layout } from "../components/layout/Layout";
import { PatientForm } from "../components/features/PatientForm";
import { PatientList } from "../components/features/PatientList";
import { patientAPI } from "../api/patientApi";
import type { Patient } from "../types/patient";

export const Dashboard: React.FC = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);

  // Function to fetch data from your custom DB
  const fetchPatients = async () => {
    try {
      const data = await patientAPI.getAll();
      setPatients(data);
    } catch (error) {
      toast.error("Connection Error: Could not fetch patients.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch on load
  useEffect(() => {
    fetchPatients();
  }, []);

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
          <PatientList
            patients={patients}
            isLoading={loading}
            onDelete={handleDelete}
            onEdit={handleEdit}
          />
        </div>
      </div>
    </Layout>
  );
};