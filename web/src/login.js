import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase";

export async function login(email, password) {
    try {
        const result = await signInWithEmailAndPassword(auth, email, password);
        return { user: result.user };
    } catch (error) {
        return { error: error.message };
    }
}
