import "styles/index.css";
import Layout from "components/Layout/Layout";
import { ReactQueryConfigProvider } from "react-query";

function MyApp({ Component, pageProps }) {
  const queryConfig = { refetchAllOnWindowFocus: false, staleTime: Infinity };

  return (
    <ReactQueryConfigProvider config={queryConfig}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ReactQueryConfigProvider>
  );
}

export default MyApp;
