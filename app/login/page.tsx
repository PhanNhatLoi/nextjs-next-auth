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
import { loginApi } from "../actions/login";
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const schema = Yup.object({
    email: Yup.string().email("email invalid!").required("require field"),
    password: Yup.string().required("require field").min(6, "min 6 characters"),
  });
  return (
    <Container
      sx={{
        mt: 3,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexWrap: "wrap",
      }}
    >
      <Grid sx={{ width: "100%", textAlign: "center" }}>
        <Typography fontSize={30}>Login</Typography>
      </Grid>
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={(values, actions) => {
          setLoading(true);
          loginApi({ email: values.email, password: values.password })
            .then((res) => {
              console.log(res, 1234);
              // router.push("/");
            })
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

              <Button
                disabled={loading}
                fullWidth
                type="submit"
                variant="contained"
              >
                Login
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

export default LoginPage;
