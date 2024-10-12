import { createContext, ReactNode, useContext, useState } from "react";

type CreatePostModalContextType = {
    isModalOpen: boolean,
    showCreatePostModal: () => void,
    hideCreatePostModal: () => void
};

type Props = {
    children: ReactNode;
};

const CreatePostModalContextValues: CreatePostModalContextType = {
    isModalOpen: false,
    showCreatePostModal: () => { },
    hideCreatePostModal: () => { }
};

const CreatePostModalContext = createContext(CreatePostModalContextValues)

export function useCreatePostModal() {
    return useContext(CreatePostModalContext);
}

export const CreatePostModalContextProvider = ({ children }: Props) => {

    const [isModalOpen, setIsModalOpen] = useState(false)

    const showCreatePostModal = () => {
        setIsModalOpen(true)
    }

    const hideCreatePostModal = () => {
        setIsModalOpen(false)
    }


    return (
        <CreatePostModalContext.Provider value={{
            isModalOpen,
            showCreatePostModal,
            hideCreatePostModal
        }} >
            {children}
        </CreatePostModalContext.Provider>
    )
}
