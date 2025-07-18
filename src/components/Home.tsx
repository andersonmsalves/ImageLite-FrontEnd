"use client";

import { useAuth } from "@/resources";
//import { useRouter } from "next/navigation";
import LoginPage from "../app/login/page";
import GaleriaPage from "@/app/galeria/page";

export const Home = () => {
  const auth = useAuth();
  //const router = useRouter();
  const user = auth.getUserSession();

  if (!user) {
    return <LoginPage />;
  }

  return <GaleriaPage />;
};
