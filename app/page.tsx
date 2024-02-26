import { auth, signOut } from "@/auth";
import Link from "next/link";
import React from "react";
import Image from "next/image";

const SettingPage = async () => {
  const session = await auth();
  return (
    <div>
      <div>
        <h1>Welcome to the home page</h1>
        {!session && (
          <div>
            <p>You are not logged in!</p>
            <Link href={"/login"}>Login</Link>
          </div>
        )}
      </div>
      <form
        action={async () => {
          "use server";
          await signOut();
        }}
      >
        {session && (
          <>
            <h3>Hello, {session.user?.email}</h3>
            <button type="submit">Logout</button>
          </>
        )}
      </form>
    </div>
  );
};

export default SettingPage;
