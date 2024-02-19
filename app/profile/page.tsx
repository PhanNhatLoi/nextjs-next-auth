import { auth, signOut } from "@/auth";
import { Button } from "@mui/material";
import React from "react";

const SettingPage = async () => {
  const session = await auth();
  return (
    <div>
      {JSON.stringify(session)}
      <form
        action={async () => {
          "use server";
          await signOut();
        }}
      >
        <Button type="submit">logout</Button>
      </form>
    </div>
  );
};

export default SettingPage;
