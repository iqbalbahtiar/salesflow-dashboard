import { useState } from "react";

import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Dashboard from "./pages/Dashboard";

export default function App() {
  const [searchQuery, setSearchQuery] =
    useState("");

  return (
    <div className="app-layout">
      <Sidebar />

      <div className="main-layout">
        <Header
          searchQuery={searchQuery}
          onSearchChange={
            setSearchQuery
          }
        />

        <Dashboard
          searchQuery={searchQuery}
        />
      </div>
    </div>
  );
}