import { MobileMenuContextProvider } from "@/contexts/MobileMenuContext";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {

  return (
    <div className="container font-vazir overflow-hidden">
      <MobileMenuContextProvider>
        <Component {...pageProps} />
      </MobileMenuContextProvider>
    </div>
  )
}