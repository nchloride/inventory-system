import '../styles/globals.css';
import Layout from "../Layouts/Layout";
import "./global-styles/nav.css";
import "./global-styles/layout.css";
import "./global-styles/table.css";
// Tab
import "./global-styles/tab.css";
// Form
import "./global-styles/form.css";
//Branch Styles 
import "./global-styles/branch/index.css";
import "./global-styles/branch/form.css";
//Employees Styles
import "./global-styles/employees/index.css";
function MyApp({ Component, pageProps }) {
 
  return (
    <Layout>
          <Component {...pageProps} />
    </Layout>
   )
}

export default MyApp
