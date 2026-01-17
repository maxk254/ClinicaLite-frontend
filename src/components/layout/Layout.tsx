import React from "react";
import { Activity } from "lucide-react";

export const Layout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 text-blue-600">
            <Activity className="h-8 w-8" />
            <span className="text-xl font-bold text-gray-900">ClinicaLite</span>
          </div>
          <div className="text-sm text-gray-500">Pesapal DB Challenge</div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">{children}</main>
    </div>
  );
};
