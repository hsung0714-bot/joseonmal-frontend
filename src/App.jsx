import { useState } from "react";
import HomePage from "./HomePage";
import DictionaryPage from "./DictionaryPage";

export default function App() {
  const [currentPage, setCurrentPage] = useState("home");

  return (
    <div>
      {currentPage === "home" ? (
        <HomePage onNavigate={setCurrentPage} />
      ) : (
        <DictionaryPage onNavigate={setCurrentPage} activePage={currentPage} />
      )}
    </div>
  );
}
