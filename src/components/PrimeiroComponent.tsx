"use client";

interface PrimeiroComponentProps {
  mensagem: string;
  mensagemDoBotao: string;
}

export const PrimeiroComponent: React.FC<PrimeiroComponentProps> = (
  props: PrimeiroComponentProps
) => {
  function handleClick() {
    console.log("cliquei no botão");
  }

  return (
    <div>
      <h1>{props.mensagem}</h1>
      <button onClick={handleClick}>{props.mensagemDoBotao}</button>
    </div>
  );
};

export const ArrowFunction = () => {
  return <div>From Arrow Function</div>;
};
