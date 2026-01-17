import React, { useState } from "react";
import { toast } from "react-hot-toast"; // The notification library
import { Button } from "../common/Button";
import { Input } from "../common/Input";
import type { NewPatientPayload } from "../../types/patient";
import { PatienAPI } from "../../api/patientApi";
// import { PatientAPI } from "../../api/patientApi";

interface PatientFormProps {
  onSuccess: () => void; // Tell the parent (Dashboard) to refresh the list
}

export const PatientForm: React.FC<PatientFormProps> = ({ onSuccess }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<NewPatientPayload>({
    id: "", // Manual ID entry since it's a custom DB challenge
    name: "",
    age: 0,
    gender: "Male",
    diagnosis: "",
    status: "Admitted",
  });

  // In src/components/features/PatientForm.tsx

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!formData.id || !formData.name || !formData.diagnosis) {
      toast.error("Please fill in all required fields");
      return;
    }

    try {
      setIsLoading(true);
      console.log("🚀 Sending Data:", formData); // Debug 1

      await PatienAPI.create(formData);

      toast.success("Patient admitted successfully!");
      setFormData({
        id: "",
        name: "",
        age: 0,
        gender: "Male",
        diagnosis: "",
        status: "Admitted",
      });
      onSuccess();
    } catch (error: any) {
      // 🔥 DEBUGGING: Log the REAL error to the Console (F12)
      console.error("❌ SUBMISSION FAILED:", error);

      // Show the real error message from the backend (if available)
      const serverMessage = error.response?.data?.message || error.message;
      toast.error(`Error: ${serverMessage}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 space-y-4"
    >
      <h2 className="text-lg font-semibold text-gray-800 mb-4">
        Admit New Patient
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Patient ID"
          placeholder="e.g., P-101"
          value={formData.id}
          onChange={(e) => setFormData({ ...formData, id: e.target.value })}
        />
        <Input
          label="Full Name"
          placeholder="Maxwel Kamau"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
        <Input
          label="Age"
          type="number"
          value={formData.age}
          onChange={(e) =>
            setFormData({ ...formData, age: parseInt(e.target.value) })
          }
        />

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">Gender</label>
          <select
            className="h-10 rounded-md border border-gray-300 bg-white px-3 text-sm focus:ring-2 focus:ring-blue-500"
            value={formData.gender}
            onChange={(e) =>
              setFormData({ ...formData, gender: e.target.value })
            }
          >
            <option value="Male">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>
      </div>

      <Input
        label="Diagnosis"
        placeholder="e.g., Malaria, Hypertension"
        value={formData.diagnosis}
        onChange={(e) =>
          setFormData({ ...formData, diagnosis: e.target.value })
        }
      />

      <Button type="submit" isLoading={isLoading} className="w-full mt-2">
        Admit Patient
      </Button>
    </form>
  );
};
