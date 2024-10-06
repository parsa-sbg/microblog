import Header from "@/components/common/Header";
import SideBar from "@/components/common/SideBar";
import { useMobileMenu } from "@/contexts/MobileMenuContext";

export default function Home() {


  const {isMobileMenuOpen} = useMobileMenu()


  return (

    <div className="h-screen pt-[56.96px] md:pt-[60.96px] container">

      <div className="h-full py-4 gap-4 grid grid-cols-12 grid-rows-1 relative">

        <SideBar />

        <div className={`${isMobileMenuOpen && 'translate-x-[180px]'} transition-all md:!translate-x-0 col-span-12 h-full row-span-2 md:col-span-9 bg-yellow-500 rounded-md`}>
          <h1>home page</h1>
        </div>

      </div>

    </div>

  );
}