import { Toaster } from "react-hot-toast";
import { Dashboard } from "./pages/Dashboard";

function App() {
  return (
    <>
      {/* This component allows the popups to show up */}
      <Toaster position="top-right" />
      <Dashboard />
    </>
  );
}

export default App;
