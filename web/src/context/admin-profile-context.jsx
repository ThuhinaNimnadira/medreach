  
import React from "react";

const Ctx = React.createContext(null);
  
const DEFAULT = {
    name: "Admin User",
    email: "admin@example.com",
    phone: "+941234567",
    avatarUrl:
        "https://images.unsplash.com/photo-1606813907291-76a360fcd21d?q=80&w=200&auto=format&fit=crop",
};

export function AdminProfileProvider({ children }) {
    const [profile, setProfile] = React.useState(() => {
        try {
            const raw = localStorage.getItem("medreach.admin.profile");
            return raw ? JSON.parse(raw) : DEFAULT;
        } catch {
            return DEFAULT;
        }
    });

    React.useEffect(() => {
        localStorage.setItem("medreach.admin.profile", JSON.stringify(profile));
    }, [profile]);

    const updateProfile = React.useCallback((partial) => {
        setProfile((p) => ({ ...p, ...partial }));
    }, []);

    const value = React.useMemo(() => ({ profile, updateProfile }), [profile, updateProfile]);
    return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useAdminProfile() {
    const v = React.useContext(Ctx);
    if (!v) throw new Error("useAdminProfile must be used within <AdminProfileProvider>");
    return v;
}
