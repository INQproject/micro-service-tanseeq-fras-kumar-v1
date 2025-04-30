
import React, { useState } from "react";
import { CalendarIcon, Search, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { format } from "date-fns";

interface FilterValues {
  startDate: Date | null;
  endDate: Date | null;
  employeeId: string;
  name: string;
  entity: string;
  category: string;
  classification: string;
  project: string;
  location: string;
}

interface AttendanceFiltersProps {
  entities: string[];
  categories: string[];
  projects: string[];
  locations: string[];
  onApply: (filters: FilterValues) => void;
  onClear: () => void;
  isLoading?: boolean;
}

const AttendanceFilters: React.FC<AttendanceFiltersProps> = ({
  entities,
  categories,
  projects,
  locations,
  onApply,
  onClear,
  isLoading = false
}) => {
  // Default filter values
  const defaultFilters: FilterValues = {
    startDate: null,
    endDate: null,
    employeeId: "",
    name: "",
    entity: "",
    category: "",
    classification: "",
    project: "",
    location: ""
  };
  
  // Local state for filter values
  const [filters, setFilters] = useState<FilterValues>(defaultFilters);

  // Update filter value
  const handleFilterChange = (field: keyof FilterValues, value: string | Date | null) => {
    setFilters(prev => ({ ...prev, [field]: value }));
  };

  // Handle employee ID input - allow only numeric values
  const handleEmployeeIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === '' || /^[0-9\b]+$/.test(value)) {
      handleFilterChange("employeeId", value);
    }
  };

  // Apply filters
  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    onApply(filters);
  };

  // Clear all filters
  const handleClear = () => {
    setFilters(defaultFilters);
    onClear();
  };

  // Helper to format dates for display
  const formatDate = (date: Date | null) => {
    if (!date) return "";
    return format(date, "MMM dd, yyyy");
  };

  return (
    <form 
      onSubmit={handleApply}
      className="bg-white rounded-lg shadow-sm border border-gray-200 p-5 mb-6"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Row 1 - Date Range */}
        <div className="flex space-x-4">
          {/* From Date */}
          <div className="w-1/2">
            <label className="block text-sm font-medium text-gray-700 mb-1">From Date</label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left font-normal"
                  disabled={isLoading}
                  type="button"
                >
                  <CalendarIcon className="mr-2 h-4 w-4 text-green-600" />
                  {filters.startDate ? (
                    formatDate(filters.startDate)
                  ) : (
                    <span className="text-gray-400">Start Date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={filters.startDate!}
                  onSelect={(date) => handleFilterChange("startDate", date)}
                  className="p-3 pointer-events-auto"
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
          
          {/* To Date */}
          <div className="w-1/2">
            <label className="block text-sm font-medium text-gray-700 mb-1">To Date</label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left font-normal"
                  disabled={isLoading}
                  type="button"
                >
                  <CalendarIcon className="mr-2 h-4 w-4 text-green-600" />
                  {filters.endDate ? (
                    formatDate(filters.endDate)
                  ) : (
                    <span className="text-gray-400">End Date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={filters.endDate!}
                  onSelect={(date) => handleFilterChange("endDate", date)}
                  className="p-3 pointer-events-auto"
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>
        
        {/* Employee ID - Numeric only */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Employee ID</label>
          <div className="relative">
            <Input
              type="text"
              placeholder="Enter Employee ID"
              value={filters.employeeId}
              onChange={handleEmployeeIdChange}
              disabled={isLoading}
              className="pl-8"
            />
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
          </div>
        </div>
        
        {/* Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
          <div className="relative">
            <Input
              type="text"
              placeholder="Search by Name"
              value={filters.name}
              onChange={(e) => handleFilterChange("name", e.target.value)}
              disabled={isLoading}
              className="pl-8"
            />
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
          </div>
        </div>
        
        {/* Row 2 */}
        {/* Entity */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Entity</label>
          <select
            className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600 disabled:cursor-not-allowed disabled:opacity-50"
            value={filters.entity}
            onChange={(e) => handleFilterChange("entity", e.target.value)}
            disabled={isLoading}
          >
            <option value="all-entities">All Entities</option>
            {entities.map((entity, i) => (
              <option key={i} value={entity}>{entity}</option>
            ))}
          </select>
        </div>
        
        {/* Category */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
          <select
            className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600 disabled:cursor-not-allowed disabled:opacity-50"
            value={filters.category}
            onChange={(e) => handleFilterChange("category", e.target.value)}
            disabled={isLoading}
          >
            <option value="all-categories">All Categories</option>
            {categories.map((category, i) => (
              <option key={i} value={category}>{category}</option>
            ))}
          </select>
        </div>
        
        {/* Classification */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Classification</label>
          <select
            className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600 disabled:cursor-not-allowed disabled:opacity-50"
            value={filters.classification}
            onChange={(e) => handleFilterChange("classification", e.target.value)}
            disabled={isLoading}
          >
            <option value="all-classifications">All Classifications</option>
            <option value="Laborer">Laborer</option>
            <option value="Staff">Staff</option>
          </select>
        </div>
        
        {/* Row 3 */}
        {/* Project */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Project</label>
          <select
            className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600 disabled:cursor-not-allowed disabled:opacity-50"
            value={filters.project}
            onChange={(e) => handleFilterChange("project", e.target.value)}
            disabled={isLoading}
          >
            <option value="all-projects">All Projects</option>
            {projects.map((project, i) => (
              <option key={i} value={project}>{project}</option>
            ))}
          </select>
        </div>
        
        {/* Location */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
          <select
            className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600 disabled:cursor-not-allowed disabled:opacity-50"
            value={filters.location}
            onChange={(e) => handleFilterChange("location", e.target.value)}
            disabled={isLoading}
          >
            <option value="all-locations">All Locations</option>
            {locations.map((location, i) => (
              <option key={i} value={location}>{location}</option>
            ))}
          </select>
        </div>
      </div>
      
      {/* Action Buttons */}
      <div className="flex justify-end mt-6 space-x-4">
        <Button 
          type="button" 
          variant="outline" 
          onClick={handleClear}
          disabled={isLoading}
          className="text-gray-600"
        >
          <X className="mr-1 h-4 w-4" />
          Clear All
        </Button>
        <Button 
          type="submit"
          disabled={isLoading}
          className="bg-green-600 hover:bg-green-700 text-white"
        >
          {isLoading ? (
            <span className="flex items-center">
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Applying...
            </span>
          ) : (
            <>
              <Check className="mr-1 h-4 w-4" />
              Apply Filters
            </>
          )}
        </Button>
      </div>
    </form>
  );
};

export default AttendanceFilters;
