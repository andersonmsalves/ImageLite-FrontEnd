import React from "react";

interface TemplateProps {
  children: React.ReactNode;
}

export const Template: React.FC<TemplateProps> = (props: TemplateProps) => {
  return (
    <>
      <Header />
      {props.children}
      <Footer />
    </>
  );
};

export const Header: React.FC = () => {
  return (
    <header className="bg-indigo-950 text-white py-3">
      <div className="container mx-auto flex justify-between items-center px-4">
        <h1 className="text-3x1 font-bold">ImageLite</h1>
      </div>
    </header>
  );
};

export const Footer: React.FC = () => {
  return (
    <footer className="bg-indigo-950 text-white py-4 mt-8">
      <div className="container mx-auto text-center">
        Desenvolvido por Anderson Alves
      </div>
    </footer>
  );
};
