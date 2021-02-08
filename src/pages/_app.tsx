import '../styles/globals.css';
import Layout from "../Layouts/Layout";
import "./global-styles/nav.css";
import "./global-styles/layout.css";
import "./global-styles/branch/table.css";
import "./global-styles/branch/index.css";
function MyApp({ Component, pageProps }) {
 
  return (
    <Layout>
          <Component {...pageProps} />
    </Layout>
   )
}

export default MyApp
