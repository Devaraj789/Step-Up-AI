import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useContext, useEffect, useState } from "react";

interface UserProfile {
  name: string;
  email: string;
  plan: string;
  credits: number;
  avatar?: string;
}

interface AppContextType {
  isLoggedIn: boolean;
  user: UserProfile;
  language: string;
  dataRetention: boolean;
  bookmarks: string[];
  selectedAgents: string[];
  setIsLoggedIn: (val: boolean) => void;
  setUser: (user: UserProfile) => void;
  setLanguage: (lang: string) => void;
  setDataRetention: (val: boolean) => void;
  addBookmark: (id: string) => void;
  removeBookmark: (id: string) => void;
  logout: () => void;
}

const defaultUser: UserProfile = {
  name: "User",
  email: "user@email.com",
  plan: "Free",
  credits: 100,
};

const AppContext = createContext<AppContextType>({} as AppContextType);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<UserProfile>(defaultUser);
  const [language, setLanguage] = useState("English");
  const [dataRetention, setDataRetention] = useState(true);
  const [bookmarks, setBookmarks] = useState<string[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const stored = await AsyncStorage.getItem("app_state");
        if (stored) {
          const parsed = JSON.parse(stored);
          if (parsed.isLoggedIn !== undefined) setIsLoggedIn(parsed.isLoggedIn);
          if (parsed.user) setUser(parsed.user);
          if (parsed.language) setLanguage(parsed.language);
          if (parsed.dataRetention !== undefined) setDataRetention(parsed.dataRetention);
          if (parsed.bookmarks) setBookmarks(parsed.bookmarks);
        }
      } catch {}
    })();
  }, []);

  const save = (updates: Partial<{ isLoggedIn: boolean; user: UserProfile; language: string; dataRetention: boolean; bookmarks: string[] }>) => {
    AsyncStorage.setItem("app_state", JSON.stringify({ isLoggedIn, user, language, dataRetention, bookmarks, ...updates })).catch(() => {});
  };

  const handleSetIsLoggedIn = (val: boolean) => {
    setIsLoggedIn(val);
    save({ isLoggedIn: val });
  };

  const handleSetUser = (u: UserProfile) => {
    setUser(u);
    save({ user: u });
  };

  const handleSetLanguage = (lang: string) => {
    setLanguage(lang);
    save({ language: lang });
  };

  const handleSetDataRetention = (val: boolean) => {
    setDataRetention(val);
    save({ dataRetention: val });
  };

  const addBookmark = (id: string) => {
    const next = [...bookmarks, id];
    setBookmarks(next);
    save({ bookmarks: next });
  };

  const removeBookmark = (id: string) => {
    const next = bookmarks.filter((b) => b !== id);
    setBookmarks(next);
    save({ bookmarks: next });
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUser(defaultUser);
    save({ isLoggedIn: false, user: defaultUser });
  };

  return (
    <AppContext.Provider
      value={{
        isLoggedIn,
        user,
        language,
        dataRetention,
        bookmarks,
        selectedAgents: [],
        setIsLoggedIn: handleSetIsLoggedIn,
        setUser: handleSetUser,
        setLanguage: handleSetLanguage,
        setDataRetention: handleSetDataRetention,
        addBookmark,
        removeBookmark,
        logout,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  return useContext(AppContext);
}
