import conectToBd from "../config/dbConfig.js";
import {ObjectId} from "mongodb";

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

export async function updateNewPost(id, newPost){
    const db = connection.db("instanode");
    const data = db.collection("posts");
    const objId = ObjectId.createFromHexString(id);
    return data.updateOne({_id: new ObjectId(objId)}, {$set:newPost});
}