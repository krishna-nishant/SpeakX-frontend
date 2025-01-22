import { useState, useEffect } from "react";
import axios from "axios";
import { Input } from "./components/ui/input";
import { Button } from "./components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
} from "./components/ui/select";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./components/ui/table";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

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

  useEffect(() => {
    fetchQuestions();
  }, [page, search, limit]);

  const fetchQuestions = async () => {
    try {
      const response = await axios.get(`${backendUrl}`, {
        params: { page, limit, search },
      });
      console.log(response.data);
      setQuestions(response.data.questions || []);
      setTotalPages(response.data.total);
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setPage(1);
  };

  const handleLimitChange = (value: any) => {
    setLimit(Number(value));
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
        <div className="flex items-center gap-4 mb-6">
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
              <SelectItem value="5">5</SelectItem>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="15">15</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Table className="w-full border border-gray-700 rounded-lg overflow-hidden">
          <TableCaption className="text-gray-400 py-2">
            Showing data from Page {page} out of {Math.ceil(totalPages / limit)}
          </TableCaption>
          <TableHeader>
            <TableRow className="bg-gray-700 text-white">
              <TableHead className="py-2 px-4">Title</TableHead>
              <TableHead className="py-2 px-4">Type</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {questions.length > 0 ? (
              questions.map((q, index) => (
                <TableRow key={index} className="hover:bg-gray-700 transition">
                  <TableCell className="py-2 px-4">{highlightText(q.title)}</TableCell>
                  <TableCell className="py-2 px-4">{q.type}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={2} className="text-center py-4 text-gray-400">
                  No questions found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>

        <div className="flex justify-center mt-6 space-x-3">
          <Button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg disabled:bg-gray-600"
          >
            Previous
          </Button>
          <span className="text-gray-300">Page {page}</span>
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