"use client";
import React, { useState } from "react";
import { Formik } from "formik";
import { Button, Container, TextField, Typography } from "@mui/material";
import * as Yup from "yup";
import Link from "next/link";
import { base_url } from "@/src/config";
import { useRouter } from "next/navigation";

function Register() {
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const schema = Yup.object({
    email: Yup.string().email("email invalid").required("Required field"),
    password: Yup.string()
      .required("Required password")
      .min(6, "password min 6 characters"),
    passwordConfirm: Yup.string().when("password", {
      is: (val: string) => (val && val.length > 0 ? true : false),
      then: () =>
        Yup.string().oneOf(
          [Yup.ref("password")],
          "Password not match".toString()
        ),
    }),
  });

  return (
    <Container
      maxWidth={false}
      sx={{
        mt: 3,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexWrap: "wrap",
      }}
    >
      <Typography
        style={{ width: "100%", textAlign: "center", fontSize: "25px" }}
      >
        <span>Register</span>
      </Typography>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        <Formik
          initialValues={{ email: "", password: "", passwordConfirm: "" }}
          onSubmit={(values, actions) => {
            setLoading(true);
            fetch(`${base_url}/api/auth/register`, {
              method: "POST",
              body: JSON.stringify({
                email: values.email,
                password: values.password,
              }),
            })
              .then(async (res) => {
                const content = await res.json();
                if (res.status) {
                  router.push("/login");
                }
              })
              .finally(() => {
                setLoading(false);
              });
          }}
          validationSchema={schema}
        >
          {(props) => (
            <form onSubmit={props.handleSubmit}>
              <div className="d-flex flex-wrap" style={{ maxWidth: "600px" }}>
                <TextField
                  fullWidth
                  label="Email"
                  variant="standard"
                  name="email"
                  onChange={(val) => {
                    props.setFieldValue("email", val.target.value);
                  }}
                />

                <TextField
                  name="password"
                  fullWidth
                  label="Password"
                  variant="standard"
                  type="password"
                  onChange={(val) => {
                    props.setFieldValue("password", val.target.value);
                  }}
                />

                <TextField
                  name="passwordConfirm"
                  fullWidth
                  label="Confirm password"
                  variant="standard"
                  type="password"
                  onChange={(val) => {
                    props.setFieldValue("passwordConfirm", val.target.value);
                  }}
                />

                <Button
                  style={{ width: "100%", marginTop: "10px" }}
                  disabled={loading}
                  type="submit"
                  className="w-100 mt-3"
                  variant="contained"
                >
                  Register
                </Button>
                <Link href={"/login"}>Have acount? Login</Link>
              </div>
            </form>
          )}
        </Formik>
      </div>
    </Container>
  );
}

export default Register;
