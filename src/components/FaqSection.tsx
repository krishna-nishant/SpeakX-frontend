import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion";
  
  export const FaqSection = () => (
    <div className="w-full max-w-4xl mx-auto bg-gray-800 p-6 rounded-lg shadow-lg mt-6 ">
      <div className="mb-6">
        <h2 className="text-3xl md:text-6xl font-bold text-white text-center">FAQs</h2>
      </div>
      <Accordion type="single" collapsible className="text-white">
        <AccordionItem value="item-1" className="border-gray-700">
          <AccordionTrigger className="text-left hover:text-emerald-400">
            What technologies are used in this project?
          </AccordionTrigger>
          <AccordionContent className="text-left text-gray-300">
            I have used React.js, JavaScript, TypeScript, ShadCN UI, Axios. For backend I have used Express.js (Node.js), gRPC for communication with the database, and MongoDB Atlas as the database.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2" className="border-gray-700">
          <AccordionTrigger className="text-left hover:text-emerald-400">
            Why did I use ShadCN UI over other UI libraries?
          </AccordionTrigger>
          <AccordionContent className="text-left text-gray-300">
            ShadCN UI provides TailwindCSS-based styling, making it easy to customize. A component-first approach with accessibility and design consistency. ShadCN UI provides lightweight, crazy and good looking customizable UI components.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3" className="border-gray-700">
          <AccordionTrigger className="text-left hover:text-emerald-400">
            How is data fetched from the backend to the frontend?
          </AccordionTrigger>
          <AccordionContent className="text-left text-gray-300">
            The React frontend sends an HTTP GET request to the Express server using Axios with query parameters (page, limit, search, types). Express forwards the request to the gRPC client. The gRPC client communicates with the gRPC server, which queries the MongoDB Atlas database. The MongoDB server responds with the filtered and paginated data. The gRPC server sends the response back to Express. Express sends the processed data back to the frontend. The frontend updates the state and displays the data in a table.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-4" className="border-gray-700">
          <AccordionTrigger className="text-left hover:text-emerald-400">
            What is the role of pagination in this application?
          </AccordionTrigger>
          <AccordionContent className="text-left text-gray-300">
            Pagination allows retrieving a subset of the data at a time, improving performance by reducing the data transferred and processed on the frontend. The user can navigate between pages using the "Previous" and "Next" buttons.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-5" className="border-gray-700">
          <AccordionTrigger className="text-left hover:text-emerald-400">
            How did I implement search functionality in this application?
          </AccordionTrigger>
          <AccordionContent className="text-left text-gray-300">
            The frontend sends the search query as a parameter in the API request. The backend constructs a regex-based MongoDB query, filtering the title field for partial matches. The filtered results are paginated and returned to the frontend.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-6" className="border-gray-700">
          <AccordionTrigger className="text-left hover:text-emerald-400">
            How does the frontend highlight search results?
          </AccordionTrigger>
          <AccordionContent className="text-left text-gray-300">
            The frontend uses a regex-based function to wrap matched search terms with a span that applies a blue background.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-7" className="border-gray-700">
          <AccordionTrigger className="text-left hover:text-emerald-400">
            How is API call optimization handled?
          </AccordionTrigger>
          <AccordionContent className="text-left text-gray-300">
            The useEffect hook is used to trigger data fetching when dependencies (page, search, limit, types) change, reducing unnecessary API calls.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );