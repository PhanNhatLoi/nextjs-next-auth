"use client";
import {
  Alert,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { Formik } from "formik";
import React, { useState } from "react";
import * as Yup from "yup";
import { registerApi } from "../actions/register";
import { useRouter } from "next/navigation";

const RegisterPage = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const schema = Yup.object({
    email: Yup.string().email("email validate").required("required field"),
    password: Yup.string()
      .required("field required")
      .min(6, "password min 6 characters"),
    confirmPassword: Yup.string().when("password", {
      is: (val: string) => (val && val.length > 0 ? true : false),
      then: () =>
        Yup.string().oneOf([Yup.ref("password")], "password not match"),
    }),
  });
  return (
    <Container
      sx={{
        mt: 3,
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
        flexWrap: "wrap",
      }}
    >
      <Grid sx={{ width: "100%", textAlign: "center" }}>
        <Typography fontSize={30}>Register</Typography>
      </Grid>
      <Formik
        initialValues={{ email: "", password: "", confirmPassword: "" }}
        onSubmit={(values, actions) => {
          setLoading(true);
          registerApi({ email: values.email, password: values.password })
            .then((res: any) => {
              if (!res.status) {
                actions.setErrors(res.content.errors);
              } else {
                router.push("/login");
              }
            })
            .catch((err) => console.log(err))
            .finally(() => {
              setLoading(false);
            });
        }}
        validationSchema={schema}
      >
        {(props) => (
          <form onSubmit={props.handleSubmit}>
            <Grid
              width={"100%"}
              sx={{
                justifyContent: "center",
                alignItems: "center",
                display: "flex",
                flexWrap: "wrap",
              }}
            >
              <TextField
                variant="outlined"
                size="small"
                label="email"
                fullWidth
                onChange={(e) => {
                  props.setFieldValue("email", e.target.value);
                }}
                sx={{ mb: "10px" }}
                error={Boolean(props.errors.email)}
              />

              <TextField
                variant="outlined"
                size="small"
                label="password"
                fullWidth
                type="password"
                onChange={(e) => {
                  props.setFieldValue("password", e.target.value);
                }}
                sx={{ mb: "10px" }}
                error={Boolean(props.errors.password)}
              />

              <TextField
                variant="outlined"
                size="small"
                label="confirm password"
                fullWidth
                type="password"
                onChange={(e) => {
                  props.setFieldValue("confirmPassword", e.target.value);
                }}
                sx={{ mb: "10px" }}
                error={Boolean(props.errors.confirmPassword)}
              />

              <Button
                disabled={loading}
                fullWidth
                type="submit"
                variant="contained"
              >
                Register
              </Button>
              {Object.values(props.errors).length > 0 && (
                <Alert style={{ marginTop: "20px" }} severity="error">
                  {Object.values(props.errors).join(", ")}
                </Alert>
              )}
            </Grid>
          </form>
        )}
      </Formik>
    </Container>
  );
};

export default RegisterPage;
