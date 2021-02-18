import React from 'react';
import Link from "next/link";
import {useRouter} from "next/router";
// import "../styles/nav.css";
const navLinks = [
    {
        name:'Branch',
        url:"branch"
    },
    {
        name:'Employees',
        url:"employees"
    },
    {
        name:'Attendance',
        url:"attendance"
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
    
    

    return (
        <ul className="side_navigation_bar">
            {navLinks.map((navLink,index)=>{
                const isActive:string = router.pathname===`/admin/${navLink.url}` ? "activeLink" : "";
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