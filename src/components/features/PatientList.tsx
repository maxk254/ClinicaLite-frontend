import React from "react";
import { Trash2, User, Edit } from "lucide-react"; // Added 'Edit' icon
import type { Patient } from "../../types/patient";
import { Button } from "../common/Button";

interface PatientListProps {
  patients: Patient[];
  isLoading: boolean;
  onDelete: (id: string) => void;
  onEdit: (patient: Patient) => void; // ✅ NEW: Required for updating
}

export const PatientList: React.FC<PatientListProps> = ({
  patients,
  isLoading,
  onDelete,
  onEdit, // ✅ NEW
}) => {
  if (isLoading) {
    return (
      <div className="text-center py-10 text-gray-500">Loading records...</div>
    );
  }

  if (patients.length === 0) {
    return (
      <div className="text-center py-10 bg-white rounded-xl border border-dashed border-gray-300">
        <User className="h-12 w-12 mx-auto text-gray-300 mb-2" />
        <p className="text-gray-500">
          No patients found. Add one to test the database.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <table className="w-full text-left text-sm">
        <thead className="bg-gray-50 border-b border-gray-100">
          <tr>
            <th className="px-6 py-4 font-medium text-gray-700">ID</th>
            <th className="px-6 py-4 font-medium text-gray-700">Name</th>
            <th className="px-6 py-4 font-medium text-gray-700">Age/Gender</th>
            <th className="px-6 py-4 font-medium text-gray-700">Diagnosis</th>
            <th className="px-6 py-4 font-medium text-gray-700">Status</th>{" "}
            {/* ✅ NEW Column */}
            <th className="px-6 py-4 font-medium text-gray-700 text-right">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {patients.map((patient) => (
            <tr key={patient.id} className="hover:bg-gray-50 transition-colors">
              <td className="px-6 py-4 font-mono text-gray-600">
                {patient.id}
              </td>
              <td className="px-6 py-4 font-medium text-gray-900">
                {patient.name}
              </td>
              <td className="px-6 py-4 text-gray-600">
                {patient.age} / {patient.gender}
              </td>
              <td className="px-6 py-4">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  {patient.diagnosis}
                </span>
              </td>
              {/* ✅ NEW: Status Badge */}
              <td className="px-6 py-4">
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium 
                    ${
                      patient.status === "Discharged"
                        ? "bg-green-100 text-green-800"
                        : patient.status === "ICU"
                        ? "bg-red-100 text-red-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                >
                  {patient.status || "Admitted"}
                </span>
              </td>

              <td className="px-6 py-4 text-right flex justify-end gap-2">
                {/* ✅ NEW: Edit Button */}
                <Button
                  variant="outline"
                  className="p-2 h-auto text-blue-600 hover:bg-blue-50 border-blue-100"
                  onClick={() => onEdit(patient)}
                >
                  <Edit className="h-4 w-4" />
                </Button>

                <Button
                  variant="outline"
                  className="p-2 h-auto text-red-600 hover:bg-red-50 border-red-100"
                  onClick={() => onDelete(patient.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
    </table>
  </div>
);
};
