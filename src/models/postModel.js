import conectToBd from "../config/dbConfig.js";


const connection =  await conectToBd(process.env.CONNECTION_STRING);


async function getAllPosts(){
    const db = connection.db("instanode");
    const data = db.collection("posts");
    return data.find().toArray(); 
}

export default getAllPosts;