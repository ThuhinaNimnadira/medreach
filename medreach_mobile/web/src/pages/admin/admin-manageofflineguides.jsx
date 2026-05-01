  
import React, { useEffect, useState } from "react";
import { Bell } from "lucide-react";
import { Link } from "react-router-dom";
import { db } from "../../firebase";
import bg from "../../assets/bgforlandingpage.png";
import logo from "../../assets/3 - Copy.png";
  
const loadTopics = async () => {
    const snap = await db.collection("offlineGuides").get();
    return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
};

const createTopic = async (name) => {
    const topic = { name, docs: [] };
    await db.collection("offlineGuides").doc(name).set(topic);
    return { id: name, ...topic };
};

const updateTopic = async (id, data) => {
    await db.collection("offlineGuides").doc(id).set(data);
    return { id, ...data };
};

const deleteTopic = async (id) => {
    await db.collection("offlineGuides").doc(id).delete();
};

export default function ManageOfflineGuides() {
    const [topics, setTopics] = useState([]);
    const [selectedTopic, setSelectedTopic] = useState(null);
    const [search, setSearch] = useState("");
  
    useEffect(() => {
        const fetchTopics = async () => {
            const data = await loadTopics();
            setTopics(data);
            if (!selectedTopic && data.length > 0) setSelectedTopic(data[0]);
        };
        fetchTopics();
    }, []);
  
    const handleAddTopic = async () => {
        const name = prompt("Enter new topic name:");
        if (!name) return;
        if (topics.some((t) => t.name === name)) return alert("Topic already exists");
        const newTopic = await createTopic(name);
        setTopics([...topics, newTopic]);
        setSelectedTopic(newTopic);
    };

    const handleRenameTopic = async (topic) => {
        const newName = prompt("Enter new topic name:", topic.name);
        if (!newName) return;
        const updatedTopic = { ...topic, name: newName };
        await updateTopic(topic.id, updatedTopic);
        const updatedTopics = topics.map((t) => (t.id === topic.id ? updatedTopic : t));
        setTopics(updatedTopics);
        setSelectedTopic(updatedTopic);
    };

    const handleDeleteTopic = async (topic) => {
        if (!window.confirm(`Delete topic "${topic.name}"?`)) return;
        await deleteTopic(topic.id);
        const updatedTopics = topics.filter((t) => t.id !== topic.id);
        setTopics(updatedTopics);
        if (selectedTopic?.id === topic.id) setSelectedTopic(updatedTopics[0] || null);
    };
  
    const handleAddDoc = async () => {
        if (!selectedTopic) return;
        const file = prompt("Enter document name (e.g., file.pdf):");
        if (!file) return;

        const updatedTopic = { ...selectedTopic, docs: [...selectedTopic.docs, { name: file }] };
        await updateTopic(selectedTopic.id, updatedTopic);
        setTopics(topics.map((t) => (t.id === selectedTopic.id ? updatedTopic : t)));
        setSelectedTopic(updatedTopic);
    };

    const handleRenameDoc = async (doc) => {
        const newName = prompt("Enter new document name:", doc.name);
        if (!newName || !selectedTopic) return;

        const updatedDocs = selectedTopic.docs.map((d) =>
            d.name === doc.name ? { ...d, name: newName } : d
        );
        const updatedTopic = { ...selectedTopic, docs: updatedDocs };
        await updateTopic(selectedTopic.id, updatedTopic);
        setTopics(topics.map((t) => (t.id === selectedTopic.id ? updatedTopic : t)));
        setSelectedTopic(updatedTopic);
    };

    const handleDeleteDoc = async (doc) => {
        if (!selectedTopic) return;
        const updatedDocs = selectedTopic.docs.filter((d) => d.name !== doc.name);
        const updatedTopic = { ...selectedTopic, docs: updatedDocs };
        await updateTopic(selectedTopic.id, updatedTopic);
        setTopics(topics.map((t) => (t.id === selectedTopic.id ? updatedTopic : t)));
        setSelectedTopic(updatedTopic);
    };

    const filteredTopics = topics.filter((t) =>
        t.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="h-screen bg-gray-50 flex flex-col overflow-hidden"
             style={{ backgroundImage: `url(${bg})` }}
        >

             
            <header className="flex justify-between items-center px-12 py-4 shrink-0">
                <div className="flex items-center gap-3 mr-10">
                    <img src={logo} alt="MedReach" className="h-10 mr-6 mt-2" />
                </div>
                <div className="flex items-center gap-6">
                    <nav className="flex items-center gap-1 text-[#ffffff] font-medium">
                        <Link to="/admin/notifications" className="mt-1" title="Notifications">
                            <Bell className="w-5 h-5 text-white cursor-pointer" />
                        </Link>
                        <Link
                            to="/admin/dashboard"
                            className="w-24 h-10 flex items-center justify-center px-4 py-2 rounded-md hover:bg-[#40E0D0] hover:text-white hover:scale-105 transition-all duration-300"
                        >
                            Home
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

             
            <div className="flex-1 min-h-0 px-12 py-8">
                <div className="h-full grid grid-cols-[260px_1fr] gap-8">
                     
                    <div className="min-h-0">
                        <div className="mb-4">
                            <p className="text-sm text-white font-medium">Manage</p>
                            <h1 className="text-2xl font-bold text-white">Health Guide</h1>
                        </div>

                        <div className="bg-white rounded-2xl shadow-md p-4 h-[calc(100%-64px)] flex flex-col">
                            <div className="flex items-center mb-4">
                                <input
                                    type="text"
                                    placeholder="search"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm"
                                />
                                <button
                                    onClick={handleAddTopic}
                                    className="ml-2 w-8 h-8 flex items-center justify-center rounded-full border border-blue-900 text-blue-900 font-bold"
                                >
                                    +
                                </button>
                            </div>

                            <div className="flex-1 overflow-y-auto space-y-2 pr-1">
                                {filteredTopics.length === 0 ? (
                                    <p className="text-gray-400 text-sm">Nothing to show here</p>
                                ) : (
                                    filteredTopics.map((t) => (
                                        <div
                                            key={t.id}
                                            className={`px-3 py-1 rounded-md text-sm cursor-pointer ${
                                                selectedTopic?.id === t.id
                                                    ? "bg-blue-200 text-blue-900"
                                                    : "bg-blue-100 text-blue-800 hover:bg-blue-200"
                                            }`}
                                            onClick={() => setSelectedTopic(t)}
                                        >
                                            {t.name}
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    </div>

                     
                    <div className="min-h-0 bg-white rounded-2xl shadow-md p-6 flex flex-col overflow-hidden">
                        {!selectedTopic ? (
                            <p className="text-gray-400 text-center m-auto">
                                Select or create a topic to get started
                            </p>
                        ) : (
                            <>
                                <div className="flex items-center gap-2 mb-3 shrink-0">
                                    <h2 className="text-2xl font-bold text-gray-800">{selectedTopic.name}</h2>
                                    <button
                                        className="text-blue-700 hover:text-blue-900"
                                        onClick={() => handleRenameTopic(selectedTopic)}
                                    >
                                        ✏️
                                    </button>
                                    <button
                                        className="text-red-500 hover:text-red-700 ml-auto"
                                        onClick={() => handleDeleteTopic(selectedTopic)}
                                    >
                                        🗑
                                    </button>
                                </div>

                                <div className="min-h-0 flex-1 overflow-auto pr-1">
                                    {selectedTopic.docs.length === 0 ? (
                                        <p className="text-gray-500 mb-6">No documents yet.</p>
                                    ) : (
                                        <div className="grid grid-cols-3 gap-4 mb-6">
                                            {selectedTopic.docs.map((doc) => (
                                                <div
                                                    key={doc.name}
                                                    className="bg-blue-50 rounded-xl p-4 flex flex-col justify-between shadow-sm"
                                                >
                                                    <div>
                                                        <p className="text-sm text-blue-500">
                                                            filename{" "}
                                                            <button
                                                                onClick={() => handleRenameDoc(doc)}
                                                                className="hover:text-blue-800"
                                                            >
                                                                ✏️
                                                            </button>
                                                        </p>
                                                        <h3 className="text-xl font-bold text-blue-600">{doc.name}</h3>
                                                    </div>
                                                    <button
                                                        className="mt-4 text-gray-500 hover:text-red-600 text-sm self-end"
                                                        onClick={() => handleDeleteDoc(doc)}
                                                    >
                                                        🗑
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    <div
                                        onClick={handleAddDoc}
                                        className="bg-blue-50 rounded-xl p-4 flex flex-col items-center justify-center shadow-sm cursor-pointer hover:bg-blue-100"
                                    >
                                        <p className="text-xl font-bold text-blue-600">Add</p>
                                        <p className="text-sm text-blue-500">new files</p>
                                        <span className="text-3xl text-blue-600 mt-2">+</span>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
