"use client";

import Cookies from "js-cookie";

import {
  ReactNode,
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { AllUser, User } from "../types/user";
import { findUser } from "../services/user";
import { compressUser, decompress } from "../services/encryptCookie";

type AuthTokens = {
  token: string;
};

// Contexto
export const AuthContext = createContext<{
  user: AllUser;
  addUser: (newUser: User) => void;
  login: (authTokens: AuthTokens) => void;
  logout: () => void;
}>({
  user: {},
  addUser: () => {},
  login: () => {},
  logout: () => {},
});

// Provider
export function AuthProvider({ children }: { children: ReactNode }) {
  const login = useCallback(function (authTokens: AuthTokens) {
    Cookies.set("sesion_security_token", JSON.stringify(authTokens));
  }, []);

  const logout = useCallback(function () {
    Cookies.remove("sesion_security_token");
    Cookies.remove("sesion");
  }, []);

  const [user, setUser] = useState<User>({});

  useEffect(() => {
    const storedUser = Cookies.get("sesion");
    if (storedUser) {
      try {
        const userId = decompress(storedUser);
        const GetDataUser = async () => {
          const myUser = await findUser({ id: userId });
          setUser(myUser);
        };
        GetDataUser();
      } catch (error) {
        console.error("Error al obtener el usuario:", error);
      }
    }
  }, []);

  useEffect(() => {
    if (Object.keys(user).length > 0) {
      Cookies.set("sesion", compressUser(JSON.stringify(user.id)), {
        expires: 7,
      });
    }
  }, [user]);

  const addUser = useCallback(function (user: User) {
    const GetDataUser = async () => {
      const myUser = await findUser({ id: user.id });
      setUser(myUser);
    };
    GetDataUser();
  }, []);

  const value = useMemo(
    () => ({
      user,
      addUser,
      login,
      logout,
    }),
    [user, addUser, login, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
