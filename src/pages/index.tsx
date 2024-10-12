import Header from "@/components/common/Header";
import SideBar from "@/components/common/SideBar";
import { GetServerSideProps } from "next";
import jwt, { JwtPayload } from 'jsonwebtoken'
import UserInterface from "@/types/userType";
import { userModel } from "@/models/userModel";
import LogOutModal from "@/components/common/logout/LogOutModal";
import PostList from "@/components/common/PostList";
import { postModel } from "@/models/postModel";
import PostInterface from "@/types/postType";

type HomeProps = {
  user: UserInterface | null
  allPosts: PostInterface[]
}

export default function Home({ user, allPosts }: HomeProps) {


  return (

    <div className="h-screen pt-[56.96px] md:pt-[60.96px] container">

      <Header user={user} />

      <div className="h-full py-4 gap-4 grid grid-cols-12 grid-rows-1 relative">

        <SideBar user={user} />

        <PostList noPostMessage="there is no posts yet !" posts={allPosts} />

      </div>
      <LogOutModal />
    </div>

  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {

  // get all posts
  const allPosts = await postModel.find({})

  const { token } = context.req.cookies
  if (!token) return { props: { user: null, allPosts } }


  const secretkey = process.env.PRIVATEKEY
  if (!secretkey) throw new Error('privete key is not defined')

  try {
    const decoded = jwt.verify(token, secretkey) as JwtPayload
    const user = await userModel.findOne({ username: decoded.username })


    return {
      props: {
        user: JSON.parse(JSON.stringify(user)),
        allPosts,
      }
    }
  } catch {
    return {
      props: {
        user: null,
        allPosts
      }
    }
  }
}