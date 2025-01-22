import { Checkbox } from "@/components/ui/checkbox";
import { QUESTION_TYPES } from './QuestionTypes';

interface TypeFilterProps {
  selectedTypes: string[];
  onTypeToggle: (type: string) => void;
}

export const TypeFilter = ({ selectedTypes, onTypeToggle }: TypeFilterProps) => (
  <div className="flex flex-wrap gap-6 p-4 bg-gray-700 rounded-lg">
    <span className="text-md text-gray-400">Filter by type:</span>
    {QUESTION_TYPES.map((type) => (
      <div key={type.id} className="flex items-center space-x-2">
        <Checkbox
          id={type.id}
          checked={selectedTypes.includes(type.id)}
          onCheckedChange={() => onTypeToggle(type.id)}
          className="border-gray-400 data-[state=checked]:bg-blue-500"
        />
        <label htmlFor={type.id} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
          {type.label}
        </label>
      </div>
    ))}
  </div>
);