import { createContext, ReactNode, useContext, useState } from "react";

type LogOutModalContextType = {
    isModalOpen: boolean,
    showLogOutModal: () => void,
    hideLogOutModal: () => void
};

type Props = {
    children: ReactNode;
};

const LogOutModalContextValues: LogOutModalContextType = {
    isModalOpen: false,
    showLogOutModal: () => { },
    hideLogOutModal: () => { }
};

const LogOutModalContext = createContext(LogOutModalContextValues)

export function useLogOutModal() {
    return useContext(LogOutModalContext);
}



export const LogOutModalContextProvider = ({ children }: Props) => {

    const [isModalOpen, setIsModalOpen] = useState(false)

    const showLogOutModal = () => {
        setIsModalOpen(true)
    }

    const hideLogOutModal = () => {
        setIsModalOpen(false)
    }


    return (
        <LogOutModalContext.Provider value={{
            isModalOpen,
            showLogOutModal,
            hideLogOutModal
        }} >
            {children}
        </LogOutModalContext.Provider>
    )
}
