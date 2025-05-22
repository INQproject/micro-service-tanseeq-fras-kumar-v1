
import { useState, useEffect } from "react";
import { format } from "date-fns";
import ManualAttendanceFilters from "@/components/attendance/ManualAttendanceFilters";
import ManualAttendanceTabs from "@/components/attendance/ManualAttendanceTabs";
import { filterRecords, initialFilters, AttendanceFilters } from "@/components/attendance/AttendanceFilterUtils";
import { mockProjects } from "@/data/mockProjects";
import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button"; // Add this import

const ManualAttendanceRecords = () => {
  const [filters, setFilters] = useState<AttendanceFilters>(initialFilters);
  const [activeTab, setActiveTab] = useState("records");
  const [selectedDate, setSelectedDate] = useState<Date>(new Date()); // Default to today's date
  const [dateSelected, setDateSelected] = useState<boolean>(true); // Default to true since we're auto-selecting today
  
  // Apply the filter function to get filtered records
  const filteredRecords = filterRecords(filters);
  
  // Reset all filters
  const handleResetFilters = () => {
    setFilters(initialFilters);
  };

  // Apply filters
  const handleApplyFilters = () => {
    // In a real application, this might trigger a data fetch or other operations
    console.log("Applying filters:", filters);
    console.log("Selected date:", selectedDate);
    
    toast({
      title: "Filters applied",
      description: `Showing attendance data for ${format(selectedDate, "PPP")}`,
    });
  };

  // Handle date change
  const handleDateChange = (date: Date | undefined) => {
    if (date) {
      setSelectedDate(date);
      setDateSelected(true);
      
      toast({
        title: "Date selected",
        description: `Attendance date set to ${format(date, "PPP")}`,
      });
    }
  };

  // Log to help with debugging
  useEffect(() => {
    console.log("ManualAttendanceRecords rendered with activeTab:", activeTab);
  }, [activeTab]);

  return (
    <div className="space-y-5 px-1 pt-5">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-gray-800">Manual Attendance Records</h1>
        
        {/* Tab switcher for direct access */}
        <div className="flex gap-2">
          <Button 
            variant={activeTab === "records" ? "default" : "outline"} 
            onClick={() => setActiveTab("records")}
            size="sm"
          >
            Records
          </Button>
          <Button 
            variant={activeTab === "override-entry" ? "default" : "outline"} 
            onClick={() => setActiveTab("override-entry")}
            size="sm"
          >
            Override Entry
          </Button>
        </div>
      </div>
      
      {/* Filters Section */}
      <ManualAttendanceFilters 
        filters={filters}
        setFilters={setFilters}
        onReset={handleResetFilters}
        onApply={handleApplyFilters}
      />
      
      {/* Tabs Section with Date Picker */}
      <ManualAttendanceTabs 
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        filteredRecords={filteredRecords}
        filters={filters}
        projects={mockProjects}
        selectedDate={selectedDate}
        setSelectedDate={handleDateChange}
        dateSelected={dateSelected}
        setDateSelected={setDateSelected}
      />
    </div>
  );
};

export default ManualAttendanceRecords;
