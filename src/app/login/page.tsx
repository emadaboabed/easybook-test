"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Button from "devextreme-react/button";
import TextBox from "devextreme-react/text-box";
import { Validator, RequiredRule } from "devextreme-react/validator";
import { login } from "@/services/auth";
import Cookies from "js-cookie";
import Image from "next/image";
import notify from "devextreme/ui/notify";

export default function Login() {
  const router = useRouter();
  const [formData, setFormData] = useState({ userName: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (Cookies.get("auth_token")) {
      notify("You are already logged in.", "info", 4000);
      setTimeout(() => router.push("/student"), 2000);
    }
  }, [router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await login(formData.userName, formData.password);
      notify("Login successful! Redirecting…", "success", 2000);

      window.dispatchEvent(new Event("loginSuccess"));

      setTimeout(() => router.push("/student"), 2000);
    } catch (err: any) {
      const msg =
        err?.response?.data?.message ||
        "Invalid credentials. Please try again.";
      setError(msg);
      notify(msg, "error", 3000);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex w-screen h-screen">
      {/* Left panel: exact 796px wide */}
      <div className="hidden md:flex flex-col items-center justify-center w-[796px] bg-white border-r border-gray-200 relative">
        {/* Language selector */}
        <div className="absolute top-5 left-5">
          <Button
            stylingMode="outlined"
            type="normal"
            className="!border-gray-300 !text-gray-600 hover:!bg-gray-100 !rounded"
          >
            <div className="flex items-center gap-2 text-sm">
              <Image
                src="/language.svg"
                alt="Language"
                width={16}
                height={16}
              />
              <span>English</span>
            </div>
          </Button>
        </div>

        {/* Illustration */}
        <Image
          src="/login.svg"
          alt="Login Illustration"
          width={400}
          height={400}
          className="max-w-full h-auto"
        />
      </div>

      {/* Right panel: exact 1166px wide */}
      <div className="flex items-center justify-center w-[1166px] bg-gradient-to-br from-[#0C5AE5] to-[#264ECA]">
        <div className="w-[480px] bg-white rounded-sm shadow-xl p-8">
          <h2 className="text-3xl font-semibold text-gray-800 mb-8">Login</h2>

          <form onSubmit={handleLogin} className="space-y-6">
            {/* Username */}
            <TextBox
              placeholder="Username"
              value={formData.userName}
              onValueChanged={(e) =>
                setFormData({ ...formData, userName: e.value })
              }
              height={48}
              className="!bg-[#F5F5F5] !border-b-4 !border-b-[#8E8E8E] !rounded-none !border-t-0 !border-l-0 !border-r-0"
            >
              <Validator>
                <RequiredRule message="Username is required" />
              </Validator>
            </TextBox>

            {/* Password */}
            <TextBox
              placeholder="Password"
              mode="password"
              value={formData.password}
              onValueChanged={(e) =>
                setFormData({ ...formData, password: e.value })
              }
              height={48}
              className="!bg-[#F5F5F5] !border-b-4 !border-b-[#8E8E8E] !rounded-none !border-t-0 !border-l-0 !border-r-0"
            >
              <Validator>
                <RequiredRule message="Password is required" />
              </Validator>
            </TextBox>

            {error && (
              <div className="text-red-600 text-center bg-red-100 px-4 py-2 rounded border border-red-300">
                {error}
              </div>
            )}

            <Button
              text={loading ? "Signing In..." : "Sign In"}
              useSubmitBehavior
              width="100%"
              height={48}
              disabled={loading}
              className="!bg-[#0C5AE5] !text-white hover:!bg-[#0A4ACC] !rounded-md"
            />
          </form>
        </div>
      </div>
    </div>
  );
}
