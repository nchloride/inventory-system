import NavigationBar from "../components/Admin/NavigationBar";

export const Layout = ({children})=>{

    return (
        <div className="layout">
            <NavigationBar/>
            {children}
        </div>
    )  
}

export default Layout;