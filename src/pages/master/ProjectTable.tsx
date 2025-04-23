
import { Eye, Trash } from "lucide-react";
import { Tooltip } from "@/components/ui/tooltip";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";

function formatDate(date: string) {
  const d = new Date(date);
  return d.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
}

export default function ProjectTable({
  projects,
  onView,
  onDelete,
}: {
  projects: any[];
  onView: (p: any) => void;
  onDelete: (p: any) => void;
}) {
  return (
    <Card className="p-0 overflow-x-auto shadow-sm">
      <table className="min-w-full text-sm text-left text-gray-700">
        <thead className="text-xs uppercase bg-gray-50 border-b">
          <tr>
            <th className="px-4 py-3">Project Name</th>
            <th className="px-4 py-3">Location</th>
            <th className="px-4 py-3">Assigned Employees</th>
            <th className="px-4 py-3">Start Date</th>
            <th className="px-4 py-3">End Date</th>
            <th className="px-4 py-3">Status</th>
            <th className="px-4 py-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {projects.length ? (
            projects.map((project) => (
              <tr key={project.id} className="border-b last:border-0 hover:bg-gray-50">
                {/* Name */}
                <td className="px-4 py-3 font-medium">{project.name}</td>
                {/* Location */}
                <td className="px-4 py-3">{project.location}</td>
                {/* Employees */}
                <td className="px-4 py-3 max-w-[180px]">
                  {project.assignedEmployees && project.assignedEmployees.length ? (
                    <Tooltip.Provider>
                      <Tooltip>
                        <Tooltip.Trigger asChild>
                          <span className="truncate" title={project.assignedEmployees.map(e=>e.name).join(", ")}>
                            {project.assignedEmployees.length > 2
                              ? `${project.assignedEmployees.slice(0,2).map(e=>e.name).join(", ")} +${project.assignedEmployees.length - 2}`
                              : project.assignedEmployees.map(e=>e.name).join(", ")
                            }
                          </span>
                        </Tooltip.Trigger>
                        <Tooltip.Content side="top" align="center">
                          {project.assignedEmployees.map((e, i) => (
                            <div key={e.id} className="text-xs">{e.name}</div>
                          ))}
                        </Tooltip.Content>
                      </Tooltip>
                    </Tooltip.Provider>
                  ) : (
                    <span className="italic text-xs text-gray-400">None</span>
                  )}
                </td>
                {/* Start Date */}
                <td className="px-4 py-3">{formatDate(project.startDate)}</td>
                {/* End Date */}
                <td className="px-4 py-3">{formatDate(project.endDate)}</td>
                {/* Status */}
                <td className="px-4 py-3">
                  <span className={`inline-block px-2 py-0.5 rounded-full font-medium text-xs ${project.status === "Active"
                      ? "bg-proscape/10 text-proscape"
                      : "bg-gray-200 text-gray-500"
                    }`}>
                    {project.status}
                  </span>
                </td>
                {/* Actions */}
                <td className="px-4 py-3 whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      aria-label="View Details"
                      onClick={() => onView(project)}
                      className="hover:bg-proscape/10 text-proscape"
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      aria-label="Delete Project"
                      onClick={() => onDelete(project)}
                      className="hover:bg-red-100 text-red-600"
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={7} className="text-center py-8 text-gray-400">No projects found</td>
            </tr>
          )}
        </tbody>
      </table>
    </Card>
  );
}
