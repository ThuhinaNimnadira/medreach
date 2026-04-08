// src/App.jsx
import { BrowserRouter as Router, Routes, Route, Outlet } from "react-router-dom";

import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";

// --- Admin pages
import AdminDashboard from "./pages/admin/admindashboard";
import AdminManageUsers from "./pages/admin/admin-manageusers.jsx";
import ManageHealthGuide from "./pages/admin/admin-manageofflineguides.jsx";
import AdminAddNewStaff from "./pages/admin/admin-addnewstaff.jsx";
import AdminDoctorsInfo from "./pages/admin/admin-doctorsinfo.jsx";
import AdminManagePatients from "./pages/admin/admin-managepatients.jsx";
import AdminManageStaff from "./pages/admin/admin-managestaff.jsx";
import AdminNotifications from "./pages/admin/admin-notifications.jsx";
import AdminPatientInfo from "./pages/admin/admin-patientinfo.jsx";
import AdminStaffInfo from "./pages/admin/admin-staffinfo.jsx";
import AdminSettings from "./pages/admin/admin-settings.jsx";

// --- Admin-only profile scope
import { AdminProfileProvider } from "./context/admin-profile-context.jsx";

// --- Doctor pages
import DoctorDashboard from "./pages/doctor/doctor-dashboard.jsx";
import DoctorNotifications from "./pages/doctor/doctor-notifications.jsx";
import DoctorAppointments from "./pages/doctor/doctor-appointments.jsx";
import DoctorProfile from "./pages/doctor/doctor-profile.jsx"; // ✅ fixed filename
import DoctorCompletedAppointment from "./pages/doctor/doctor-completedappointments.jsx";
import DoctorOngoingAppointment from "./pages/doctor/doctor-ongoingappointments.jsx";
import DoctorSettings from "./pages/doctor/doctor-settings.jsx";

// Lab
import LabDashboard from "./pages/lab/lab-dashboard.jsx";
import LabReports from "./pages/lab/lab-reports.jsx";
import LabReportEditor from "./pages/lab/lab-report-editor.jsx";
import LabReportPublic from "./pages/lab/lab-report-public.jsx";
import LabSettings from "./pages/lab/lab-settings.jsx";
import LabNotifications from "./pages/lab/lab-notifications.jsx";

//Pharmacy
import PharmacyDashboard from "./pages/pharmacy/pharmacy-dashboard.jsx";
import PharmacySettings from "./pages/pharmacy/pharmacy-settings.jsx";
import PharmacyPrescriptions from "./pages/pharmacy/pharmacy-prescriptions.jsx";
import PharmacyPrescriptionEditor from "./pages/pharmacy/pharmacy-prescription-editor.jsx";
import PharmacyNotifications from "./pages/pharmacy/pharmacy-notifications.jsx";
import PrescriptionIssued from "./pages/pharmacy/prescription-issued.jsx";

//Receptionist
import ReceptionDashboard from "./pages/receptionist/receptionist-dashboard.jsx";
import ReceptionNotifications from "./pages/receptionist/receptionist-notifications.jsx";
import ReceptionAppointments from "./pages/receptionist/receptionist-appointments.jsx";
import ReceptionAppointmentCompleted from "./pages/receptionist/receptionist-completed-appointment-info.jsx";
import ReceptionAppointmentPay from "./pages/receptionist/receptionist-appointment-info.jsx";
import ReceptionSettings from "./pages/receptionist/receptionist-settings.jsx";


function NotFound() {
    return (
        <div className="min-h-screen grid place-items-center p-6">
            <div className="text-center">
                <h1 className="text-2xl font-semibold">404</h1>
                <p className="text-gray-600 mt-2">Page not found</p>
            </div>
        </div>
    );
}

// Wrap ONLY admin routes so settings updates affect just the signed-in admin
function AdminLayout() {
    return (
        <AdminProfileProvider>
            <Outlet />
        </AdminProfileProvider>
    );
}

/* ------------------------------------------------------------------------------ */

export default function App() {
    return (
        <Router>
            <div className="min-h-screen bg-white flex flex-col">
                <Routes>
                    {/* public */}
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/login" element={<Login />} />

                    {/* admin (scoped context) */}
                    <Route path="/admin" element={<AdminLayout />}>
                        <Route path="dashboard" element={<AdminDashboard />} />
                        <Route path="manageusers" element={<AdminManageUsers />} />
                        <Route path="manageguides" element={<ManageHealthGuide />} />
                        <Route path="managepatients" element={<AdminManagePatients />} />
                        <Route path="managestaff" element={<AdminManageStaff />} />
                        <Route path="notifications" element={<AdminNotifications />} />
                        <Route path="settings" element={<AdminSettings />} />
                        <Route path="staff/new" element={<AdminAddNewStaff />} />
                        <Route path="staff/doctor/:id" element={<AdminDoctorsInfo />} />
                        <Route path="patient/:id" element={<AdminPatientInfo />} />
                        <Route path="staff/:id" element={<AdminStaffInfo />} />
                    </Route>

                    {/* doctor */}
                    <Route path="/doctor/dashboard" element={<DoctorDashboard />} />
                    <Route path="/doctor/appointments" element={<DoctorAppointments />} />
                    <Route path="/doctor/appointments/completed/:id" element={<DoctorCompletedAppointment />} />
                    <Route path="/doctor/appointments/ongoing/:id" element={<DoctorOngoingAppointment />} /> {/* ✅ fixed prefix */}
                    <Route path="/doctor/profile" element={<DoctorProfile />} />
                    <Route path="/doctor/notifications" element={<DoctorNotifications />} />
                    <Route path="/doctor/settings" element={<DoctorSettings />} />

                    {/* lab */}
                    <Route path="/lab/dashboard" element={<LabDashboard />} />
                    <Route path="/lab/reports" element={<LabReports />} />
                    <Route path="/lab/reports/new" element={<LabReportEditor />} />
                    <Route path="/lab/reports/:id/edit" element={<LabReportEditor />} />
                    <Route path="/lab/settings" element={<LabSettings />} />
                    <Route path="/report/:slug" element={<LabReportPublic />} />
                    <Route path="/lab/notifications" element={<LabNotifications />} />

                    {/*Pharmacy*/}
                    <Route path="/pharmacy/dashboard" element={<PharmacyDashboard />} />
                    <Route path="/pharmacy/settings" element={<PharmacySettings />} />
                    <Route path="/pharmacy/prescriptions" element={<PharmacyPrescriptions />} />
                    <Route path="/pharmacy/prescriptions/:id/edit" element={<PharmacyPrescriptionEditor />} />
                    <Route path="/pharmacy/notifications" element={<PharmacyNotifications />} />
                    <Route path="/prescription/:slug" element={<PrescriptionIssued />} />

                    {/*Receptionist*/}
                    <Route path="/reception/dashboard" element={<ReceptionDashboard />} />
                    <Route path="reception/notifications" element={<ReceptionNotifications />} />
                    <Route path="/reception/appointments" element={<ReceptionAppointments />} />
                    <Route path="/reception/appointments/pay/:id" element={<ReceptionAppointmentPay />} />
                    <Route path="/reception/appointments/completed/:id" element={<ReceptionAppointmentCompleted />}/>
                    <Route path="/reception/settings" element={<ReceptionSettings />} />


                    {/* fallback */}
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </div>
        </Router>
    );
}
