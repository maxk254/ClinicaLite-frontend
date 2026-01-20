//  Specific calls: getPatients(), addPatient()

//  Specific calls: getPatients(), addPatient()

import { axiosClient } from "./axiosClient";
import type { Patient, NewPatientPayload, PatientsResponse } from "../types/patient";

export const patientAPI = {
  
  // 1. Get all patient limit per page is 10
  getAll: async (page = 1, limit = 10, search = "") => {
    // Send ?page=1&limit=10 to the server
    const response = await axiosClient.get<PatientsResponse>(`/patients?page=${page}&limit=${limit}&search=${search}`);
    return response.data; // Return the whole object (data + pagination info)
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