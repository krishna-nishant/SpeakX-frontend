import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectContent, SelectItem } from "@/components/ui/select";

interface SearchBarProps {
  search: string;
  limit: number;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onLimitChange: (value: any) => void;
}

export const SearchBar = ({ search, limit, onSearchChange, onLimitChange }: SearchBarProps) => (
  <div className="flex items-center gap-4">
    <Input
      type="text"
      placeholder="Search questions..."
      value={search}
      onChange={onSearchChange}
      className="flex-1 bg-gray-700 border-gray-600 text-white placeholder-gray-400"
    />
    <Select value={limit.toString()} onValueChange={onLimitChange}>
      <SelectTrigger className="w-24 bg-gray-700 border-gray-600 text-white">
        {limit}
      </SelectTrigger>
      <SelectContent className="bg-gray-800 border-gray-700">
        {[5, 10, 15].map(val => (
          <SelectItem key={val} value={val.toString()} className="text-white">
            {val}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  </div>
);