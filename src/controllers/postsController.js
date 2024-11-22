import fs from "fs";
import {getAllPosts,  createNewPost, updateNewPost } from "../models/postModel.js"
import generateDescriptionWithGemini from "../services/geminiService.js";

export async function listPosts(req, res) {
    const posts = await getAllPosts();
    res.status(200).json(posts);
}

export async function createPost(req, res){
    const newPost = req.body;
    try{
        const createdPost = await createNewPost(newPost);
        res.status(200).json(createdPost);
    } catch(exception){
        console.error(exception.message);
        res.status(500).json({"Error": "Falha de requisição"});
    }
}

export async function uploadImg(req, res){
    const newPost = {
        description: "",
        imgUrl: req.file.originalname,
        alt:""
    }
    try{
        const createdPost = await createNewPost(newPost);
        const updatedImg = `uploads/${createdPost.insertedId}.png`;
        fs.renameSync(req.file.path, updatedImg);
        res.status(200).json(createdPost);
    } catch(exception){
        console.error(exception.message);
        res.status(500).json({"Error": "Falha de requisição"});
    }
}

export async function updatePost(req, res){
    const id = req.params.id;
    const urlImg = `http://localhost:3000/${id}.png`;  

 
    try{
        const imgBuffer = fs.readFileSync(`uploads/${id}.png`);
        const description = await generateDescriptionWithGemini(imgBuffer);

        const post ={
            imgUrl: urlImg,
            description: description,
            alt: req.body.alt
        }
        const createdPost = await updateNewPost(id ,post);
        res.status(200).json(createdPost);
    } catch(exception){
        console.error(exception.message);
        res.status(500).json({"Error": "Falha de requisição"});
    }
}