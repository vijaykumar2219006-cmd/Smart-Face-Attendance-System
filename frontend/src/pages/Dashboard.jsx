import { useEffect, useState } from "react";

import {
  FaUsers,
  FaClipboardCheck,
  FaBrain,
} from "react-icons/fa";

import StatCard from "../components/StatCard";
import Button from "../components/Button";

import api from "../services/api";

export default function Dashboard() {

  const [studentCount, setStudentCount] = useState(0);
  const [attendanceCount, setAttendanceCount] = useState(0);
  const [modelStatus, setModelStatus] = useState("");

  useEffect(() => {

    async function loadDashboardData() {

     try {

    // Student Count
    const studentResponse = await api.get("/students");
    setStudentCount(studentResponse.data.count);

    // Attendance Count
    const attendanceResponse = await api.get("/attendance-count");
    setAttendanceCount(attendanceResponse.data.count);

    // Model Status
    const modelResponse = await api.get("/model-status");
    setModelStatus(modelResponse.data.status);

} catch (error) {

    console.error(error);

}

    }

    loadDashboardData();

  }, []);

  return (

    <div>

      <h1 className="text-3xl font-bold">
        Dashboard
      </h1>

      <p className="text-gray-500 mt-2 mb-8">
        Welcome to Smart Face Attendance System
      </p>

      <div className="grid grid-cols-3 gap-6">

        <StatCard
          title="Students"
          value={studentCount}
          subtitle="Registered Students"
          icon={<FaUsers />}
        />

        <StatCard
          title="Attendance"
          value={attendanceCount}
          subtitle="Records"
          icon={<FaClipboardCheck />}
        />

        <StatCard
  title="Model"
  value={modelStatus}
  subtitle="Training Status"
  icon={<FaBrain />}
/>

      </div>

      <div className="mt-10">

        <h2 className="text-xl font-semibold mb-4">
          Quick Actions
        </h2>

        <div className="flex gap-4">

          <Button>
            Register Student
          </Button>

          <Button variant="success">
            Train Model
          </Button>

          <Button variant="warning">
            Mark Attendance
          </Button>

        </div>

      </div>

    </div>

  );

}