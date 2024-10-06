import { createContext, ReactNode, useContext, useState } from "react";

type mobileMenuContextType = {
    isMobileMenuOpen: boolean,
    openMobileMenu: () => void,
    closeMobileMenu: () => void,
    toggleMobileMenu: () => void
};

type Props = {
    children: ReactNode;
};

const mobileMenuContextDefaultValues: mobileMenuContextType = {
    isMobileMenuOpen: false,
    openMobileMenu: () => { },
    closeMobileMenu: () => { },
    toggleMobileMenu: () => { }
};

const MobileMenuContext = createContext(mobileMenuContextDefaultValues)

export function useMobileMenu() {
    return useContext(MobileMenuContext);
}



export const MobileMenuContextProvider = ({ children }: Props) => {


    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

    const openMobileMenu = () => {
        setIsMobileMenuOpen(true)
    }

    const closeMobileMenu = () => {
        setIsMobileMenuOpen(false)
    }

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(prev => !prev)
    }

    return (
        <MobileMenuContext.Provider value={{
            isMobileMenuOpen,
            openMobileMenu,
            closeMobileMenu,
            toggleMobileMenu
        }} >
            {children}
        </MobileMenuContext.Provider>
    )
}
