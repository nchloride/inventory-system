import Head from 'next/head'
import Login from '../components/Login';
import TokenController from "../utils/controllers/TokenController";
import {useRouter} from "next/router"
import RoutesController from "../utils/controllers/RoutesController"
import { redirect } from 'next/dist/next-server/server/api-utils';



export default function Home() {
  return (
    <Login/>
  )
}
