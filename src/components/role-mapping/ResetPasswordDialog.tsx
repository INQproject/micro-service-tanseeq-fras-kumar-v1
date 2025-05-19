
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Info } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ResetPasswordDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  employee: {
    name: string;
    employeeId: string;
    loginMethod?: string;
    email?: string;
  } | null;
  // Add the onPasswordReset callback property
  onPasswordReset?: () => void;
}

export function ResetPasswordDialog({
  open,
  onOpenChange,
  employee,
  onPasswordReset,
}: ResetPasswordDialogProps) {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loginMethod, setLoginMethod] = useState<string>("");
  const [loginValue, setLoginValue] = useState<string>("");
  
  if (!employee) return null;
  
  // Initialize state when dialog opens
  const handleOpenChange = (open: boolean) => {
    if (open && employee) {
      // Set initial login method from employee data
      setLoginMethod(employee.loginMethod || "employeeId");
      // Set initial login value based on method
      if (employee.loginMethod === "email") {
        setLoginValue(employee.email || "");
      } else {
        setLoginValue(employee.employeeId || "");
      }
    }
    
    if (!open) {
      // Reset form when dialog closes
      setNewPassword("");
      setConfirmPassword("");
      setError("");
    }
    
    onOpenChange(open);
  };
  
  // Format display of current login method
  const getLoginMethodDisplay = () => {
    if (employee.loginMethod === "email") {
      return `Login via: Email ID – ${employee.email || ""}`;
    } else {
      return `Login via: Employee ID – ${employee.employeeId || ""}`;
    }
  };
  
  const handleReset = () => {
    // Form validation
    if (!newPassword || !confirmPassword) {
      setError("Please fill in all password fields");
      return;
    }
    
    if (newPassword !== confirmPassword) {
      setError("Passwords don't match");
      return;
    }
    
    if (newPassword.length < 8) {
      setError("Password must be at least 8 characters long");
      return;
    }
    
    // Reset password and update login method if needed
    // For this demo, we'll just show a success message
    
    // Log the password reset - in a real app, this would be sent to the backend
    console.log("Password reset for employee:", employee.employeeId);
    console.log("Updated login method:", loginMethod);
    console.log("Updated login value:", loginValue);
    
    toast({
      title: "Login Credentials Updated",
      description: `Login credentials updated successfully for Employee ${employee.employeeId}.`,
    });
    
    // Call the onPasswordReset callback if provided
    if (onPasswordReset) {
      onPasswordReset();
    }
    
    // Reset form and close dialog
    setNewPassword("");
    setConfirmPassword("");
    setError("");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Update Login Credentials</DialogTitle>
          <DialogDescription>
            Update login credentials for {employee.name} ({employee.employeeId})
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          {/* Display current login method */}
          <Alert className="bg-blue-50 border-blue-200">
            <Info className="h-4 w-4 text-blue-500" />
            <AlertDescription className="text-blue-700">
              {getLoginMethodDisplay()}
            </AlertDescription>
          </Alert>
          
          {/* Login Method Selection */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Login Method (Optional)</label>
            <Select value={loginMethod} onValueChange={setLoginMethod}>
              <SelectTrigger>
                <SelectValue placeholder="Choose login method" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="email">Email ID</SelectItem>
                <SelectItem value="employeeId">Employee ID</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          {/* Login Value (Email or Employee ID) */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              {loginMethod === "email" ? "Email Address" : "Employee ID"}
            </label>
            <Input
              type={loginMethod === "email" ? "email" : "text"}
              value={loginValue}
              onChange={(e) => setLoginValue(e.target.value)}
              placeholder={loginMethod === "email" ? "Enter email address" : "Enter employee ID"}
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">New Password</label>
            <Input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Enter new password"
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Confirm Password</label>
            <Input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm new password"
            />
          </div>
          
          {error && (
            <p className="text-sm text-red-500">{error}</p>
          )}
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleReset}>
            Update Credentials
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
