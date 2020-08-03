import buildClient from "../api/build-client";
import Header from "../components/header";
import React from "react";
import Head from "next/head";
import { ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import theme from "../src/theme";

const appComponent = ({ Component, pageProps, currentUser }) => {
  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);
  function Copyright() {
    return (
      <Typography variant="body2" color="textSecondary" align="center">
        {"Copyright © "}
        <Link color="inherit" href="#">
          GetTix
        </Link>
        {" " + new Date().getFullYear()}
        {"."}
      </Typography>
    );
  }
  return (
    <React.Fragment>
      <Head>
        <title>GetTix</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
     
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Header currentUser={currentUser} />
        <Component currentUser={currentUser} {...pageProps} />
        <Box mt={8} style={{ position: "absolute", bottom: 0, left: "45%" }}>
          <Copyright />
        </Box>
      </ThemeProvider>
    </React.Fragment>
  );
};

appComponent.getInitialProps = async (appContext) => {
  const client = buildClient(appContext.ctx);
  const { data } = await client.get("/api/users/currentuser");

  let pageProps = {};
  if (appContext.Component.getInitialProps) {
    pageProps = await appContext.Component.getInitialProps(
      appContext.ctx,
      client,
      data.currentUser
    );
  }

  return { pageProps, ...data };
};

export default appComponent;
