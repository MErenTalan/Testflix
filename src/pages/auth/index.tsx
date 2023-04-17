import Input from "@/components/Input";
import axios from "axios";
import { useCallback, useState } from "react";
import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

import bcrypt from "bcrypt";
import Image from "next/image";

const Auth = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [variant, setVariant] = useState("login");

  const toggleVariant = useCallback(() => {
    setVariant((variant) => (variant === "login" ? "register" : "login"));
  }, []);

  const login = useCallback(async () => {
    try {
      const response = await signIn("credentials", {
        email,
        password,
        callbackUrl: "/profiles",
      });
    } catch (error) {
      console.log(error);
    }
  }, [email, password]);

  const register = useCallback(async () => {
    try {
      await axios.post("/api/register", {
        email,
        name,
        password,
      });
      login();
    } catch (error) {
      console.log(error);
    }
  }, [email, name, password, login]);

  return (
    <section className="relative h-full w-full bg-[url('/images/hero.jpg')] bg-no-repeat bg-center bg-cover">
      <div className="bg-black w-full h-full lg:bg-opacity-50">
        {/* Include shared UI here e.g. a header or sidebar */}
        <nav className="px-12 py-5">
          <Image
            src={"/images/logo.png"}
            className="h-12"
            width={200}
            height={200}
            alt="Netflix"
          />
        </nav>

        <div className="flex justify-center">
          <div className="bg-black/70 p-16 self-center mt-2 lg:w-2/5 lg:max-w-md rounded-md w-full">
            <h2 className="text-white text-4xl mb-8 font-semibold">
              {variant === "login" ? "Login" : "Register"}
            </h2>
            <div className="flex flex-col gap-4">
              {variant === "register" && (
                <Input
                  type="text"
                  label="Username"
                  value={name}
                  onChange={(e: any) => setName(e.target.value)}
                  id={"registerUsername"}
                />
              )}
              <Input
                type="email"
                label="E-mail Address"
                value={email}
                onChange={(e: any) => setEmail(e.target.value)}
                id={"loginEmail"}
              />
              <Input
                type="password"
                label="Password"
                value={password}
                onChange={(e: any) => setPassword(e.target.value)}
                id={"loginPassword"}
              />
            </div>
            <button
              onClick={() => {
                if (variant === "login") {
                  login();
                } else {
                  register();
                }
              }}
              className="bg-red-600 py-3 text-white rounded-md w-full mt-10 hover:bg-red-700 transition"
            >
              {variant === "login" ? "Login" : "Register"}
            </button>
            <div className="flex flex-row items-center justify-center gap-4 mt-8">
              <div
                onClick={() => {
                  signIn("google", {
                    callbackUrl: "/",
                  });
                }}
                className="w-10 h-10 bg-white rounded-full flex items-center justify-center cursor-pointer hover:opacity-80 transition"
              >
                <FcGoogle className="text-2xl" />
              </div>
              <div
                onClick={() => {
                  signIn("github", {
                    callbackUrl: "/",
                  });
                }}
                className="w-10 h-10 bg-white rounded-full flex items-center justify-center cursor-pointer hover:opacity-80 transition"
              >
                <FaGithub className="text-2xl" />
              </div>
            </div>
            <p className="text-neutral-500 mt-12">
              {variant === "login"
                ? "First time using Netflix?"
                : "Already have an account?"}
              <span
                onClick={toggleVariant}
                className="text-white ml-1 hover:underline cursor-pointer"
              >
                {variant === "login" ? "Create an account" : "Login"}
              </span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Auth;
