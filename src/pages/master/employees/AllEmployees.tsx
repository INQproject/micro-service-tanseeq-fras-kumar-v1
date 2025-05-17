
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Eye, User, Search, Filter, CloudDownload } from "lucide-react";
import { TanseeqImportModal } from "@/components/employees/TanseeqImportModal";
import { useNavigate } from "react-router-dom";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import EmployeeActionsCell from "../EmployeeActionsCell";
import FaceEnrollmentModal from "../FaceEnrollmentModal";

// Sample entities for dummy data
const entities = [
  "Tanseeq Investment",
  "Tanseeq Landscaping LLC",
  "Al Maha Projects",
  "Zenith Infrastructure",
  "Gulf Builders International"
];

// Sample categories with the new predefined values
const categories = [
  "Carpenter",
  "Mason",
  "Plumber",
  "Electrician",
  "Welder",
  "Steel Fixer", 
  "Painter",
  "Helper",
  "Driver",
  "Supervisor"
];

// Sample classifications
const classifications = ["Laborer", "Staff"];

// Mock data for all employees
const initialEmployees = [
  { 
    id: 1, 
    name: "John Smith", 
    employeeId: "EMP001", 
    role: "Labour", 
    category: "Laborer",
    classification: "Laborer",
    entity: "Tanseeq Investment",
    contactNumber: "+971 50 123 4567",
    email: "john.smith@tanseeq.ae",
    faceEnrolled: true,
    status: "Active" 
  },
  { 
    id: 2, 
    name: "Sarah Johnson", 
    employeeId: "EMP002", 
    role: "Supervisor", 
    category: "Supervisor",
    classification: "Staff",
    entity: "Tanseeq Landscaping LLC",
    contactNumber: "+971 52 234 5678",
    email: "sarah.johnson@tanseeq.ae",
    faceEnrolled: true,
    status: "Active" 
  },
  { 
    id: 3, 
    name: "Robert Williams", 
    employeeId: "EMP003", 
    role: "Labour", 
    category: "Laborer",
    classification: "Laborer",
    entity: "Al Maha Projects",
    contactNumber: "+971 55 345 6789",
    email: "robert.williams@almaha.ae",
    faceEnrolled: false,
    status: "Active" 
  },
  { 
    id: 4, 
    name: "Emily Davis", 
    employeeId: "EMP004", 
    role: "Labour", 
    category: "Driver",
    classification: "Staff",
    entity: "Gulf Builders International",
    contactNumber: "+971 54 456 7890",
    email: "emily.davis@gulfbuilders.ae",
    faceEnrolled: true,
    status: "Active" 
  },
  { 
    id: 5, 
    name: "James Miller", 
    employeeId: "EMP005", 
    role: "Report Admin", 
    category: "Engineer",
    classification: "Staff",
    entity: "Zenith Infrastructure",
    contactNumber: "+971 56 567 8901",
    email: "james.miller@zenith.ae",
    faceEnrolled: true,
    status: "Active" 
  },
  { 
    id: 6, 
    name: "Jennifer Wilson", 
    employeeId: "EMP006", 
    role: null, 
    category: "Consultant",
    classification: "Staff",
    entity: "Tanseeq Investment",
    contactNumber: "+971 50 678 9012",
    email: "jennifer.wilson@tanseeq.ae",
    faceEnrolled: false,
    status: "Inactive" 
  },
  { 
    id: 7, 
    name: "Michael Brown", 
    employeeId: "EMP007", 
    role: "Super Admin", 
    category: "Manager",
    classification: "Staff",
    entity: "Tanseeq Landscaping LLC",
    contactNumber: "+971 52 789 0123",
    email: "michael.brown@tanseeq.ae",
    faceEnrolled: true,
    status: "Active" 
  },
  { 
    id: 8, 
    name: "David Thompson", 
    employeeId: "EMP008", 
    role: null, 
    category: "Laborer",
    classification: "Laborer",
    entity: "Al Maha Projects",
    contactNumber: "+971 55 890 1234",
    email: "david.thompson@almaha.ae",
    faceEnrolled: false,
    status: "Active" 
  },
];

const AllEmployees = () => {
  const [employees, setEmployees] = useState(initialEmployees);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [entityFilter, setEntityFilter] = useState("all");
  const [classificationFilter, setClassificationFilter] = useState("all");
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const navigate = useNavigate();
  const [isTanseeqModalOpen, setIsTanseeqModalOpen] = useState(false);
  const [isFaceModalOpen, setIsFaceModalOpen] = useState(false);
  const [selectedFaceEmployee, setSelectedFaceEmployee] = useState(null);

  const filteredEmployees = employees.filter((employee) => {
    const searchMatch = 
      employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.employeeId.toLowerCase().includes(searchTerm.toLowerCase());
    const statusMatch = 
      statusFilter === "all" || 
      employee.status.toLowerCase() === statusFilter.toLowerCase();
    const categoryMatch = 
      categoryFilter === "all" || 
      employee.category.toLowerCase() === categoryFilter.toLowerCase();
    const entityMatch = 
      entityFilter === "all" || 
      employee.entity === entityFilter;
    const classificationMatch = 
      classificationFilter === "all" || 
      employee.classification === classificationFilter;

    return searchMatch && statusMatch && categoryMatch && entityMatch && classificationMatch;
  });

  const handleEmployeeView = (employee) => {
    setSelectedEmployee(employee);
    setIsViewModalOpen(true);
  };

  const handleFaceEnrollment = (employee) => {
    setSelectedFaceEmployee(employee);
    setIsFaceModalOpen(true);
  };

  const handleTanseeqImport = (newEmployees) => {
    const maxId = Math.max(...employees.map(e => e.id));
    
    const employeesToAdd = newEmployees.map((emp, index) => ({
      id: maxId + index + 1,
      name: emp.name,
      employeeId: emp.employeeId,
      role: emp.role || null,
      category: categories[Math.floor(Math.random() * categories.length)],
      entity: entities[Math.floor(Math.random() * entities.length)],
      contactNumber: "+971 5" + Math.floor(Math.random() * 10) + " " + 
                    Math.floor(Math.random() * 900 + 100) + " " + 
                    Math.floor(Math.random() * 9000 + 1000),
      email: emp.name.toLowerCase().replace(" ", ".") + "@tanseeq.ae",
      faceEnrolled: false,
      status: "Active",
      classification: classifications[Math.floor(Math.random() * classifications.length)]
    }));
    
    setEmployees([...employees, ...employeesToAdd]);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">All Employees</h1>
        <div className="flex space-x-3">
          <button 
            onClick={() => setIsTanseeqModalOpen(true)}
            className="flex items-center bg-proscape hover:bg-proscape-dark text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
          >
            <CloudDownload className="h-4 w-4 mr-2" />
            Import from Tanseeq API
          </button>
        </div>
      </div>
      
      <Card className="p-0 overflow-hidden">
        <div className="p-4 border-b border-gray-200 bg-gray-50 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="pl-10 pr-3 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-proscape"
              placeholder="Search by name or employee ID"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex flex-col md:flex-row gap-4 md:items-center">
            <div className="flex items-center">
              <Filter className="h-5 w-5 text-gray-400 mr-2" />
              <span className="text-sm text-gray-600 mr-2">Status:</span>
              <select
                className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-proscape"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
            <div className="flex items-center">
              <span className="text-sm text-gray-600 mr-2">Category:</span>
              <select
                className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-proscape"
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
              >
                <option value="all">All Categories</option>
                {categories.map((category, index) => (
                  <option key={index} value={category.toLowerCase()}>{category}</option>
                ))}
              </select>
            </div>
            <div className="flex items-center">
              <span className="text-sm text-gray-600 mr-2">Classification:</span>
              <select
                className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-proscape"
                value={classificationFilter}
                onChange={(e) => setClassificationFilter(e.target.value)}
              >
                <option value="all">All Classifications</option>
                {classifications.map((classification, index) => (
                  <option key={index} value={classification}>{classification}</option>
                ))}
              </select>
            </div>
            <div className="flex items-center">
              <span className="text-sm text-gray-600 mr-2">Entity:</span>
              <select
                className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-proscape"
                value={entityFilter}
                onChange={(e) => setEntityFilter(e.target.value)}
              >
                <option value="all">All Entities</option>
                {entities.map((entity, index) => (
                  <option key={index} value={entity}>{entity}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Employee ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Entity</TableHead>
                <TableHead>Classification</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredEmployees.length > 0 ? (
                filteredEmployees.map(employee => (
                  <TableRow key={employee.id}>
                    <TableCell className="font-medium">{employee.employeeId}</TableCell>
                    <TableCell>{employee.name}</TableCell>
                    <TableCell className="max-w-[200px] truncate" title={employee.entity}>
                      {employee.entity}
                    </TableCell>
                    <TableCell>{employee.classification}</TableCell>
                    <TableCell>{employee.category}</TableCell>
                    <TableCell>
                      {employee.role && (
                        <Badge 
                          className="bg-green-100 text-green-800 hover:bg-green-200"
                        >
                          {employee.role}
                        </Badge>
                      )}
                      {!employee.role && (
                        <Badge 
                          className="bg-gray-100 text-gray-800 hover:bg-gray-200"
                        >
                          Unassigned
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      <Badge 
                        className={
                          employee.status === "Active" 
                            ? "bg-green-100 text-green-800 hover:bg-green-200" 
                            : "bg-red-100 text-red-800 hover:bg-red-200"
                        }
                      >
                        {employee.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end space-x-3">
                        <EmployeeActionsCell
                          employee={{
                            id: employee.employeeId,
                            name: employee.name,
                            hasFaceEnrolled: employee.faceEnrolled
                          }}
                          onEnrollFace={handleFaceEnrollment}
                        />
                        
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <button 
                                onClick={() => handleEmployeeView(employee)}
                                className="text-blue-500 hover:text-blue-700 p-1"
                              >
                                <Eye className="h-4 w-4" />
                              </button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>View Employee Details</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-6 text-gray-500">
                    No employees found matching the search criteria
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        
        <div className="px-4 py-3 flex items-center justify-between border-t border-gray-200 bg-gray-50">
          <div className="text-sm text-gray-700">
            Showing <span className="font-medium">{filteredEmployees.length}</span> of{" "}
            <span className="font-medium">{employees.length}</span> employees
          </div>
          <div className="flex space-x-2">
            <button className="px-3 py-1 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50 disabled:opacity-50">
              Previous
            </button>
            <button className="px-3 py-1 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50">
              Next
            </button>
          </div>
        </div>
      </Card>

      {isTanseeqModalOpen && (
        <TanseeqImportModal 
          open={isTanseeqModalOpen}
          onOpenChange={() => setIsTanseeqModalOpen(false)}
          onImportComplete={handleTanseeqImport}
        />
      )}
      
      {selectedFaceEmployee && (
        <FaceEnrollmentModal
          isOpen={isFaceModalOpen}
          onClose={() => setIsFaceModalOpen(false)}
          employeeName={selectedFaceEmployee.name}
          employeeId={selectedFaceEmployee.id}
          isUpdate={selectedFaceEmployee.hasFaceEnrolled}
        />
      )}
    </div>
  );
};

export default AllEmployees;
