//  Specific calls: getPatients(), addPatient()

import { axiosClient } from "./axiosClient";
import type { Patient, NewPatientPayload } from "../types/patient";

export const PatienAPI = {
  // Get all patients
  getAll: async (): Promise<Patient[]> => {
    // the generic data it matches the backened response format
    const response = await axiosClient.get<{ success: boolean; data: Patient[] }>("/patient");
    return response.data.data || [];
  },

  // Add a new patient
  create: async (patient: NewPatientPayload) => {
    const response = await axiosClient.post<{success: boolean; data:Patient}>('/patiens', patient)
    return response.data.data;
  },

  // Discharge patient/ b=delete patient
  delete: async (id:string) =>{
    const response = await axiosClient.delete(`/patients/${id}`);
    return response.data;
  }
};