"use client";

import { Template, ImageCard } from "@/components";
import { useImageService } from "@/resources/image/image.service";
import { useState } from "react";
import { Image } from "@/resources/image/image.resource";

export default function GaleriaPage() {
  // https://randomwordgenerator.com/picture.php
  const images = [
    "https://randomwordgenerator.com/img/picture-generator/blue-sea-anemone-3204596.jpg",
    "https://randomwordgenerator.com/img/picture-generator/57e4d74a4853aa14f1dc8460962e33791c3ad6e04e507440752f72d69f44c2_640.jpg",
    "https://randomwordgenerator.com/img/picture-generator/57e1d1444353ae14f1dc8460962e33791c3ad6e04e507441722872d79644c7_640.jpg",
    "https://randomwordgenerator.com/img/picture-generator/52e0d1404256a914f1dc8460962e33791c3ad6e04e507440742f7cd7904dc5_640.jpg",
  ];

  const [loadingData, setLoadingData] = useState<boolean>(false);
  const [imagesDB, setImagesDB] = useState<Image[]>([]);

  const [query, setQuery] = useState<string>("");
  const [extension, setExtension] = useState<string>("");

  const [indexImage, setIndexImage] = useState<number>(0); // valor inicial
  const [urlImage, setUrlImage] = useState<string>(images[0]); // Array de dois elementos.
  const useService = useImageService();

  function mudarImagem() {
    if (indexImage < 4) setIndexImage(indexImage + 1);
    else setIndexImage(0);

    setUrlImage(images[indexImage]);
  }

  async function searchImages() {
    console.log("query: " + query);
    setLoadingData(true);
    const result = await useService.buscar(query, extension);
    setImagesDB(result);
    setLoadingData(false);
    console.table(result);
  }

  function renderImageCard({
    url,
    name,
    size,
    extension = "",
    uploadDate,
  }: Image) {
    return (
      <ImageCard
        key={url}
        nome={name}
        src={url}
        tamanho={size}
        extension={extension}
        dataUpload={uploadDate}
      />
    );
  }

  function renderImageCards() {
    return imagesDB.map((image) => renderImageCard(image));
  }

  return (
    <>
      <Template loading={loadingData}>
        <div className="container mx-auto mt-8 px-4">
          {/*<button
            className="bg-gray-500 rounded-md mb-3 p-1"
            onClick={mudarImagem}
          >
            Mudar imagem
          </button>
          <button
            className="bg-gray-500 rounded-md mb-3 p-1"
            onClick={searchImages}
          >
            Buscar Images DB
          </button>*/}
          <section className="flex flex-col items-center justify-center my-5">
            <div className="flex space-x-4">
              <input
                name="query"
                onChange={(event) => setQuery(event.target.value)}
                type="text"
                className="border px-3 py-2 rounded-lg text-gray-900"
              />
              <select
                className="border px-4 py-2 rounded-lg text-gray-900"
                onChange={(event) => setExtension(event.target.value)}
              >
                <option value="">All formats</option>
                <option value="PNG">PNG</option>
                <option value="JPEG">JPEG</option>
                <option value="GIF">GIF</option>
              </select>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-300"
                onClick={searchImages}
              >
                Search
              </button>
              <button className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-300">
                Add New
              </button>
            </div>
          </section>

          <section className="grid grid-cols-3 gap-8">
            {/*<ImageCard src={urlImage} tamanho="10MB" />*/}
            {renderImageCards()}
          </section>
        </div>
      </Template>
    </>
  );
}
