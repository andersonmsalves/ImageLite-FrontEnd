"use client";

import { Template, RenderIf, useNotification } from "@/components";
import { InputText } from "@/components/input/InputText";
import { Button } from "@/components/button";
import { FieldError } from "@/components/input/FieldError";
import { useState } from "react";
import { formScheme, LoginForm, validationScheme } from "./formScheme";
import { useFormik } from "formik";
import { useAuth } from "@/resources";
import { useRouter } from "next/navigation";
import { Credentials, User } from "@/resources/user/users.resource";
import { AccessToken } from "@/resources/user/users.resource";

export default function LoginPage() {
  const [loading, setLoading] = useState<boolean>(false);
  const [newUserState, setNewUserState] = useState<boolean>(false);

  const auth = useAuth();
  const notification = useNotification();
  const router = useRouter();

  const { values, handleChange, handleSubmit, errors, resetForm } =
    useFormik<LoginForm>({
      initialValues: formScheme,
      validationSchema: validationScheme,
      onSubmit: onsubmit,
    });

  async function onsubmit(values: LoginForm) {
    //console.log(values);
    if (!newUserState) {
      const credentials: Credentials = {
        email: values.email,
        password: values.password,
      };

      try {
        const accessToken = await auth.authenticate(credentials);
        auth.initSession(accessToken);
        console.log("Sessão esta válida: ", auth.isSessionValid());
        router.push("/galeria");
      } catch (error: any) {
        const message = error?.message;
        notification.notify(message, "error");
      }
    } else {
      const user: User = {
        email: values.email,
        name: values.name,
        password: values.password,
      };

      try {
        const response = await auth.save(user);
        notification.notify("Success on saving user", "success");
        resetForm();
        setNewUserState(false);
      } catch (error: any) {
        const message = error?.message;
        notification.notify(message, "error");
      }
    }
  }

  return (
    <Template loading={loading}>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-1xl font-bold leading-9 tracking-tight text-gray-900">
            {newUserState ? "Create New User" : "Login to Your Account"}
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={handleSubmit} className="space-y-3">
            <RenderIf condition={newUserState}>
              <div>
                <label className="block text-sm font-medium leading-6 text-gray-900">
                  Nome:
                </label>
                <div className="mt-2">
                  <InputText
                    style="w-full"
                    id="name"
                    value={values.name}
                    onChange={handleChange}
                  />
                  <FieldError message={errors.name} />
                </div>
              </div>
            </RenderIf>
            <div>
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Email:
              </label>
              <div className="mt-2">
                <InputText
                  type="email"
                  style="w-full"
                  id="email"
                  value={values.email}
                  onChange={handleChange}
                />
                <FieldError message={errors.email} />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Password
              </label>
              <div className="mt-2">
                <InputText
                  type="password"
                  style="w-full"
                  id="password"
                  value={values.password}
                  onChange={handleChange}
                />
                <FieldError message={errors.password} />
              </div>
            </div>

            <RenderIf condition={newUserState}>
              <div>
                <label className="block text-sm font-medium leading-6 text-gray-900">
                  Password Match:
                </label>
                <div className="mt-2">
                  <InputText
                    type="password"
                    style="w-full"
                    id="passwordMatch"
                    value={values.passwordMatch}
                    onChange={handleChange}
                  />
                  <FieldError message={errors.passwordMatch} />
                </div>
              </div>
            </RenderIf>

            <div>
              <RenderIf condition={newUserState}>
                <Button
                  type="submit"
                  style="bg-indigo-700 hover:bg-indigo-500"
                  label="Save"
                />
                <Button
                  type="button"
                  style="bg-red-700 hover:bg-red-500 mx-2"
                  label="Cancel"
                  onClick={(event) => setNewUserState(false)}
                />
              </RenderIf>

              <RenderIf condition={!newUserState}>
                <Button
                  type="submit"
                  style="bg-indigo-700 hover:bg-indigo-500"
                  label="Login"
                />
                <Button
                  type="button"
                  style="bg-red-700 hover:bg-red-500 mx-2"
                  label="Sign up"
                  onClick={(event) => setNewUserState(true)}
                />
              </RenderIf>
            </div>
          </form>
        </div>
      </div>
    </Template>
  );
}
