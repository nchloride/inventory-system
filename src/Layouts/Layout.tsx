import NavigationBar from "../components/NavigationBar";

export default ({children})=>{
    return (
        <div className="layout">
            <NavigationBar/>
            {children}
        </div>
    )
    
}