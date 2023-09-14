import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  onAuthStateChanged,
  updateProfile as baseUpdateProfile,
} from "firebase/auth";
import { auth, googleProvider } from "../firebase";
import type { Types } from "@/modules/home";

export const signInWithGoogle = () =>
  signInWithPopup(auth, googleProvider).catch((error) =>
    console.log(error?.message)
  );

export const logout = () => auth.signOut();

export const register = ({ email, password }: Types.Ifunction.Register) =>
  createUserWithEmailAndPassword(auth, email, password);

export const login = ({ email, password }: Types.Ifunction.Login) =>
  signInWithEmailAndPassword(auth, email, password);

export const updateProfile = (
  user: any,
  { name }: Types.Ifunction.UpdateProfile
) => baseUpdateProfile(user, { displayName: name });

export const GetUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        resolve(currentUser.providerData[0]);
      } else {
        resolve(null);
      }
      unsubscribe();
    });
  });
};
