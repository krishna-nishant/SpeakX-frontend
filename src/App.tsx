import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const QUESTION_TYPES = [
  { id: "ANAGRAM", label: "Anagram" },
  { id: "READ_ALONG", label: "Read Along" },
  { id: "MCQ", label: "MCQ" },
  { id: "CONTENT_ONLY", label: "Content Only" },
];

const SearchWithPagination = () => {
  interface Question {
    title: string;
    type: string;
  }

  const [questions, setQuestions] = useState<Question[]>([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [limit, setLimit] = useState(5);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);

  useEffect(() => {
    fetchQuestions();
  }, [page, search, limit, selectedTypes]);

  const fetchQuestions = async () => {
    try {
      const queryParams = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
        search,
        types: selectedTypes.join(","),
      });

      const response = await fetch(`${backendUrl}?${queryParams}`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setQuestions(data.questions || []);
      setTotalPages(data.total);
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setPage(1);
  };

  const handleLimitChange = (value: string) => {
    setLimit(Number(value));
    setPage(1);
  };

  const handleTypeToggle = (type: string) => {
    setSelectedTypes((prev) => {
      const isSelected = prev.includes(type);
      const newTypes = isSelected
        ? prev.filter((t) => t !== type)
        : [...prev, type];
      return newTypes;
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
    <div className="min-h-screen bg-gray-900 text-white p-6 flex justify-center items-center">
      <div className="w-full max-w-4xl bg-gray-800 p-6 rounded-lg shadow-lg">
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <Input
              type="text"
              placeholder="Search questions..."
              value={search}
              onChange={handleSearchChange}
              className="flex-1 bg-gray-700 border-gray-600 text-white placeholder-gray-400"
            />

            <Select value={limit.toString()} onValueChange={handleLimitChange}>
              <SelectTrigger className="w-24 bg-gray-700 border-gray-600 text-white">
                {limit}
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-700">
                <SelectItem value="5" className="text-white">
                  5
                </SelectItem>
                <SelectItem value="10" className="text-white">
                  10
                </SelectItem>
                <SelectItem value="15" className="text-white">
                  15
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-wrap gap-6 p-4 bg-gray-700 rounded-lg">
            <span className="text-md text-gray-400"> Filter by type:</span>
            {QUESTION_TYPES.map((type) => (
              <div key={type.id} className="flex items-center space-x-2">
                <Checkbox
                  id={type.id}
                  checked={selectedTypes.includes(type.id)}
                  onCheckedChange={() => handleTypeToggle(type.id)}
                  className="border-gray-400 data-[state=checked]:bg-blue-500"
                />
                <label
                  htmlFor={type.id}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {type.label}
                </label>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 overflow-hidden rounded-lg border border-gray-700">
          <table className="w-full">
            <thead className="bg-gray-700">
              <tr>
                <th className="py-2 px-4 text-left font-medium">Title</th>
                <th className="py-2 px-4 text-left font-medium">Type</th>
              </tr>
            </thead>
            <tbody>
              {questions.length > 0 ? (
                questions.map((q, index) => (
                  <tr
                    key={index}
                    className="border-t border-gray-700 hover:bg-gray-700 transition-colors duration-150"
                  >
                    <td className="py-2 px-4">{highlightText(q.title)}</td>
                    <td className="py-2 px-4">{q.type}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={2} className="text-center py-4 text-gray-400">
                    No questions found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="mt-4 text-center text-sm text-gray-400">
          Showing data from Page {page} out of {Math.ceil(totalPages / limit)}
        </div>
        <div className="flex justify-center mt-6 space-x-3">
          <Button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg disabled:bg-gray-600"
          >
            Previous
          </Button>
          <span className="text-gray-300 mt-1">Page {page}</span>
          <Button
            disabled={page === Math.ceil(totalPages / limit)}
            onClick={() => setPage(page + 1)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg disabled:bg-gray-600"
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SearchWithPagination;