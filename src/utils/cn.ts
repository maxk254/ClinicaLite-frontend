import { clsx, type ClassValue } from "clsx";
import { twMerge } from 'tailwind-merge';

// this functio lets us combine default styles with custom ones safely

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}