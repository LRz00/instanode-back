import express from "express";
import multer from "multer";
import { createPost, listPosts, uploadImg } from "../controllers/postsController.js";

const upload = multer({dest:"./uploads"})

const routes = (app) => {
    app.use(express.json());

    app.get("/posts", listPosts);

    app.post("/posts", createPost);

    app.post("/upload", upload.single("image"), uploadImg)
}

export default routes;
