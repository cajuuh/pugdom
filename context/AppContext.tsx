import AsyncStorage from "@react-native-async-storage/async-storage";
import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { useColorScheme } from "react-native";
import { darkTheme, lightTheme } from "../themes"; // Adjust the path as necessary

interface AppParams {
  username?: string;
  [key: string]: any;
}

interface AppContextProps {
  appParams: AppParams;
  setAppParam: (key: string, value: any) => void;
  theme: any;
  updateTheme: (newTheme: string) => void;
}

const AppContext = createContext<AppContextProps | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [appParams, setAppParams] = useState<AppParams>({});
  const [theme, setTheme] = useState<any>(lightTheme);

  useEffect(() => {
    const loadTheme = async () => {
      const storedTheme = await AsyncStorage.getItem("appTheme");
      if (storedTheme === "dark") {
        setTheme(darkTheme);
      } else if (storedTheme === "light") {
        setTheme(lightTheme);
      } else {
        const systemTheme = useColorScheme();
        setTheme(systemTheme === "dark" ? darkTheme : lightTheme);
      }
    };
    loadTheme();
  }, []);

  const setAppParam = (key: string, value: any) => {
    setAppParams((prevParams) => ({ ...prevParams, [key]: value }));
  };

  const updateTheme = async (newTheme: string) => {
    await AsyncStorage.setItem("appTheme", newTheme);
    setTheme(newTheme === "dark" ? darkTheme : lightTheme);
  };

  return (
    <AppContext.Provider value={{ appParams, setAppParam, theme, updateTheme }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};
