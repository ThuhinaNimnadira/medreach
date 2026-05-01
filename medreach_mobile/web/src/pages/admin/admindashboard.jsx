import { Bell } from "lucide-react";
import { Link } from "react-router-dom";
import "./../admin.css";
import React from "react";
import { collection, query, where, getDocs, Timestamp } from "firebase/firestore";
import { db } from "../../firebase"; // make sure this path is correct
import bg from "../../assets/bgforlandingpage.png";
import logo from "../../assets/3 - Copy.png";

export default function AdminDashboard() {
    const [newUsersCount, setNewUsersCount] = React.useState(0);

    React.useEffect(() => {
        async function fetchNewUsers() {
            try {
                const threeDaysAgo = new Date();
                threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);

                const usersCol = collection(db, "users");
                const q = query(
                    usersCol,
                    where("createdAt", ">=", Timestamp.fromDate(threeDaysAgo))
                );

                const snapshot = await getDocs(q);
                setNewUsersCount(snapshot.docs.length);
            } catch (err) {
                console.error("Error fetching new users:", err);
            }
        }

        fetchNewUsers();
    }, []);

    return (
        <div
            className="flex flex-col min-h-screen bg-cover bg-center bg-no-repeat"
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
                            to="/admin/manageusers"
                            className="w-24 h-10 flex items-center justify-center px-4 py-2 rounded-md hover:bg-[#40E0D0] hover:text-white hover:scale-105 transition-all duration-300"
                        >
                            Users
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
                    <h1 className="text-2xl font-bold mb-2">
                        Hello, <br />
                        <span className="text-[#ffffff] text-4xl">Admin !</span>
                    </h1>
                    <p className="text-sm text-white mb-6">
                        Stay In Control, Stay Connected.
                    </p>

                    <div className="bg-white rounded-xl shadow-md p-10 space-y-2 h-full">
                        <h2 className="text-2xl font-semibold text-gray-800 pb-3">
                            What’s <br></br>New?
                        </h2>
                        <p className="text-gray-700">
                            <span className="font-semibold">{newUsersCount}</span> New Users
                        </p>
                        <p className="text-green-600">
                            <span className="font-semibold">78</span> New Reports
                        </p>
                        <p className="text-gray-500">
                            <span className="font-semibold">99</span> New inquiries
                        </p>
                    </div>
                </aside>

                 
                <section className="flex-1 grid grid-cols-2 gap-8">
                     
                    <div className="bg-white rounded-xl shadow-md p-15 flex flex-col justify-between w-[439px] h-[400px]">
                        <div>
                            <div className="w-[100px] h-[100px] bg-indigo-100 rounded-xl flex items-center justify-center mb-6">
                                <img
                                    src="/usericon.png"
                                    alt="Manage Users"
                                    className="w-12 h-12 object-contain"
                                />
                            </div>
                            <h3 className="text-2xl font-bold mb-4 mt-4">Manage Users</h3>
                            <p className="text-gray-500 mb-6">
                                Easily manage every user in your <br /> hospital ecosystem.
                            </p>
                        </div>
                        <Link to="/admin/manageusers" className="text-gray-500 font-semibold hover:text-[#0C164F]">
                            Manage &raquo;
                        </Link>
                    </div>

                     
                    <div className="bg-white rounded-xl shadow-md p-15 flex flex-col justify-between w-[439px] h-[400px]">
                        <div>
                            <div className="w-[100px] h-[100px] bg-indigo-100 rounded-xl flex items-center justify-center mb-6">
                                <img
                                    src="/offlinehealthicon.png"
                                    alt="Offline Health Guide"
                                    className="w-12 h-12 object-contain"
                                />
                            </div>
                            <h3 className="text-2xl font-bold mb-4 mt-4">Offline Health Guide</h3>
                            <p className="text-gray-500 mb-6">
                                Keep patient health information <br /> accessible, even offline.
                            </p>
                        </div>
                        <Link to="/admin/manageguides" className="text-gray-500 font-semibold hover:text-[#0C164F]">
                            Manage &raquo;
                        </Link>
                    </div>
                </section>
            </main>
        </div>
    );
}
