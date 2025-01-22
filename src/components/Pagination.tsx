import { Button } from "@/components/ui/button";

interface PaginationProps {
  page: number;
  totalPages: number;
  limit: number;
  onPageChange: (newPage: number) => void;
}

export const Pagination = ({ page, totalPages, limit, onPageChange }: PaginationProps) => (
  <>
    <div className="mt-4 text-center text-sm text-gray-400">
      Showing data from Page {page} out of {Math.ceil(totalPages / limit)}
    </div>
    <div className="flex justify-center mt-6 space-x-3">
      <Button
        disabled={page === 1}
        onClick={() => onPageChange(page - 1)}
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg disabled:bg-gray-600"
      >
        Previous
      </Button>
      <span className="text-gray-300 mt-1">Page {page}</span>
      <Button
        disabled={page === Math.ceil(totalPages / limit)}
        onClick={() => onPageChange(page + 1)}
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg disabled:bg-gray-600"
      >
        Next
      </Button>
    </div>
  </>
);