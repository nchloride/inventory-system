// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import db from "../../utils/database";
import {NextApiRequest,NextApiResponse} from "next";
import nc from "next-connect"



export default async (req:NextApiRequest, res:NextApiResponse) => {
  const userPosts = db.get("userposts");
  const users  = await userPosts.find({});
  
  const {method} = req;
  
  res.statusCode = 200
  res.send(users);
}
