import { useState, useEffect } from "react";
import { SearchBar } from "./components/SearchBar";
import { TypeFilter } from "./components/TypeFilter";
import { QuestionsTable } from "./components/QuestionsTable";
import { Pagination } from "./components/Pagination";
import { FaqSection } from "./components/FaqSection";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

export default function App() {
  const [questions, setQuestions] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [limit, setLimit] = useState(5);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    fetchQuestions();
  }, [page, search, limit, selectedTypes]);

  const fetchQuestions = async () => {
    try {
      setLoading(true);
      const queryParams = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
        search,
        types: selectedTypes.join(","),
      });

      const response = await fetch(`${backendUrl}?${queryParams}`);
      if (!response.ok) throw new Error("Network response was not ok");
      const data = await response.json();
      setQuestions(data.questions || []);
      setTotalPages(data.total);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching questions:", error);
      setError(error instanceof Error ? "Server Load" : "Server Load");
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setPage(1);
  };

  const handleLimitChange = (value: number) => {
    setLimit(Number(value));
    setPage(1);
  };

  const handleTypeToggle = (type: string) => {
    setSelectedTypes((prev) => {
      const isSelected = prev.includes(type);
      return isSelected ? prev.filter((t) => t !== type) : [...prev, type];
    });
    setPage(1);
  };

  const highlightText = (text: string) => {
    if (!search) return text;
    const regex = new RegExp(`(${search})`, "gi");
    const parts = text.split(regex);
    return parts.map((part, index) =>
      part.toLowerCase() === search.toLowerCase() ? (
        <span key={index} className="bg-blue-500 text-white px-1 rounded-md">
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6 flex flex-col gap-6">
      <div className="w-full max-w-4xl mx-auto bg-gray-800 p-6 rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold mb-4 text-center">QuestSearch🔍 </h1>
      </div>

      <div className="w-full max-w-4xl mx-auto bg-gray-800 p-6 rounded-lg shadow-lg space-y-4">
        <SearchBar
          search={search}
          limit={limit}
          onSearchChange={handleSearchChange}
          onLimitChange={handleLimitChange}
        />
        <TypeFilter
          selectedTypes={selectedTypes}
          onTypeToggle={handleTypeToggle}
        />
        <QuestionsTable
          loading={loading}
          questions={questions}
          search={search}
          highlightText={highlightText}
          error={error}
        />
        <Pagination
          page={page}
          totalPages={totalPages}
          limit={limit}
          onPageChange={setPage}
          questions={questions}
        />
      </div>
      <FaqSection />
    </div>
  );
}
