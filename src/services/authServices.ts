import { firebaseapp } from "./firebaseAuthInstance";
import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signOut } from 'firebase/auth';


export const loginWithEmailPassword = async (email: string, password: string) => {
    const auth = getAuth(firebaseapp);
    console.log(email,password)
    try {
        await signInWithEmailAndPassword(auth, email, password);
        return { success: true, error: null };
    } catch (error:any) {
        console.error("Error durante el inicio de sesión con correo y contraseña:", error);
        return { success: false, error: "Error al iniciar sesión. Verifica tus credenciales." };
    }
}

export const logout = async () => {
    const auth = getAuth(firebaseapp);
    try {
      await signOut(auth);
      return { success: true, error: null };
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
      return { success: false, error: "Error al cerrar sesión." };
    }
  };
