
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminDashboard from "./admin/Dashboard";
import UserDashboard from "./user/Dashboard";

const Dashboard = () => {
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userStr = localStorage.getItem("user");
    if (userStr) {
      try {
        const userData = JSON.parse(userStr);
        setUser(userData);
      } catch (error) {
        console.error("Failed to parse user data", error);
        navigate("/login");
      }
    } else {
      navigate("/login");
    }
  }, [navigate]);

  if (!user) {
    return null; // Loading state or redirect handled by useEffect
  }

  // Based on user role, render appropriate dashboard
  return user.role === "admin" ? <AdminDashboard /> : <UserDashboard />;
};

export default Dashboard;
