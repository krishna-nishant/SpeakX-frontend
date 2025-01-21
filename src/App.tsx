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
  const [questions, setQuestions] = useState([]);
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

  const handleLimitChange = (value) => {
    setLimit(Number(value));
    setPage(1);
  };

  const highlightText = (text: string) => {
    if (!search) return text;

    const regex = new RegExp(`(${search})`, "gi");
    const parts = text.split(regex);

    return parts.map((part, index) =>
      part.toLowerCase() === search.toLowerCase() ? (
        <span key={index} className="bg-blue-200">
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <div className="flex items-center gap-4">
        <Input
          type="text"
          placeholder="Search questions..."
          value={search}
          onChange={handleSearchChange}
          className="flex-1"
        />

        <Select value={limit.toString()} onValueChange={handleLimitChange}>
          <SelectTrigger className="w-24">{limit}</SelectTrigger>
          <SelectContent>
            <SelectItem value="5">5</SelectItem>
            <SelectItem value="10">10</SelectItem>
            <SelectItem value="15">15</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Table className="h-[32rem]">
        <TableCaption>
          Showing data from Page {page} out of {Math.ceil(totalPages / limit)}
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Type</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {questions.length > 0 ? (
            questions.map((q, index) => (
              <TableRow key={index}>
                <TableCell>{highlightText(q.title)}</TableCell>
                <TableCell>{q.type}</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={2}>No questions found.</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <div className="flex justify-center mt-4 space-x-2">
        <Button disabled={page === 1} onClick={() => setPage(page - 1)}>
          Previous
        </Button>
        <span>Page {page}</span>
        <Button
          disabled={page === Math.ceil(totalPages / limit)}
          onClick={() => setPage(page + 1)}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default SearchWithPagination;
