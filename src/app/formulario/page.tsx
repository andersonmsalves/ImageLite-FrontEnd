"use client";

import {
  Template,
  RenderIf,
  useNotification,
  AuthenticatePage,
} from "@/components";
import { InputText } from "@/components/input/InputText";
import { FieldError } from "@/components/input/FieldError";
import { Button } from "@/components/button";
import { useFormik } from "formik";
import { useState } from "react";
import { useImageService } from "@/resources/image/image.service";
import { FormProps, formScheme, formValidationSchema } from "./formScheme";
import Link from "next/link";

export default function FormularioPage() {
  const [loading, setLoading] = useState<boolean>(false);
  const [imagePreview, setImagePreview] = useState<string>("");
  const service = useImageService();
  const notification = useNotification();

  const formik = useFormik<FormProps>({
    initialValues: formScheme,
    onSubmit: handleSubmit,
    validationSchema: formValidationSchema,
  });

  async function handleSubmit(dados: FormProps) {
    setLoading(true);
    const formData = new FormData();
    formData.append("file", dados.file);
    formData.append("name", dados.name);
    formData.append("tags", dados.tags);

    await service.salvar(formData);
    formik.resetForm();
    setImagePreview("");
    setLoading(false);

    notification.notify("Upload send success", "success");
  }

  function onFileUpload(event: React.ChangeEvent<HTMLInputElement>) {
    console.log("onFileUpload: ");
    if (event.target.files) {
      const file = event.target.files[0];
      console.log(file);
      formik.setFieldValue("file", file);
      const imageURL = URL.createObjectURL(file);
      setImagePreview(imageURL);
    }
  }

  return (
    <AuthenticatePage>
      <Template loading={loading}>
        <section className="flex flex-col items-center justify-center my-5">
          <h5 className="mt-3 mb-10 text-3xl font-extrabold tracking-tight text-gray-900">
            Nova Imagem
          </h5>
          <form onSubmit={formik.handleSubmit}>
            <div className="grid grid-cols-1">
              <label className="block text-sm font-medium leading-6 text-gray-700">
                Name: *
              </label>
              <InputText
                value={formik.values.name}
                id="name"
                onChange={formik.handleChange}
                placeholder="type the image's name"
              />
              <FieldError message={formik.errors.name} />
            </div>

            <div className="mt-5 grid grid-cols-1">
              <label className="block text-sm font-medium leading-6 text-gray-700">
                Tags: *
              </label>
              <InputText
                value={formik.values.tags}
                id="tags"
                onChange={formik.handleChange}
                placeholder="type the tags comma separated"
              />
              <FieldError message={formik.errors.tags} />
            </div>

            <div className="mt-5 grid grid-cols-1">
              <label className="block text-sm font-medium leading-6 text-gray-700">
                Image: *
              </label>
              <FieldError message={formik.errors.file} />
              <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-800 px-6 py-10">
                <div className="text-center">
                  <RenderIf condition={!imagePreview}>
                    <svg
                      className="mx-auto h-12 w-12 text-gray-300"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </RenderIf>
                  <div className="mt-4 flex text-sm leading-6 text-gray-600">
                    <label className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600">
                      <RenderIf condition={!imagePreview}>
                        <span>Click to upload</span>
                      </RenderIf>
                      <RenderIf condition={!!imagePreview}>
                        <img
                          src={imagePreview}
                          width="250"
                          className="rounded-md"
                        />
                      </RenderIf>
                      <input
                        type="file"
                        onChange={onFileUpload}
                        className="sr-only"
                      />
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-3 flex items-center justify-end gap-x-3">
              <Button
                style="bg-blue-500 hover:bg-blue-300"
                type="submit"
                label="Save"
              />
              <Link href="/galeria">
                <Button
                  style="bg-red-500 hover:bg-red-300"
                  type="button"
                  label="Cancel"
                />
              </Link>
            </div>
          </form>
        </section>
      </Template>
    </AuthenticatePage>
  );
}
