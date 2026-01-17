// typeScript Interfaces
//  export interface Patient { id: string; name: string... }

import type { ReactNode } from "react";

export interface Patient {
  age: ReactNode;
  id: string;
  name: String;
  gender: 'Male' | 'Female';
  diagnosis: string;
  status: 'Admitted' | 'Discharge' | 'Pending';
  admissionDate: string; 
}

export interface NewPatientPayload {
  id: string; // I include ID here because my custom db likely need it to be provided manually
  name: string;
  age: number;
  gender: string;
  diagnosis: string;
  status: string;
}
