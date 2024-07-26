import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";

interface AppParams {
  username?: string;
  [key: string]: any;
}

interface AppContextProps {
  appParams: AppParams;
  setAppParam: (key: string, value: any) => void;
}

const AppContext = createContext<AppContextProps | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [appParams, setAppParams] = useState<AppParams>({});

  const setAppParam = (key: string, value: any) => {
    setAppParams((prevParams) => ({ ...prevParams, [key]: value }));
  };

  return (
    <AppContext.Provider value={{ appParams, setAppParam }}>
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
