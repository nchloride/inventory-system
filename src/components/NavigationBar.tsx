import React, { useEffect } from 'react';
import Link from "next/link";
import {useRouter} from "next/router";
// import "../styles/nav.css";
const navLinks = [
    {
        name:"Dashboard",
        url:""
    },
    {
        name:'Branch',
        url:"branch"
    },
    {
        name:'Employees',
        url:"employees"
    },
    {
        name:'Inventory',
        url:"inventory"
    },
    {
        name:'Records',
        url:"records"
    }
]
export const NavigationBar = () => {
    const router = useRouter();
    
    useEffect(()=>{
        console.log(router.pathname);
        
    },[])

    return (
        <ul className="side_navigation_bar">
            {navLinks.map((navLink,index)=>{
                const isActive:string = router.pathname===`/admin/${navLink.url}`  ? "activeLink" : "";
                return(
                    <li key={index} className={isActive}>
                        <Link href={`/admin/${navLink.url}`}>
                            <a>{navLink.name}</a>
                        </Link>
                    </li>
                )
           
            })}
        </ul>
    )
}
export default NavigationBar;