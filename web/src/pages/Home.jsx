import Navbar from "../components/Navbar"; // import your navbar component
import bg from "../assets/bgforlandingpage.png" ;



export default function Home() {
    return (
        <div
            className="flex flex-col min-h-screen bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${bg})` }}
        >


        <Navbar />  

            <main className="flex flex-1 justify-between items-center px-16 py-12">
                 
                <div className="max-w-md space-y-4">
                    <p className="text-sm font-montserrat font-semibold text-[#FFFFFF]">
                        Your Health, Just A Tap Away.
                    </p>
                    <h2 className="text-4xl font-extrabold leading-snug text-[#FFFFFF]">
                        Your Health, <br /> Just A Tap Away.
                    </h2>
                    <p className="text-sm text-[#FFFFFF] font-medium">
                        Download The MedReach App To Connect <br />
                        With Doctors And Pharmacies Instantly.
                    </p>
                    <button className="bg-[#40E0D0] text-white px-8 py-2 rounded-md font-semibold">
                        Download
                    </button>
                </div>

                 
                <div>
                    <img src="/1.png" alt="MedReach Icon" className="w-92" />
                </div>

                 
                <div className="max-w-md text-right space-y-4">
                    <p className="text-sm font-semibold text-[#FFFFFF]">
                        Secure Access For Healthcare Professionals.
                    </p>
                    <h2 className="text-4xl font-extrabold leading-snug text-[#FFFFFF]">
                        Where Care Meets <br /> Technology.
                    </h2>
                    <p className="text-sm text-[#FFFFFF] font-medium">
                        Login To Manage Patients, Prescriptions, <br />
                        And Services Efficiently.
                    </p>
                    <button className="bg-[#40E0D0] text-white px-8 py-2 rounded-md font-semibold">
                        Log In
                    </button>
                </div>
            </main>
        </div>
    );
}
