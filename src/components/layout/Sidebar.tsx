import { useState } from "react";
import { Link, useLocation, Navigate } from "react-router-dom";
import { Home, Settings, Users, Calendar, FileText, User, ChevronDown, ChevronRight, ChevronLeft, Briefcase, CheckCircle, Tag } from "lucide-react";
import { Badge } from "@/components/ui/badge";
type SubMenuItem = {
  name: string;
  path: string;
  icon?: React.ReactNode;
  requiredPermission?: string;
};
type MenuItem = {
  name: string;
  path: string;
  icon: React.ReactNode;
  subMenus?: SubMenuItem[];
  hidden?: boolean;
  requiredPermission?: string;
  microservice?: string;
};

// Mock function to get current user permissions - in a real app, this would come from an auth context
const getUserPermissions = () => {
  // For testing, return Super Admin permissions
  return ["Manual Attendance", "View Reports", "Manage Employees", "Manage Projects", "Manage Locations", "Export Reports", "Face Enroll", "Manage Roles", "Role Mapping", "Manage Users", "Attendance Role Logic"];
};
const menuItems: MenuItem[] = [{
  name: "Dashboard",
  path: "/dashboard",
  icon: <Home className="h-5 w-5" />,
  microservice: "Core"
}, {
  name: "Master",
  path: "/master",
  icon: <Settings className="h-5 w-5" />,
  microservice: "Master",
  subMenus: [{
    name: "Employees",
    path: "/master/employees",
    requiredPermission: "Manage Employees"
  }, {
    name: "Roles",
    path: "/master/roles",
    requiredPermission: "Manage Roles"
  }, {
    name: "Projects",
    path: "/master/projects",
    requiredPermission: "Manage Projects"
  }, {
    name: "Attendance Type",
    path: "/master/attendance-type",
    requiredPermission: "Manage Projects"
  }, {
    name: "Role Attendance Logic",
    path: "/master/role-attendance-logic",
    requiredPermission: "Attendance Role Logic"
  }]
}, {
  name: "Manual Attendance",
  path: "/manual-attendance",
  icon: <Calendar className="h-5 w-5" />,
  requiredPermission: "Manual Attendance",
  microservice: "Attendance"
}, {
  name: "Bulk Attendance",
  path: "/bulk-attendance",
  icon: <CheckCircle className="h-5 w-5" />,
  requiredPermission: "Manual Attendance",
  microservice: "Attendance"
}, {
  name: "Attendance History",
  path: "/attendance-history",
  icon: <Calendar className="h-5 w-5" />,
  hidden: true,
  microservice: "Attendance"
}, {
  name: "Reports",
  path: "/reports",
  icon: <FileText className="h-5 w-5" />,
  requiredPermission: "View Reports",
  microservice: "Reports"
}, {
  name: "Profile",
  path: "/profile",
  icon: <User className="h-5 w-5" />,
  microservice: "Core"
}];
export function Sidebar() {
  const location = useLocation();
  const [expanded, setExpanded] = useState<string | null>("Master");
  const [isCollapsed, setIsCollapsed] = useState(false);
  const userPermissions = getUserPermissions();
  const toggleSubmenu = (menuName: string) => {
    setExpanded(expanded === menuName ? null : menuName);
  };
  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  // Filter and transform menu items
  const processedMenuItems = menuItems.filter(item => !item.hidden).filter(item => !item.requiredPermission || userPermissions.includes(item.requiredPermission)).map(item => {
    if (item.subMenus) {
      // Special handling for Master menu to show nested structure for Employees
      if (item.name === "Master") {
        // Filter and organize submenus
        const organizedSubMenus = item.subMenus.filter(subItem => !subItem.requiredPermission || userPermissions.includes(subItem.requiredPermission));
        return {
          ...item,
          subMenus: organizedSubMenus
        };
      }

      // General filtering for other menu items
      return {
        ...item,
        subMenus: item.subMenus.filter(subItem => !subItem.requiredPermission || userPermissions.includes(subItem.requiredPermission))
      };
    }
    return item;
  }).filter(item => !item.subMenus || item.subMenus.length > 0); // Hide parent menus with no visible children

  const getMicroserviceColor = (microservice?: string) => {
    switch (microservice) {
      case "Core":
        return "bg-blue-100 text-blue-700 border-blue-200";
      case "Master":
        return "bg-green-100 text-green-700 border-green-200";
      case "Attendance":
        return "bg-purple-100 text-purple-700 border-purple-200";
      case "Reports":
        return "bg-orange-100 text-orange-700 border-orange-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };
  return <div className="relative">
      <div className={`fixed h-screen bg-sidebar transition-all duration-300 ${isCollapsed ? 'w-16' : 'w-64'}`}>
        <div className="flex items-center justify-between p-3 border-b border-sidebar-border">
          {!isCollapsed && <div className="flex items-center">
              <img src="/lovable-uploads/05179fc8-d11b-4d37-bd27-20cd7447beaa.png" alt="Tanseeq Investment Logo" className="h-8 w-8 mr-2" />
              <h1 className="text-white text-lg font-bold">Tanseeq</h1>
            </div>}
          {isCollapsed && <img src="/lovable-uploads/05179fc8-d11b-4d37-bd27-20cd7447beaa.png" alt="Tanseeq Investment Logo" className="h-8 w-8 mx-auto" />}
          <button onClick={toggleSidebar} className="text-white p-1 rounded hover:bg-sidebar-accent">
            {isCollapsed ? <ChevronRight className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
          </button>
        </div>
        <div className="py-4">
          <nav>
            <ul className="space-y-1">
              {processedMenuItems.map(item => <li key={item.name}>
                  {item.subMenus ? <div>
                      <button onClick={() => toggleSubmenu(item.name)} className={`flex items-center w-full px-3 py-2 text-sidebar-foreground hover:bg-sidebar-accent rounded-md transition-colors ${expanded === item.name ? 'bg-sidebar-accent' : ''} ${isCollapsed ? 'justify-center' : 'justify-between'}`}>
                        <div className="flex items-center">
                          {item.icon}
                          {!isCollapsed && <div className="flex items-center ml-3">
                              <span>{item.name}</span>
                              {item.microservice}
                            </div>}
                        </div>
                        {!isCollapsed && (expanded === item.name ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />)}
                      </button>
                      {expanded === item.name && !isCollapsed && <ul className="pl-8 mt-1 space-y-1">
                          {item.subMenus.map(subItem => <li key={subItem.name}>
                              <Link to={subItem.path} className={`flex items-center px-3 py-2 text-sm rounded-md ${location.pathname === subItem.path ? 'bg-sidebar-primary text-sidebar-primary-foreground' : 'text-sidebar-foreground hover:bg-sidebar-accent'}`}>
                                {subItem.icon}
                                <span className="ml-2">{subItem.name}</span>
                              </Link>
                            </li>)}
                        </ul>}
                    </div> : <Link to={item.path} className={`flex items-center px-3 py-2 rounded-md transition-colors ${location.pathname === item.path ? 'bg-sidebar-primary text-sidebar-primary-foreground' : 'text-sidebar-foreground hover:bg-sidebar-accent'} ${isCollapsed ? 'justify-center' : ''}`}>
                      {item.icon}
                      {!isCollapsed && <div className="flex items-center ml-3">
                          <span>{item.name}</span>
                          {item.microservice}
                        </div>}
                    </Link>}
                </li>)}
            </ul>
          </nav>
        </div>
        <div className="absolute bottom-0 w-full p-4 border-t border-sidebar-border">
          {!isCollapsed && <div className="flex items-center text-white">
              <User className="h-5 w-5 mr-2" />
              <div>
                <p className="text-sm font-medium">Super Admin</p>
                <p className="text-xs opacity-70">John Doe</p>
              </div>
            </div>}
          {isCollapsed && <div className="flex justify-center">
              <User className="h-5 w-5 text-white" />
            </div>}
        </div>
      </div>
      <div className={`transition-all duration-300 ${isCollapsed ? 'ml-16' : 'ml-64'}`} />
    </div>;
}