import Header from "@/components/common/Header";
import SideBar from "@/components/common/SideBar";
import { useMobileMenu } from "@/contexts/MobileMenuContext";
import { GetServerSideProps } from "next";
import jwt, { JwtPayload } from 'jsonwebtoken'
import UserInterface from "@/types/userType";
import { userModel } from "@/models/userModel";
import LogOutModal from "@/components/common/logout/LogOutModal";

type HomeProps = {
  user: UserInterface | null
}

export default function Home({ user }: HomeProps) {

  const { isMobileMenuOpen } = useMobileMenu()


  return (

    <div className="h-screen pt-[56.96px] md:pt-[60.96px] container">

      <Header user={user} />

      <div className="h-full py-4 gap-4 grid grid-cols-12 grid-rows-1 relative">

        <SideBar user={user} />

        <div className={`${isMobileMenuOpen && 'translate-x-[180px]'} transition-all md:!translate-x-0 col-span-12 h-full row-span-2 md:col-span-9 bg-green-500 rounded-md`}>
          <h1>home page</h1>
        </div>

      </div>
      <LogOutModal />
    </div>

  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {


  const { token } = context.req.cookies
  if (!token) return { props: { user: null } }


  const secretkey = process.env.PRIVATEKEY
  if (!secretkey) throw new Error('privete key is not defined')

  try {
    const decoded = jwt.verify(token, secretkey) as JwtPayload
    const user = await userModel.findOne({ username: decoded.username })

    return {
      props: {
        user: JSON.parse(JSON.stringify(user))
      }
    }
  } catch {
    throw new Error('token is not valid ')
  }

}