import React from "react";
import { ActionFunctionArgs } from "@remix-run/node";
import { Form, json } from "@remix-run/react";
import { useState } from "react";
import { loginUser } from "users";

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const email = formData.get("email");
  const password = formData.get("password");
  if (!email || !password) {
    return json({ error: "Email and password are required" }, { status: 400 });
  }
  const user = loginUser(email.toString(), password.toString());
  console.log(user);
  if (!user) {
    return json({ error: "Invalid email or password" }, { status: 401 });
  }
  return null;
};

export default function Index() {
  const [counter, setCounter] = useState<number>(0);
  return (
    <div className="flex h-screen flex-col items-center justify-center gap-4">
      <div onClick={() => setCounter(counter + 1)}>{counter}</div>
      <div className="flex flex-col items-center gap-4">
        <h1 className="text-4xl font-bold">Login</h1>
        <p className="text-lg">
          This is a simple example of a Remix app.
        </p>
      </div>
      <Form method="post">
        <div className="flex flex-col gap-2">
          <label htmlFor="email">Email</label>
          <input type="text" name="email" />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="password">Password</label>
          <input type="password" name="password" />
        </div>
        <button type="submit">Login</button>
      </Form>

    </div>
  );
}
