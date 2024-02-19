"use client";
import React, { useState } from "react";
import { Formik } from "formik";
import { Alert, Button, Container, TextField, Typography } from "@mui/material";
import * as Yup from "yup";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

function Register() {
  const [loading, setLoading] = useState<boolean>(false);

  const schema = Yup.object({
    email: Yup.string().email("email invalid").required("Required field"),
    password: Yup.string()
      .required("Required password")
      .min(6, "password min 6 characters"),
  });

  const params = useSearchParams();
  const router = useRouter();
  return (
    <Container
      maxWidth={false}
      sx={{
        mt: 3,
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Typography
        style={{ width: "100%", textAlign: "center", fontSize: "25px" }}
      >
        <span>Login</span>
      </Typography>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Formik
          initialValues={{ email: "", password: "", submit: null }}
          onSubmit={async (values, actions) => {
            setLoading(true);
            signIn("credentials", {
              email: values.email,
              password: values.password,
              redirect: false,
            })
              .then((res) => {
                if (res?.ok || !res?.error) {
                  router.push(
                    params.get("callbackUrl") || DEFAULT_LOGIN_REDIRECT
                  );
                }
                if (res?.error) {
                  switch (res?.error) {
                    case "CredentialsSignin":
                      actions.setErrors({ submit: "Email or password wrong!" });
                      break;

                    default:
                      actions.setErrors({ submit: "Server error" });
                      break;
                  }
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
              <TextField
                fullWidth
                label="Email"
                variant="standard"
                name="email"
                onChange={(val) => {
                  props.setFieldValue("email", val.target.value);
                }}
                error={!!props.errors.email}
              />

              <TextField
                fullWidth
                name="password"
                label="Password"
                variant="standard"
                type="password"
                error={!!props.errors.password}
                onChange={(val) => {
                  props.setFieldValue("password", val.target.value);
                }}
              />

              {Object.values(props.errors).length > 0 && (
                <Alert style={{ marginTop: "10px" }} severity="error">
                  {Object.values(props.errors).join(", ")}
                </Alert>
              )}
              <Button
                style={{ width: "100%", marginTop: "10px" }}
                disabled={loading}
                type="submit"
                variant="contained"
              >
                Login
              </Button>
              <Link href={"/register"}>Register</Link>
            </form>
          )}
        </Formik>
      </div>
    </Container>
  );
}

export default Register;
