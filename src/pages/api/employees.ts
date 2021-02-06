import {NextApiRequest,NextApiResponse} from "next";
import nc from "next-connect"
export default async function (req:NextApiRequest,res:NextApiResponse){
    res.json({message:"Working!"})

}