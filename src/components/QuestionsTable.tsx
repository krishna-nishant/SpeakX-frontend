import { Spinner } from "./ui/spinner";

interface Question {
  title: string;
  type: string;
}

interface QuestionsTableProps {
  questions: Question[];
  search: string;
  highlightText: (text: string) => React.ReactNode;
  loading: boolean;
  error: string;
}

export const QuestionsTable = ({
  questions,
  highlightText,
  loading,
  error,
}: QuestionsTableProps) => (
  <div className="overflow-hidden rounded-lg border border-gray-700">
    <table className="w-full">
      <thead className="bg-gray-700">
        <tr>
          <th className="py-2 px-4 text-left font-medium">Title</th>
          <th className="py-2 px-4 text-left font-medium">Type</th>
        </tr>
      </thead>
      <tbody>
        {error ? (
          <tr>
            <td colSpan={2} className="text-center py-4">
              <div className="text-gray-400 p-3 text-center">
                Oops! The server is under heavy load. Please wait a minute and
                try refreshing.
              </div>
            </td>
          </tr>
        ) : loading ? (
          <tr>
            <td colSpan={2} className="text-center py-4">
              <div className="flex flex-col items-center justify-center space-y-2">
                <Spinner size="lg" className="bg-white" />
                <p className="text-white">Loading data... Please wait</p>
              </div>
            </td>
          </tr>
        ) : questions.length > 0 ? (
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
);
