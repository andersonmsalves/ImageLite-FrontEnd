"use client";

interface ImageCardProps {
  nome?: string;
  tamanho?: number;
  dataUpload?: string;
  extension?: string;
  src?: string;
}

export const ImageCard: React.FC<ImageCardProps> = ({
  nome,
  tamanho,
  dataUpload,
  extension,
  src,
}: ImageCardProps) => {
  function download() {
    window.open(src, "_blank");
  }

  function formatBytes(bytes: number = 0, decimals = 2) {
    if (!+bytes) return " Bytes";

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB"];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
  }

  return (
    <div className="card relative bg-white rounded-md shadow-md transition-transform ease-in duration-300 transform hover:shadow-lg hover:-translate-y-2">
      <img
        className="h-56 w-full object-cover rounded-t-md"
        alt=""
        src={src}
        onClick={download}
      />
      <div className="card-body p-4">
        <h5 className="text-xl font-semibold mb-2 text-gray-600">{`${nome}.${extension}`}</h5>
        <p className="text-gray-600">{formatBytes(tamanho)}</p>
        <p className="text-gray-600">{dataUpload}</p>
      </div>
    </div>
  );
};
