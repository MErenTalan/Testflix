import useCurrentUser from "@/hooks/useCurrentUser";
import { NextPageContext } from "next";
import { getSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/router";

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/auth",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}
const Profiles = () => {
  const { data:user } = useCurrentUser()
  const router = useRouter()
    console.log(user)
  return (
    <div className="flex items-center h-full justify-center">
      <div className="flex flex-col">
        <h1 className="text-3xl md:text-6xl text-white text-center">
          Who is watching?
        </h1>
        <div className="flex items-center justify-center gap-8 mt-10">
          <div onClick={() => {
            router.push('/')
          }}>
            <div className="group flex-row w-44 mx-auto">
              <div
                className="w-44 
              h-44 
              rounded-md 
              flex items-center 
              justify-center
               border-2 
               border-transparent 
               group-hover:cursor-pointer 
               group-hover:border-white 
               overflow-hidden"
              >
                <Image
                  src="/images/default-blue.png"
                  width={200}
                  height={200}
                  alt="profile"
                />
              </div>
              <div className="text-gray-400 text-center text-2xl mt-4 group-hover:text-white">
                <h2>{user.name}</h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Profiles;
