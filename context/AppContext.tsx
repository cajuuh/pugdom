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
import { InstanceInfo } from "../components/interfaces";

interface AppParams {
  avatar?: string;
  username?: string;
  apiBaseUrl?: string;
  accessToken?: string;
  [key: string]: any;
}

interface AppContextProps {
  appParams: AppParams;
  setAppParam: (key: string, value: any) => void;
  theme: any;
  updateTheme: (newTheme: string) => void;
  isTabVisible: boolean;
  showTabNavigation: () => void;
  hideTabNavigation: () => void;
  replyStatusId: string;
  setReplyStatus: (id: string) => void;
  instanceInfo: InstanceInfo | null;
}

const AppContext = createContext<AppContextProps | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [appParams, setAppParams] = useState<AppParams>({});
  const [theme, setTheme] = useState<any>(lightTheme);
  const [isTabVisible, setIsTabVisible] = useState(true); // Initialize tab visibility state
  const [replyStatusId, setReplyStatusId] = useState<string>("");
  const [instanceInfo, setInstanceInfo] = useState<InstanceInfo | null>(null);

  useEffect(() => {
    const loadInitialData = async () => {
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
      if (storedUserInfo) {
        setAppParams(JSON.parse(storedUserInfo));
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
