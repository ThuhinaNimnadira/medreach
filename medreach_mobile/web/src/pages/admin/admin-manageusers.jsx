  
import { Bell } from "lucide-react";
import { Link } from "react-router-dom";
import React from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase"; // adjust path
import "./../admin.css";
import bg from "../../assets/bgforlandingpage.png";
import logo from "../../assets/3 - Copy.png";

export default function AdminManageUsers() {
    const [patients, setPatients] = React.useState([]);
    const [staff, setStaff] = React.useState([]);
    const [newUsersCount, setNewUsersCount] = React.useState(0);

    React.useEffect(() => {
        const unsub = onSnapshot(collection(db, "users"), (snapshot) => {
            const data = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
  
            const patientsData = data.filter((u) => u.role === "patient");
            const staffData = data.filter((u) => u.role === "staff");
            setPatients(patientsData);
            setStaff(staffData);
  
            const threeDaysAgo = new Date();
            threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);
            const newUsers = data.filter(
                (u) => u.createdAt?.toDate?.() > threeDaysAgo
            );
            setNewUsersCount(newUsers.length);
        });

        return () => unsub();
    }, []);

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col"
             style={{ backgroundImage: `url(${bg})` }}
        >
             
            <header className="flex justify-between items-center px-12 py-4 ">
                <div className="flex items-center gap-3 mr-10">
                    <img src={logo} alt="MedReach" className="h-10 mr-6 mt-2" />
                </div>

                <div className="flex items-center gap-6">
                    <nav className="flex items-center gap-1 text-[#ffffff] font-medium">
                        <Link to="/admin/notifications" className="mt-1" title="Notifications">
                            <Bell className="w-5 h-5 text-white cursor-pointer bell-hover" />
                        </Link>

                        <Link
                            to="/admin/manageguides"
                            className="w-24 h-10 flex items-center justify-center px-4 py-2 rounded-md hover:bg-[#40E0D0] hover:text-white hover:scale-105 transition-all duration-300"
                        >
                            Guides
                        </Link>
                        <Link
                            to="/admin/dashboard"
                            className="w-24 h-10 flex items-center justify-center px-4 py-2 rounded-md hover:bg-[#40E0D0] hover:text-white hover:scale-105 transition-all duration-300"
                        >
                            Home
                        </Link>
                        <Link
                            to="/admin/settings"
                            className="w-24 h-10 flex items-center justify-center px-4 py-2 rounded-md hover:bg-[#40E0D0] hover:text-white hover:scale-105 transition-all duration-300"
                        >
                            Settings
                        </Link>
                        <Link
                            to="/login"
                            className="w-24 h-10 flex items-center justify-center px-4 py-2 rounded-md hover:bg-[#40E0D0] hover:text-white hover:scale-105 transition-all duration-300"
                        >
                            Log Out
                        </Link>
                    </nav>
                </div>
            </header>

             
            <main className="flex flex-1 px-12 py-10 gap-8">
                 
                <aside className="w-[255px] h-[273px]">
                    <h1 className="text-2xl font-semibold text-white ">manage <br /></h1>
                    <h1 className="text-[#ffffff] text-5xl font-bold mb-10">Users</h1>

                    <div className="bg-white rounded-xl shadow-md p-10 space-y-2 h-full">
                        <h2 className="text-2xl font-semibold text-gray-800 pb-3">
                            What’s <br />New?
                        </h2>
                        <p className="text-gray-700">
                            <span className="font-semibold">{newUsersCount}</span> New Users
                        </p>
                        <p className="text-green-600">
                            <span className="font-semibold">{staff.length}</span> Staff Accounts
                        </p>
                    </div>
                </aside>

                 
                <section className="flex-1 grid grid-cols-2 gap-8">
                     
                    <div className="bg-white rounded-xl shadow-md p-15 flex flex-col justify-between w-[439px] h-[400px]">
                        <div>
                            <div className="w-[100px] h-[100px] bg-indigo-100 rounded-xl flex items-center justify-center mb-6">
                                <img src="/usericon.png" alt="Manage Users" className="w-12 h-12 object-contain" />
                            </div>
                            <h3 className="text-2xl font-bold mb-4 mt-4">Patients</h3>
                            <p className="text-gray-500 mb-6">
                                Manage patient records, including <br /> registration details and activity.
                            </p>
                        </div>
                        <Link to="/admin/managepatients" className="text-gray-500 font-semibold hover:text-[#0C164F]">
                            Manage &raquo;
                        </Link>
                    </div>

                     
                    <div className="bg-white rounded-xl shadow-md p-15 flex flex-col justify-between w-[439px] h-[400px]">
                        <div>
                            <div className="w-[100px] h-[100px] bg-indigo-100 rounded-xl flex items-center justify-center mb-6">
                                <img src="/offlinehealthicon.png" alt="Offline Health Guide" className="w-12 h-12 object-contain" />
                            </div>
                            <h3 className="text-2xl font-bold mb-4 mt-4">Staff</h3>
                            <p className="text-gray-500 mb-6">
                                Access and control all hospital staff <br /> records, roles, and permissions.
                            </p>
                        </div>
                        <Link to="/admin/managestaff" className="text-gray-500 font-semibold hover:text-[#0C164F]">
                            Manage &raquo;
                        </Link>
                    </div>
                </section>
            </main>
        </div>
    );
}
