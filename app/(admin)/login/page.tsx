"use client";

import { Button, Input, Loading } from "@nextui-org/react";
import React, { FormEvent, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSession } from "next-auth/react";

export default function page() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>();
  const router = useRouter();

  async function handleLogin(e: FormEvent) {
    e.preventDefault();
    setError(undefined);

    try {
      setLoading(true);
      const response = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });
      console.log(response);
      if (!!response?.error) return setError("Wrong credentials!");
      else {
        return router.push("/admin");
      }
    } catch (error) {
      setError("Something wrong! Please try later");
    } finally {
      setLoading(false);
    }
  }
  return (
    <main>
      <div className="flex justify-center h-screen items-center">
        <form onSubmit={handleLogin}>
          <h1 className="text-3xl font-bold">Login</h1>
          {error && <small className="text-red-600">{error}</small>}
          <div className="flex flex-col gap-2">
            <Input
              value={email}
              onChange={({ target }) => setEmail(target.value)}
              label="Email :"
              type="email"
            />
            <Input
              value={password}
              onChange={({ target }) => setPassword(target.value)}
              label="Paassword :"
              type="password"
            />

            <div className="flex gap-3">
              {loading && <Loading color="error" />}
              <Button
                type="submit"
                color="error"
                disabled={email.length < 3 || password.length < 3}
              >
                Submit
              </Button>
            </div>
          </div>
        </form>
      </div>
    </main>
  );
}
