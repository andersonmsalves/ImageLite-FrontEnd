"use client";

import { useAuth } from "@/resources";
import LoginPage from "@/app/login/page";

interface AuthenticatePageProps {
  children: React.ReactNode;
}

export const AuthenticatePage: React.FC<AuthenticatePageProps> = ({
  children,
}) => {
  const auth = useAuth();

  // Enquanto valida a sessão ou faz redirecionamento, pode exibir um loader ou null
  if (!auth.isSessionValid()) {
    return <LoginPage />; // ou um <Loading /> se preferir
  }

  return <>{children}</>;
};
