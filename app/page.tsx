// "use client";
import { auth } from "@/auth";
import { Container } from "@mui/material";
import React from "react";

const HomePage = async () => {
  // const session = await auth();
  return (
    <Container sx={{ mt: 3 }}>
      HomePage
      {/* <div>{JSON.stringify(session)}</div> */}
    </Container>
  );
};

export default HomePage;
