//  Specific calls: getPatients(), addPatient()

import { axiosClient } from "./axiosClient";
import type { Patient, NewPatientPayload } from "../types/patient";

export const patientAPI = {
  // Changed name to standard camelCase 'patientApi'
  // 1. Get all patients
  getAll: async (): Promise<Patient[]> => {
    // ✅ FIXED: Changed "/patient" to "/patients"
    const response = await axiosClient.get<{
      success: boolean;
      data: Patient[];
    }>("/patients");
    // Depending on your backend, the array might be directly in response.data or response.data.data
    // This handles both cases safely:
    if (Array.isArray(response.data)) return response.data;
    return response.data.data || [];
  },

  // 2. Add a new patient
  create: async (patient: NewPatientPayload) => {
    // ✅ FIXED: Changed "/patiens" to "/patients"
    const response = await axiosClient.post<{
      success: boolean;
      data: Patient;
    }>("/patients", patient);
    return response.data;
  },

  // 3. Discharge patient (Delete)
  delete: async (id: string) => {
    // ✅ This was already correct!
    const response = await axiosClient.delete(`/patients/${id}`);
    return response.data;
  },

  // 4. Update patient (For the Edit feature)
  update: async (patient: Partial<Patient>) => {
    // ✅ NEW: Added this so your Edit button works
    const response = await axiosClient.put("/patients", patient);
    return response.data;
  },
};