import AsyncStorage from "@react-native-async-storage/async-storage";
import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { useColorScheme } from "react-native";
import { darkTheme, lightTheme } from "../themes";
import { getInstanceInfo } from "../services/instanceService";
import {
  AppContextProps,
  AppParams,
  InstanceInfo,
} from "../components/interfaces";

const AppContext = createContext<AppContextProps | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [appParams, setAppParams] = useState<AppParams>({});
  const [theme, setTheme] = useState<any>(lightTheme);
  const [isTabVisible, setIsTabVisible] = useState(true); // Initialize tab visibility state
  const [replyStatusId, setReplyStatusId] = useState<string>("");
  const [instanceInfo, setInstanceInfo] = useState<InstanceInfo | null>(null);
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    const loadInitialData = async () => {
      try {
        // Load theme from AsyncStorage
        const storedTheme = await AsyncStorage.getItem("appTheme");
        if (storedTheme === "dark") {
          setTheme(darkTheme);
        } else if (storedTheme === "light") {
          setTheme(lightTheme);
        } else {
          const systemTheme = useColorScheme();
          setTheme(systemTheme === "dark" ? darkTheme : lightTheme);
        }

        // Load user info from AsyncStorage
        const storedUserInfo = await AsyncStorage.getItem("userInfo");
        console.log("Loaded userInfo from AsyncStorage:", storedUserInfo);
        if (storedUserInfo) {
          const userInfo = JSON.parse(storedUserInfo);
          console.log("Parsed userInfo:", userInfo);

          if (!userInfo?.apiBaseUrl) {
            console.warn(
              "apiBaseUrl is missing in userInfo. App will be fetching it again..."
            );
          } else {
            setAppParams(userInfo);
          }
        } else {
          console.error("User info is missing from AsyncStorage.");
        }
      } catch (error) {
        console.error("Error loading initial data:", error);
      } finally {
        setLoading(false); // Set loading to false after data is loaded
      }
    };
    loadInitialData();
  }, []);

  useEffect(() => {
    const fetchInstanceInfo = async () => {
      if (appParams.apiBaseUrl) {
        const info = await getInstanceInfo(appParams.apiBaseUrl);
        if (info) {
          setInstanceInfo(info);
        }
      }
    };

    fetchInstanceInfo();
  }, [appParams.apiBaseUrl]);

  const setAppParam = (key: string, value: any) => {
    setAppParams((prevParams) => ({ ...prevParams, [key]: value }));
  };

  const setReplyStatus = (id: string) => {
    setReplyStatusId(id);
  };

  const updateTheme = async (newTheme: string) => {
    await AsyncStorage.setItem("appTheme", newTheme);
    setTheme(newTheme === "dark" ? darkTheme : lightTheme);
  };

  const showTabNavigation = () => setIsTabVisible(true); // Function to show TabNavigation
  const hideTabNavigation = () => setIsTabVisible(false); // Function to hide TabNavigation

  return (
    <AppContext.Provider
      value={{
        appParams,
        setAppParam,
        theme,
        updateTheme,
        isTabVisible, // Expose the tab visibility state
        showTabNavigation, // Expose the function to show TabNavigation
        hideTabNavigation, // Expose the function to hide TabNavigation
        replyStatusId,
        setReplyStatus,
        instanceInfo,
        loading, // Expose the loading state
      }}
    >
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
