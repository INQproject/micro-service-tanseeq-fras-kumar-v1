import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Calendar, Clock, AlertTriangle, CheckCircle, FileText, UserCheck, PenSquare } from "lucide-react";

const Dashboard = () => {
  // Mock data for dashboard
  const stats = [
    { 
      title: "Total Employees", 
      count: "6,247", 
      icon: <Users className="h-8 w-8 text-proscape" />,
      change: "+12% from last month"
    },
    { 
      title: "Present Today", 
      count: "4,893", 
      icon: <CheckCircle className="h-8 w-8 text-green-500" />,
      change: "78% attendance rate"
    },
    { 
      title: "Absent Today", 
      count: "1,354", 
      icon: <AlertTriangle className="h-8 w-8 text-amber-500" />,
      change: "22% absence rate"
    },
    { 
      title: "Pending Check-outs", 
      count: "246", 
      icon: <Clock className="h-8 w-8 text-red-500" />,
      change: "4% of present employees"
    }
  ];

  const recentActivity = [
    { id: 1, employee: "Sarah Johnson", action: "Check-in (Face)", time: "08:45 AM", location: "Main Site" },
    { id: 2, employee: "Robert Smith", action: "Check-out (Face)", time: "05:15 PM", location: "East Wing" },
    { id: 3, employee: "Emily Davis", action: "Check-in (Manual)", time: "09:10 AM", location: "North Site" },
    { id: 4, employee: "James Wilson", action: "Check-out (Manual)", time: "06:00 PM", location: "West Building" },
    { id: 5, employee: "David Taylor", action: "Check-in (Face)", time: "08:30 AM", location: "South Tower" }
  ];

  const pendingSync = [
    { id: 1, count: 78, location: "North Site", lastSync: "2 hours ago" },
    { id: 2, count: 45, location: "East Wing", lastSync: "4 hours ago" },
    { id: 3, count: 124, location: "South Tower", lastSync: "1 day ago" }
  ];

  const quickActions = [
    { 
      label: "Mark Attendance", 
      icon: <CheckCircle className="h-5 w-5" />,
      onClick: () => console.log("Mark Attendance clicked")
    },
    { 
      label: "Face Enrollment", 
      icon: <UserCheck className="h-5 w-5" />,
      onClick: () => console.log("Face Enrollment clicked")
    },
    { 
      label: "Manual Entry", 
      icon: <PenSquare className="h-5 w-5" />,
      onClick: () => console.log("Manual Entry clicked")
    },
    { 
      label: "Export Report", 
      icon: <FileText className="h-5 w-5" />,
      onClick: () => console.log("Export Report clicked")
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between bg-white p-4 rounded-lg shadow-sm">
        <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
        
        <div className="flex items-center gap-4">
          {quickActions.map((action, index) => (
            <Button
              key={index}
              variant="outline"
              className="flex items-center gap-2 text-gray-700 hover:text-proscape hover:border-proscape transition-colors"
              onClick={action.onClick}
            >
              {action.icon}
              <span className="hidden sm:inline">{action.label}</span>
            </Button>
          ))}
        </div>

        <Button 
          className="bg-proscape hover:bg-proscape-dark text-white"
        >
          Sync Data
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <Card key={index} className="p-6 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">{stat.title}</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">{stat.count}</p>
                <p className="text-xs text-gray-500 mt-1">{stat.change}</p>
              </div>
              <div className="bg-gray-50 p-3 rounded-full">
                {stat.icon}
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Card className="p-0 overflow-hidden">
            <div className="px-6 py-5 border-b border-gray-200 bg-gray-50">
              <h2 className="font-semibold text-gray-800">Recent Activity</h2>
            </div>
            <div className="p-4">
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-500">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                    <tr>
                      <th scope="col" className="px-4 py-3">Employee</th>
                      <th scope="col" className="px-4 py-3">Action</th>
                      <th scope="col" className="px-4 py-3">Time</th>
                      <th scope="col" className="px-4 py-3">Location</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentActivity.map((activity) => (
                      <tr key={activity.id} className="border-b hover:bg-gray-50">
                        <td className="px-4 py-3">{activity.employee}</td>
                        <td className="px-4 py-3">
                          <span 
                            className={`px-2 py-1 rounded text-xs ${
                              activity.action.includes('Manual') 
                                ? 'bg-amber-100 text-amber-800' 
                                : 'bg-green-100 text-green-800'
                            }`}
                          >
                            {activity.action}
                          </span>
                        </td>
                        <td className="px-4 py-3">{activity.time}</td>
                        <td className="px-4 py-3">{activity.location}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="pt-4 flex justify-center">
                <button className="text-sm text-proscape hover:text-proscape-dark">
                  View All Activity
                </button>
              </div>
            </div>
          </Card>
        </div>

        <div>
          <Card className="p-0 overflow-hidden">
            <div className="px-6 py-5 border-b border-gray-200 bg-gray-50">
              <h2 className="font-semibold text-gray-800">Pending Synchronization</h2>
            </div>
            <div className="p-4">
              {pendingSync.map((item) => (
                <div 
                  key={item.id} 
                  className="flex items-center justify-between p-3 border-b last:border-0"
                >
                  <div>
                    <p className="font-medium text-gray-700">{item.location}</p>
                    <p className="text-xs text-gray-500">Last sync: {item.lastSync}</p>
                  </div>
                  <div className="bg-amber-100 text-amber-800 px-2 py-1 rounded text-xs font-medium">
                    {item.count} records
                  </div>
                </div>
              ))}
              <div className="p-4 flex justify-center">
                <button className="bg-proscape text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-proscape-dark transition-colors w-full">
                  Sync All Records
                </button>
              </div>
            </div>
          </Card>

          <Card className="mt-6 p-6">
            <h2 className="font-semibold text-gray-800 mb-4">Quick Actions</h2>
            <div className="space-y-3">
              <button className="w-full flex items-center justify-between p-3 border rounded-md hover:bg-gray-50 transition-colors">
                <span className="font-medium">Face Attendance</span>
                <Calendar className="h-5 w-5 text-proscape" />
              </button>
              <button className="w-full flex items-center justify-between p-3 border rounded-md hover:bg-gray-50 transition-colors">
                <span className="font-medium">Manual Attendance</span>
                <Clock className="h-5 w-5 text-proscape" />
              </button>
              <button className="w-full flex items-center justify-between p-3 border rounded-md hover:bg-gray-50 transition-colors">
                <span className="font-medium">Export Reports</span>
                <Users className="h-5 w-5 text-proscape" />
              </button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
