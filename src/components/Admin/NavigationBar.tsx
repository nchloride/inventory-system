import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from 'react';
import TokenController from '../../utils/controllers/TokenController';
import {useRouter} from "next/router";
//ICONS
import DashboardIcon from '@material-ui/icons/Dashboard';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import LocalMallIcon from '@material-ui/icons/LocalMall';
import NoteIcon from '@material-ui/icons/Note';
import PersonIcon from '@material-ui/icons/Person';
import StoreIcon from '@material-ui/icons/Store';
const navLinks = [
    {
        name:"Dashboard",
        url:"dashboard",
        Icon:DashboardIcon
    },
    {
        name:'Branch',
        url:"branch",
        Icon:StoreIcon
    },
    {
        name:'Employees',
        url:"employees",
        Icon:PersonIcon
    },
    {
        name:'Inventory',
        url:"inventory",
        Icon:LocalMallIcon
    },
    {
        name:'Records',
        url:"records",
        Icon:NoteIcon
    }
]
export const NavigationBar = () => {
    const router = useRouter();
    const [name,setName] = useState({})
    useEffect(()=>{
        console.log(router.pathname);
        if(TokenController.getCookie){
            TokenController.getCredentials().then(credential=>setName(credential))
        }
        
    },[])

    return (
        <ul className="side_navigation_bar">
            <li>
                <img src={'/FAVBurrito.jpg'} alt="FavBurrito logo" ></img>
            </li>
            {navLinks.map((navLink,index)=>{
                const isActive:string = router.pathname===`/admin/${navLink.url}`  ? "activeLink" : "";
                return(
                    <li key={index} className={isActive}>
                        <Link href={`/admin/${navLink.url}`}>
                            <a>
                                <navLink.Icon/>
                                <p>{navLink.name}</p>
                            </a>
                        </Link>
                    </li>
                )
            })}
                    <li onClick={TokenController.deleteToken}>
                        <Link href='/'>
                            <a>
                                <ExitToAppIcon/>
                                <p>Sign out</p>
                            </a>
                        </Link>
                    </li>
        </ul>
    )
}
export default NavigationBar;