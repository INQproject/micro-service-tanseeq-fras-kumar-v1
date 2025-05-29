
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, Trash2, Eye } from "lucide-react";

// Mock data for attendance types
const mockAttendanceTypes = [
  {
    id: 1,
    attendanceType: "Regular",
    description: "Standard working hours attendance",
    status: "Active"
  },
  {
    id: 2,
    attendanceType: "Overtime",
    description: "Extra hours worked beyond regular time",
    status: "Active"
  },
  {
    id: 3,
    attendanceType: "Flexible",
    description: "Flexible working hours arrangement",
    status: "Active"
  },
  {
    id: 4,
    attendanceType: "Remote",
    description: "Work from home attendance",
    status: "Inactive"
  },
  {
    id: 5,
    attendanceType: "Part-time",
    description: "Part-time working schedule",
    status: "Active"
  }
];

export default function AttendanceType() {
  const [attendanceTypes, setAttendanceTypes] = useState(mockAttendanceTypes);

  const handleAdd = () => {
    console.log("Add new attendance type");
  };

  const handleView = (id: number) => {
    console.log("View attendance type:", id);
  };

  const handleEdit = (id: number) => {
    console.log("Edit attendance type:", id);
  };

  const handleDelete = (id: number) => {
    console.log("Delete attendance type:", id);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Attendance Type</h1>
        <Button onClick={handleAdd} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Add
        </Button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-16">Sl. No</TableHead>
              <TableHead>Attendance Type</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {attendanceTypes.map((item, index) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">{index + 1}</TableCell>
                <TableCell className="font-medium">{item.attendanceType}</TableCell>
                <TableCell className="text-gray-600">{item.description}</TableCell>
                <TableCell>
                  <Badge 
                    variant={item.status === "Active" ? "default" : "secondary"}
                    className={item.status === "Active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}
                  >
                    {item.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handleView(item.id)}
                      className="h-8 w-8 p-0"
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handleEdit(item.id)}
                      className="h-8 w-8 p-0"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handleDelete(item.id)}
                      className="h-8 w-8 p-0 text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
