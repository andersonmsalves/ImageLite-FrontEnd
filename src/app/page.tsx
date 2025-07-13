import Image from "next/image";
import {
  PrimeiroComponent,
  ArrowFunction,
} from "@/components/PrimeiroComponent";

export default function Home() {
  return (
    <main>
      <h1>Hello world!</h1>
      <PrimeiroComponent
        mensagem="Meu primeiro compoennte"
        mensagemDoBotao="Clique aqui"
      />
      <ArrowFunction />
    </main>
  );
}
