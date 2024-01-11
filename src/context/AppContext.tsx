import React, { createContext, useContext, useEffect } from "react";
import { MainLoader } from "@/shared/AppLoader/MainLoader";

export const AppContext = createContext({});

// eslint-disable-next-line react-refresh/only-export-components
export const useAppContext = () => useContext(AppContext);

export const AppContextProvider = ({
    children,
}: {children: React.ReactNode}) => {
    const [loading, setLoading] = React.useState<boolean>(true);
    const [sideBarData, setSideBarData] = React.useState<boolean>(false);

    useEffect(() => {
        setLoading(false);
    }, []);

    return (
        <AppContext.Provider value={{
            setLoading,
            setSideBarData,
            sideBarData,
        }}>
            {loading ? <MainLoader /> : children}
        </AppContext.Provider>
    );
};