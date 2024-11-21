import conectToBd from "../config/dbConfig.js";


const connection =  await conectToBd(process.env.CONNECTION_STRING);


export async function getAllPosts(){
    const db = connection.db("instanode");
    const data = db.collection("posts");
    return data.find().toArray(); 
}

export async function createNewPost(newPost){
    const db = connection.db("instanode");
    const data = db.collection("posts");
    return data.insertOne(newPost);
}