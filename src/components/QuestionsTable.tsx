interface Question {
    title: string;
    type: string;
  }
  
  interface QuestionsTableProps {
    questions: Question[];
    search: string;
    highlightText: (text: string) => React.ReactNode;
  }
  
  export const QuestionsTable = ({ questions, highlightText }: QuestionsTableProps) => (
    <div className="overflow-hidden rounded-lg border border-gray-700">
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
              <tr key={index} className="border-t border-gray-700 hover:bg-gray-700 transition-colors duration-150">
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