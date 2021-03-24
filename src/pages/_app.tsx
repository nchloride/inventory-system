import '../styles/globals.css';
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
import "./global-styles/employees/form.css";
//Inventory Styles
import "./global-styles/inventory/index.css"
//Dashboard Styles
import "./global-styles/dashboard/dashboard.css"
//Login Form 
import "./global-styles/login.css"
//Modal
import "./global-styles/modal.css"

import { Provider } from "next-auth/client"

function MyApp({ Component, pageProps }) {

  return (
      <Component {...pageProps} />
   )
}

export default MyApp
