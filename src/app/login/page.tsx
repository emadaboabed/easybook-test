"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Head from "next/head";
import Button from "devextreme-react/button";
import LoadPanel from "devextreme-react/load-panel";
import TextBox from "devextreme-react/text-box";
// import { LoadPanel, TextBox } from "devextreme-react";
// import { Button } from "devextreme-react";
import { Validator, RequiredRule } from "devextreme-react/validator";
import { login } from "@/services/auth";
import Cookies from "js-cookie";
import Image from "next/image";
import { SelectBox } from "devextreme-react";

export default function Login() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    userName: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (Cookies.get("auth_token")) {
      router.push("/student");
    }
  }, [router]);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await login(formData.userName, formData.password);
      router.push("/student");
    } catch (error: unknown) {
      console.error("Login error:", error);
      if (isAxiosErrorWithMessage(error)) {
        setError(error.response.data.message);
      } else {
        setError("Invalid credentials. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  function isAxiosErrorWithMessage(
    error: unknown
  ): error is { response: { data: { message: string } } } {
    if (typeof error === "object" && error !== null && "response" in error) {
      const response = (error as { response?: unknown }).response;
      if (
        typeof response === "object" &&
        response !== null &&
        "data" in response
      ) {
        const data = (response as { data?: unknown }).data;
        if (
          typeof data === "object" &&
          data !== null &&
          "message" in data &&
          typeof (data as { message?: unknown }).message === "string"
        ) {
          return true;
        }
      }
    }
    return false;
  }

  return (
    <div className="flex w-screen h-screen">
      <div className="flex items-center justify-center w-screen h-screen bg-gray-100">
        <Head>
          <title>Login</title>
          <meta
            name="description"
            content="Login to Student Task Management System"
          />
        </Head>

        {/* Main Login Wrapper */}
        <div className="flex w-full max-w-screen lg:max-w-screen h-full max-h-[650px] shadow-xl overflow-hidden bg-white m-4 md:m-0 p-10">
          <div className="hidden md:flex flex-1 bg-white flex-col items-center justify-center relative p-5 border-r border-gray-200">
            <div className="absolute top-5 left-5">
              <Button
                stylingMode="outlined"
                type="normal"
                className="!border-gray-300 !text-gray-600 hover:!bg-gray-100"
              >
                <div className="flex items-center gap-2">
                  <Image
                    src="/language.svg"
                    alt="Language"
                    width={16}
                    height={16}
                  />
                  <span>English</span>
                </div>
              </Button>
              {/* <SelectBox
                text="English"
                stylingMode="outlined"
                className="!border-gray-300 !text-gray-600 hover:!bg-gray-100"
              /> */}
            </div>
            <div className="flex items-center justify-center h-full">
              <Image
                src="/login.svg"
                alt="Login Illustration"
                width={300}
                height={300}
                className="max-w-full h-auto"
              />
            </div>
          </div>

          {/* Right Side (Login Form) */}
          <div className="flex-1 bg-gradient-to-br from-[#0C5AE5] to-[#264eca] flex items-center justify-center ">
            {/* <div className="bg-white rounded-[12px] shadow-xl w-[70.55%]  p-8 flex flex-col gap-9 mx-20"> */}
            <div className="w-full max-w-md bg-white rounded-md shadow-lg overflow-hidden !p-8">
              <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 !pb-8 my-2">
                Login
              </h2>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleLogin(e);
                }}
                className="space-y-5"
              >
                <div>
                  <TextBox
                    placeholder="Username"
                    value={formData.userName}
                    onValueChanged={(e) =>
                      setFormData({ ...formData, userName: e.value })
                    }
                    height={40}
                    className=" !bg-[#F5F5F5] !border-b-[5px] !rounded-none !hover:border-none !border-b-[#8E8E8E] !mb-4 "
                  >
                    <Validator>
                      <RequiredRule message="Username is required" />
                    </Validator>
                  </TextBox>
                </div>

                <div>
                  <TextBox
                    placeholder="Password"
                    mode="password"
                    value={formData.password}
                    onValueChanged={(e) =>
                      setFormData({ ...formData, password: e.value })
                    }
                    height={40}
                    className="!bg-[#F5F5F5] !border-b-[6px] !rounded-none !hover:border-none !border-b-[#8E8E8E] !mb-8 "
                  >
                    <Validator>
                      <RequiredRule message="Password is required" />
                    </Validator>
                  </TextBox>
                </div>

                {error && (
                  <div className="text-red-500 text-sm text-center p-2 bg-red-100 rounded border border-red-300">
                    {error}
                  </div>
                )}

                <Button
                  text={loading ? "Signing In..." : "Sign In"}
                  type="default"
                  useSubmitBehavior={true}
                  width="100%"
                  height={45}
                  disabled={loading}
                  className="!bg-indigo-600 !text-white hover:!bg-indigo-700"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
