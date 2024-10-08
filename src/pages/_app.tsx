import { LogOutModalContextProvider } from "@/contexts/LogOutModalContext";
import { MobileMenuContextProvider } from "@/contexts/MobileMenuContext";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {

  return (
    <div className="bg-[#1E1E1E] overflow-hidden dark">
      <div className="container font-vazir dark:text-gray-300">
        <MobileMenuContextProvider>
          <LogOutModalContextProvider>
            <Component {...pageProps} />
          </LogOutModalContextProvider>
        </MobileMenuContextProvider>
      </div>
    </div>
  )
}