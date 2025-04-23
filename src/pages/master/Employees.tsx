import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Edit, Eye, Trash, User, Camera, Import, Search, Filter, Check, X } from "lucide-react";
import { FaceScanner } from "@/components/face/FaceScanner";
import { useNavigate } from "react-router-dom";

// Mock data
const initialEmployees = [
  { 
    id: 1, 
    name: "John Smith", 
    employeeId: "EMP001", 
    role: "Labour", 
    project: "Main Building Construction", 
    faceEnrolled: true,
    status: "Active" 
  },
  { 
    id: 2, 
    name: "Sarah Johnson", 
    employeeId: "EMP002", 
    role: "Supervisor", 
    project: "Bridge Expansion Project", 
    faceEnrolled: true,
    status: "Active" 
  },
  { 
    id: 3, 
    name: "Robert Williams", 
    employeeId: "EMP003", 
    role: "Labour", 
    project: "Highway Renovation", 
    faceEnrolled: false,
    status: "Active" 
  },
  { 
    id: 4, 
    name: "Emily Davis", 
    employeeId: "EMP004", 
    role: "Labour", 
    project: "Main Building Construction", 
    faceEnrolled: true,
    status: "Active" 
  },
  { 
    id: 5, 
    name: "James Miller", 
    employeeId: "EMP005", 
    role: "Report Admin", 
    project: "Highway Renovation", 
    faceEnrolled: true,
    status: "Active" 
  },
  { 
    id: 6, 
    name: "Jennifer Wilson", 
    employeeId: "EMP006", 
    role: "Labour", 
    project: "Bridge Expansion Project", 
    faceEnrolled: false,
    status: "Inactive" 
  },
  { 
    id: 7, 
    name: "Michael Brown", 
    employeeId: "EMP007", 
    role: "Super Admin", 
    project: "Main Building Construction", 
    faceEnrolled: true,
    status: "Active" 
  },
  { 
    id: 8, 
    name: "David Thompson", 
    employeeId: "EMP008", 
    role: "Labour", 
    project: "Highway Renovation", 
    faceEnrolled: false,
    status: "Active" 
  },
];

const mockAttendanceRecords = [
  { 
    id: 1, 
    employee: "John Smith", 
    employeeId: "EMP001", 
    date: "22 Apr 2025", 
    checkInTime: "08:30 AM", 
    checkInMethod: "Face", 
    checkOutTime: "05:15 PM", 
    checkOutMethod: "Face", 
    project: "Main Building Construction",
    totalHours: "8h 45m",
    comment: ""
  },
  { 
    id: 2, 
    employee: "Sarah Johnson", 
    employeeId: "EMP002", 
    date: "22 Apr 2025", 
    checkInTime: "08:45 AM", 
    checkInMethod: "Face", 
    checkOutTime: "05:30 PM", 
    checkOutMethod: "Manual", 
    project: "Bridge Expansion Project",
    totalHours: "8h 45m",
    comment: "Employee forgot to check out. Manual checkout by supervisor."
  },
  { 
    id: 3, 
    employee: "Robert Williams", 
    employeeId: "EMP003", 
    date: "22 Apr 2025", 
    checkInTime: "09:15 AM", 
    checkInMethod: "Manual", 
    checkOutTime: "05:45 PM", 
    checkOutMethod: "Face", 
    project: "Highway Renovation",
    totalHours: "8h 30m",
    comment: "Late arrival due to transportation issue."
  },
  { 
    id: 4, 
    employee: "Emily Davis", 
    employeeId: "EMP004", 
    date: "22 Apr 2025", 
    checkInTime: "08:15 AM", 
    checkInMethod: "Face", 
    checkOutTime: "04:30 PM", 
    checkOutMethod: "Face", 
    project: "Main Building Construction",
    totalHours: "8h 15m",
    comment: ""
  },
  { 
    id: 5, 
    employee: "James Miller", 
    employeeId: "EMP005", 
    date: "22 Apr 2025", 
    checkInTime: "08:30 AM", 
    checkInMethod: "Face", 
    checkOutTime: "05:00 PM", 
    checkOutMethod: "Face", 
    project: "Highway Renovation",
    totalHours: "8h 30m",
    comment: ""
  },
  { 
    id: 6, 
    employee: "Jennifer Wilson", 
    employeeId: "EMP006", 
    date: "21 Apr 2025", 
    checkInTime: "08:30 AM", 
    checkInMethod: "Face", 
    checkOutTime: "05:15 PM", 
    checkOutMethod: "Face", 
    project: "Bridge Expansion Project",
    totalHours: "8h 45m",
    comment: ""
  },
  { 
    id: 7, 
    employee: "Michael Brown", 
    employeeId: "EMP007", 
    date: "21 Apr 2025", 
    checkInTime: "08:45 AM", 
    checkInMethod: "Face", 
    checkOutTime: "05:30 PM", 
    checkOutMethod: "Manual", 
    project: "Main Building Construction",
    totalHours: "8h 45m",
    comment: "Employee forgot to check out. Manual checkout by supervisor."
  },
  { 
    id: 8, 
    employee: "David Thompson", 
    employeeId: "EMP008", 
    date: "21 Apr 2025", 
    checkInTime: "08:15 AM", 
    checkInMethod: "Face", 
    checkOutTime: "05:00 PM", 
    checkOutMethod: "Face", 
    project: "Highway Renovation",
    totalHours: "8h 45m",
    comment: ""
  },
];

const Employees = () => {
  const [employees, setEmployees] = useState(initialEmployees);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [roleFilter, setRoleFilter] = useState("all");
  // New filter state for face enrollment
  const [enrolledFilter, setEnrolledFilter] = useState("all");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEnrollModalOpen, setIsEnrollModalOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [cameraActive, setCameraActive] = useState(false);
  const [photoTaken, setPhotoTaken] = useState(false);
  const navigate = useNavigate();
  const [newEmployee, setNewEmployee] = useState({
    name: "",
    employeeId: "",
    role: "Labour",
    project: "",
    contactNumber: "",
    email: "",
    address: "",
    joiningDate: ""
  });

  // Filter employees based on search term and filters, now includes enrolledFilter
  const filteredEmployees = employees.filter((employee) => {
    const searchMatch = 
      employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.employeeId.toLowerCase().includes(searchTerm.toLowerCase());
    const statusMatch = 
      statusFilter === "all" || 
      employee.status.toLowerCase() === statusFilter.toLowerCase();
    const roleMatch = 
      roleFilter === "all" || 
      employee.role.toLowerCase() === roleFilter.toLowerCase();
    const enrolledMatch =
      enrolledFilter === "all" ||
      (enrolledFilter === "enrolled" && employee.faceEnrolled) ||
      (enrolledFilter === "not-enrolled" && !employee.faceEnrolled);

    return searchMatch && statusMatch && roleMatch && enrolledMatch;
  });

  const handleCreateEmployee = () => {
    // Generate a new ID that's one higher than the current max ID
    const maxId = Math.max(...employees.map(e => e.id));
    const newId = maxId + 1;
    
    const employeeToAdd = {
      id: newId,
      name: newEmployee.name,
      employeeId: newEmployee.employeeId,
      role: newEmployee.role,
      project: newEmployee.project,
      faceEnrolled: false,
      status: "Active"
    };
    
    setEmployees([...employees, employeeToAdd]);
    setIsCreateModalOpen(false);
    
    // Reset form
    setNewEmployee({
      name: "",
      employeeId: "",
      role: "Labour",
      project: "",
      contactNumber: "",
      email: "",
      address: "",
      joiningDate: ""
    });
  };

  const handleEmployeeView = (employee) => {
    setSelectedEmployee(employee);
    setIsViewModalOpen(true);
  };

  const handleFaceEnrollment = (employee) => {
    setSelectedEmployee(employee);
    setIsEnrollModalOpen(true);
    setCameraActive(false);
    setPhotoTaken(false);
  };

  const handlePhotoCapture = (imageBlob: Blob) => {
    // Update the employee's face enrollment status
    const updatedEmployees = employees.map(emp => 
      emp.id === selectedEmployee?.id ? {...emp, faceEnrolled: true} : emp
    );
    
    setEmployees(updatedEmployees);
    setPhotoTaken(true);
  };

  const activateCamera = () => {
    setCameraActive(true);
  };

  const capturePhoto = () => {
    setPhotoTaken(true);
  };

  const saveEnrollment = () => {
    // Update the employee's face enrollment status
    const updatedEmployees = employees.map(emp => 
      emp.id === selectedEmployee.id ? {...emp, faceEnrolled: true} : emp
    );
    
    setEmployees(updatedEmployees);
    setIsEnrollModalOpen(false);
  };

  const cancelEnrollment = () => {
    setCameraActive(false);
    setPhotoTaken(false);
    setIsEnrollModalOpen(false);
  };

  const toggleEmployeeStatus = (employeeId) => {
    const updatedEmployees = employees.map(emp => 
      emp.id === employeeId 
        ? {...emp, status: emp.status === "Active" ? "Inactive" : "Active"} 
        : emp
    );
    
    setEmployees(updatedEmployees);
  };

  const handleViewFullAttendanceHistory = (employeeId) => {
    setIsViewModalOpen(false);
    navigate(`/attendance-history?employeeId=${employeeId}`);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Employees</h1>
        <div className="flex space-x-3">
          <button className="flex items-center bg-proscape hover:bg-proscape-dark text-white px-4 py-2 rounded-md text-sm font-medium transition-colors">
            {/* Use Import icon */}
            <Import className="h-4 w-4 mr-2" />
            Import
          </button>
          {/* REMOVED: Add Employee button */}
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
              <span className="text-sm text-gray-600 mr-2">Role:</span>
              <select
                className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-proscape"
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
              >
                <option value="all">All Roles</option>
                <option value="labour">Labour</option>
                <option value="supervisor">Supervisor</option>
                <option value="super admin">Super Admin</option>
                <option value="report admin">Report Admin</option>
              </select>
            </div>
            {/* Enrolled Filter */}
            <div className="flex items-center">
              <span className="text-sm text-gray-600 mr-2">Enrolled:</span>
              <select
                className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-proscape"
                value={enrolledFilter}
                onChange={(e) => setEnrolledFilter(e.target.value)}
              >
                <option value="all">All</option>
                <option value="enrolled">Enrolled</option>
                <option value="not-enrolled">Not Enrolled</option>
              </select>
            </div>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th scope="col" className="px-4 py-3">Employee ID</th>
                <th scope="col" className="px-4 py-3">Name</th>
                <th scope="col" className="px-4 py-3">Role</th>
                <th scope="col" className="px-4 py-3">Face Enrolled</th>
                <th scope="col" className="px-4 py-3">Status</th>
                <th scope="col" className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredEmployees.length > 0 ? (
                filteredEmployees.map(employee => (
                  <tr key={employee.id} className="border-b hover:bg-gray-50">
                    <td className="px-4 py-3">{employee.employeeId}</td>
                    <td className="px-4 py-3 font-medium text-gray-900">{employee.name}</td>
                    <td className="px-4 py-3">{employee.role}</td>
                    <td className="px-4 py-3">
                      {employee.faceEnrolled ? (
                        <span className="inline-flex items-center bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded-full">
                          <Check className="h-3 w-3 mr-1" />
                          Enrolled
                        </span>
                      ) : (
                        <span className="inline-flex items-center bg-gray-100 text-gray-800 text-xs font-medium px-2 py-1 rounded-full">
                          <X className="h-3 w-3 mr-1" />
                          Not Enrolled
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <span 
                        className={`inline-flex items-center text-xs font-medium px-2 py-1 rounded-full ${
                          employee.status === "Active" 
                            ? "bg-green-100 text-green-800" 
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {employee.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex space-x-2">
                        <button 
                          onClick={() => handleEmployeeView(employee)}
                          className="text-blue-500 hover:text-blue-700"
                          title="View Employee"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        <button 
                          onClick={() => handleFaceEnrollment(employee)}
                          className="text-proscape hover:text-proscape-dark"
                          title="Face Enrollment"
                        >
                          <Camera className="h-4 w-4" />
                        </button>
                        <button 
                          onClick={() => toggleEmployeeStatus(employee.id)}
                          className={
                            employee.status === "Active" 
                              ? "text-red-500 hover:text-red-700" 
                              : "text-green-500 hover:text-green-700"
                          }
                          title={employee.status === "Active" ? "Deactivate Employee" : "Activate Employee"}
                        >
                          <Trash className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-4 py-6 text-center text-gray-500">
                    No employees found matching the search criteria
                  </td>
                </tr>
              )}
            </tbody>
          </table>
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

      {/* Create Employee Modal */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-900">Add New Employee</h2>
              <button 
                onClick={() => setIsCreateModalOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-proscape"
                    placeholder="Enter full name"
                    value={newEmployee.name}
                    onChange={(e) => setNewEmployee({...newEmployee, name: e.target.value})}
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Employee ID *
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-proscape"
                    placeholder="Enter employee ID"
                    value={newEmployee.employeeId}
                    onChange={(e) => setNewEmployee({...newEmployee, employeeId: e.target.value})}
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Role *
                  </label>
                  <select
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-proscape"
                    value={newEmployee.role}
                    onChange={(e) => setNewEmployee({...newEmployee, role: e.target.value})}
                    required
                  >
                    <option value="Labour">Labour</option>
                    <option value="Supervisor">Supervisor</option>
                    <option value="Super Admin">Super Admin</option>
                    <option value="Report Admin">Report Admin</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Project *
                  </label>
                  <select
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-proscape"
                    value={newEmployee.project}
                    onChange={(e) => setNewEmployee({...newEmployee, project: e.target.value})}
                    required
                  >
                    <option value="">Select Project</option>
                    <option value="Main Building Construction">Main Building Construction</option>
                    <option value="Bridge Expansion Project">Bridge Expansion Project</option>
                    <option value="Highway Renovation">Highway Renovation</option>
                  </select>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Contact Number
                  </label>
                  <input
                    type="tel"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-proscape"
                    placeholder="Enter contact number"
                    value={newEmployee.contactNumber}
                    onChange={(e) => setNewEmployee({...newEmployee, contactNumber: e.target.value})}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-proscape"
                    placeholder="Enter email address"
                    value={newEmployee.email}
                    onChange={(e) => setNewEmployee({...newEmployee, email: e.target.value})}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Address
                  </label>
                  <textarea
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-proscape"
                    placeholder="Enter address"
                    rows={3}
                    value={newEmployee.address}
                    onChange={(e) => setNewEmployee({...newEmployee, address: e.target.value})}
                  ></textarea>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Joining Date
                  </label>
                  <input
                    type="date"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-proscape"
                    value={newEmployee.joiningDate}
                    onChange={(e) => setNewEmployee({...newEmployee, joiningDate: e.target.value})}
                  />
                </div>
              </div>
            </div>
            
            <div className="mt-8 flex justify-end space-x-4">
              <button
                onClick={() => setIsCreateModalOpen(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateEmployee}
                className="px-4 py-2 bg-proscape hover:bg-proscape-dark text-white rounded-md text-sm font-medium transition-colors"
                disabled={!newEmployee.name || !newEmployee.employeeId || !newEmployee.role || !newEmployee.project}
              >
                Create Employee
              </button>
            </div>
          </div>
        </div>
      )}

      {/* View Employee Modal */}
      {isViewModalOpen && selectedEmployee && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-900">Employee Details</h2>
              <button 
                onClick={() => setIsViewModalOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            
            <div className="flex flex-col md:flex-row gap-6">
              <div className="md:w-1/3 flex flex-col items-center">
                <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                  {selectedEmployee.faceEnrolled ? (
                    <img 
                      src={`https://i.pravatar.cc/128?u=${selectedEmployee.id}`} 
                      alt={selectedEmployee.name} 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <User className="h-16 w-16 text-gray-400" />
                  )}
                </div>
                <h3 className="mt-4 font-bold text-lg">{selectedEmployee.name}</h3>
                <p className="text-gray-500 text-sm">{selectedEmployee.employeeId}</p>
                <span 
                  className={`mt-2 inline-flex items-center text-xs font-medium px-2 py-1 rounded-full ${
                    selectedEmployee.status === "Active" 
                      ? "bg-green-100 text-green-800" 
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {selectedEmployee.status}
                </span>
                <div className="mt-4 w-full flex justify-center space-x-2">
                  <button 
                    onClick={() => {
                      setIsViewModalOpen(false);
                      handleFaceEnrollment(selectedEmployee);
                    }}
                    className="flex items-center text-xs bg-proscape hover:bg-proscape-dark text-white px-3 py-1 rounded"
                  >
                    <Camera className="h-3 w-3 mr-1" />
                    {selectedEmployee.faceEnrolled ? "Update Face" : "Enroll Face"}
                  </button>
                </div>
              </div>
              
              <div className="md:w-2/3">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Role</p>
                    <p className="text-sm font-medium">{selectedEmployee.role}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Project</p>
                    <p className="text-sm font-medium">{selectedEmployee.project}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Face Enrolled</p>
                    <p className="text-sm font-medium">{selectedEmployee.faceEnrolled ? "Yes" : "No"}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Contact</p>
                    <p className="text-sm font-medium">+1 (555) 123-4567</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="text-sm font-medium">{selectedEmployee.name.toLowerCase().replace(" ", ".")}@example.com</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Joining Date</p>
                    <p className="text-sm font-medium">01/07/2023</p>
                  </div>
                </div>
                {/* ALL Attendance Records Table */}
                <div className="mt-6">
                  <h4 className="font-medium text-gray-900 mb-3">Attendance History</h4>
                  <div className="border rounded-md overflow-hidden max-h-60 overflow-y-auto">
                    <table className="w-full text-sm text-left text-gray-500">
                      <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                        <tr>
                          <th className="px-4 py-3">Date</th>
                          <th className="px-4 py-3">Project</th>
                          <th className="px-4 py-3">Check In</th>
                          <th className="px-4 py-3">Check Out</th>
                          <th className="px-4 py-3">Hours</th>
                          <th className="px-4 py-3">Comment</th>
                        </tr>
                      </thead>
                      <tbody>
                        {mockAttendanceRecords
                          .filter(r => r.employeeId === selectedEmployee.employeeId)
                          .map(record => (
                            <tr key={record.id} className="border-b">
                              <td className="px-4 py-3">{record.date}</td>
                              <td className="px-4 py-3">{record.project}</td>
                              <td className="px-4 py-3">
                                <span className={`px-2 py-1 rounded text-xs ${
                                  record.checkInMethod === "Face"
                                    ? "bg-green-100 text-green-800"
                                    : "bg-amber-100 text-amber-800"
                                }`}>
                                  {record.checkInTime} <span className="italic">({record.checkInMethod})</span>
                                </span>
                              </td>
                              <td className="px-4 py-3">
                                <span className={`px-2 py-1 rounded text-xs ${
                                  record.checkOutMethod === "Face"
                                    ? "bg-green-100 text-green-800"
                                    : "bg-amber-100 text-amber-800"
                                }`}>
                                  {record.checkOutTime} <span className="italic">({record.checkOutMethod})</span>
                                </span>
                              </td>
                              <td className="px-4 py-3">{record.totalHours}</td>
                              <td className="px-4 py-3">{record.comment || <span className="text-gray-400">-</span>}</td>
                            </tr>
                          ))}
                        {mockAttendanceRecords.filter(r => r.employeeId === selectedEmployee.employeeId).length === 0 && (
                          <tr>
