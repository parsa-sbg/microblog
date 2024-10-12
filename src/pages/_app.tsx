import { CreatePostModalContextProvider } from "@/contexts/CreatePostModalContext";
import { LogOutModalContextProvider } from "@/contexts/LogOutModalContext";
import { MobileMenuContextProvider } from "@/contexts/MobileMenuContext";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {

  return (
    <div className="dark">
      <div className="dark:bg-[#1E1E1E] bg-bglight overflow-hidden">
        <div className="container font-vazir dark:text-gray-300 text-clip">
          <MobileMenuContextProvider>
            <LogOutModalContextProvider>
            <CreatePostModalContextProvider>
              <Component {...pageProps} />
            </CreatePostModalContextProvider>
            </LogOutModalContextProvider>
          </MobileMenuContextProvider>
        </div>
      </div>
    </div>
  )
}