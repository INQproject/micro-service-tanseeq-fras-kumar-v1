
import React, { useState } from "react";
import { Camera, Edit, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import FaceCheckOutDialog from "./dialogs/FaceCheckOutDialog";
import ManualCheckOutDialog from "./dialogs/ManualCheckOutDialog";
import { toast } from "sonner";

interface Employee {
  id: number;
  name: string;
  role: string;
  project: string;
  projectId: number;
  location: string;
  locationId: number;
  checkInTime: string;
  imageUrl: string;
}

interface CheckInOnly {
  id: number;
  name: string;
  role: string;
  project: string;
  projectId: number;
  location: string;
  locationId: number;
  checkInTime: string;
  imageUrl: string;
  checkInDate: string;
}

interface ExceptionTabProps {
  searchQuery: string;
  selectedProject: string;
  selectedLocation: string;
  projects: { id: number; name: string }[];
  locations: { id: number; name: string }[];
}

const ExceptionTab = ({
  searchQuery,
  selectedProject,
  selectedLocation,
  projects,
  locations
}: ExceptionTabProps) => {
  const [openFaceDialog, setOpenFaceDialog] = useState(false);
  const [openManualDialog, setOpenManualDialog] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [exceptionTab, setExceptionTab] = useState("pending-checkouts");

  // Mock employees with pending checkouts
  const mockPendingCheckouts: Employee[] = [
    {
      id: 8,
      name: "Thomas Harris",
      role: "Construction Worker",
      project: "Main Building Construction",
      projectId: 1,
      location: "Site A",
      locationId: 1,
      checkInTime: "08:15 AM",
      imageUrl: "https://randomuser.me/api/portraits/men/4.jpg"
    },
    {
      id: 9,
      name: "Jennifer White",
      role: "Electrician",
      project: "Bridge Expansion Project",
      projectId: 2,
      location: "Site B",
      locationId: 2,
      checkInTime: "09:00 AM",
      imageUrl: "https://randomuser.me/api/portraits/women/5.jpg"
    }
  ];

  // Mock employees with missed check-ins (checked out without checking in)
  const mockMissedCheckIns: CheckInOnly[] = [
    {
      id: 10,
      name: "Robert Green",
      role: "Supervisor",
      project: "Highway Renovation",
      projectId: 3,
      location: "Office",
      locationId: 3,
      checkInTime: "-",
      checkInDate: "2025-04-22",
      imageUrl: "https://randomuser.me/api/portraits/men/5.jpg"
    }
  ];

  // Filter employees based on search query and filters
  const filteredPendingCheckouts = mockPendingCheckouts.filter(employee => {
    const matchesSearch = employee.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         employee.id.toString().includes(searchQuery);
    const matchesProject = selectedProject === "all" || employee.projectId.toString() === selectedProject;
    const matchesLocation = selectedLocation === "all" || employee.locationId.toString() === selectedLocation;
    
    return matchesSearch && matchesProject && matchesLocation;
  });

  const filteredMissedCheckIns = mockMissedCheckIns.filter(employee => {
    const matchesSearch = employee.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         employee.id.toString().includes(searchQuery);
    const matchesProject = selectedProject === "all" || employee.projectId.toString() === selectedProject;
    const matchesLocation = selectedLocation === "all" || employee.locationId.toString() === selectedLocation;
    
    return matchesSearch && matchesProject && matchesLocation;
  });

  const handleFaceCheckOut = (employee: Employee) => {
    setSelectedEmployee(employee);
    setOpenFaceDialog(true);
  };

  const handleManualCheckOut = (employee: Employee) => {
    setSelectedEmployee(employee);
    setOpenManualDialog(true);
  };

  const handleFaceCheckOutComplete = () => {
    setOpenFaceDialog(false);
    toast.success(`${selectedEmployee?.name} has been successfully checked out`, {
      description: `Exception resolved at ${new Date().toLocaleTimeString()}`
    });
    setSelectedEmployee(null);
  };

  const handleManualCheckOutComplete = (
    projectId: string, 
    time: string,
    reason: string
  ) => {
    setOpenManualDialog(false);
    
    const selectedProjectName = projects.find(p => p.id.toString() === projectId)?.name;
    
    toast.success(`${selectedEmployee?.name} exception has been resolved`, {
      description: `Project: ${selectedProjectName}, Time: ${time}, Reason: ${reason.substring(0, 30)}${reason.length > 30 ? '...' : ''}`
    });
    setSelectedEmployee(null);
  };

  return (
    <div className="space-y-4">
      {/* Exception Type Tabs */}
      <Tabs defaultValue="pending-checkouts" value={exceptionTab} onValueChange={setExceptionTab} className="w-full">
        <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 h-8">
          <TabsTrigger 
            value="pending-checkouts" 
            className="text-xs data-[state=active]:bg-proscape data-[state=active]:text-white"
          >
            Pending Check Outs
          </TabsTrigger>
          <TabsTrigger 
            value="missed-checkins" 
            className="text-xs data-[state=active]:bg-proscape data-[state=active]:text-white"
          >
            Missed Check Ins
          </TabsTrigger>
        </TabsList>

        {/* Pending Checkouts Tab */}
        <TabsContent value="pending-checkouts" className="mt-4">
          <div className="bg-white rounded-md shadow overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[250px]">Employee</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Project</TableHead>
                  <TableHead>Check-in Time</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPendingCheckouts.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-10 text-gray-500">
                      No pending checkouts found matching your filters
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredPendingCheckouts.map((employee) => (
                    <TableRow key={employee.id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center space-x-3">
                          <Avatar className="h-10 w-10">
                            <img src={employee.imageUrl} alt={employee.name} />
                          </Avatar>
                          <div>
                            <div className="font-medium">{employee.name}</div>
                            <div className="text-sm text-gray-500">ID: {employee.id}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{employee.role}</TableCell>
                      <TableCell>{employee.project}</TableCell>
                      <TableCell>
                        <div className="flex items-center text-gray-600">
                          <Clock className="h-4 w-4 mr-1 text-amber-500" />
                          <span>{employee.checkInTime}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end space-x-2">
                          <Button 
                            onClick={() => handleFaceCheckOut(employee)} 
                            variant="outline" 
                            size="sm"
                            className="flex items-center space-x-1 bg-proscape/5 hover:bg-proscape/10 border-proscape/20 text-xs"
                          >
                            <Camera className="h-3 w-3" />
                            <span>Face</span>
                          </Button>
                          <Button 
                            onClick={() => handleManualCheckOut(employee)} 
                            variant="outline"
                            size="sm"
                            className="flex items-center space-x-1 text-xs"
                          >
                            <Edit className="h-3 w-3" />
                            <span>Manual</span>
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </TabsContent>

        {/* Missed Check-ins Tab */}
        <TabsContent value="missed-checkins" className="mt-4">
          <div className="bg-white rounded-md shadow overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[250px]">Employee</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Project</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredMissedCheckIns.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-10 text-gray-500">
                      No missed check-ins found matching your filters
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredMissedCheckIns.map((employee) => (
                    <TableRow key={employee.id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center space-x-3">
                          <Avatar className="h-10 w-10">
                            <img src={employee.imageUrl} alt={employee.name} />
                          </Avatar>
                          <div>
                            <div className="font-medium">{employee.name}</div>
                            <div className="text-sm text-gray-500">ID: {employee.id}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{employee.role}</TableCell>
                      <TableCell>{employee.project}</TableCell>
                      <TableCell>
                        <div className="flex items-center text-gray-600">
                          <Clock className="h-4 w-4 mr-1 text-amber-500" />
                          <span>{employee.checkInDate}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button 
                          variant="outline"
                          size="sm"
                          className="flex items-center space-x-1 text-xs"
                          onClick={() => {
                            toast.info(`Manual entry needed for ${employee.name}`, {
                              description: "Please use the Manual Check In form to create a missed check-in record"
                            });
                          }}
                        >
                          <Edit className="h-3 w-3" />
                          <span>Resolve</span>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
      </Tabs>

      {/* Face Check Out Dialog */}
      <FaceCheckOutDialog
        open={openFaceDialog}
        onOpenChange={setOpenFaceDialog}
        employee={selectedEmployee}
        onComplete={handleFaceCheckOutComplete}
      />

      {/* Manual Check Out Dialog */}
      <ManualCheckOutDialog
        open={openManualDialog}
        onOpenChange={setOpenManualDialog}
        employee={selectedEmployee}
        projects={projects}
        onComplete={handleManualCheckOutComplete}
      />
    </div>
  );
};

export default ExceptionTab;
