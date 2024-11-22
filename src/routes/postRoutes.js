import express from "express";
import multer from "multer";
import cors from "cors";
import { createPost, listPosts, updatePost, uploadImg } from "../controllers/postsController.js";

const corsOptions = {
    origin:"http://localhost/8000",
    optionsSucessStatus: 200
}

const upload = multer({dest:"./uploads"});

const routes = (app) => {
    app.use(express.json());

    app.use(cors(corsOptions));

    app.get("/posts", listPosts);

    app.post("/posts", createPost);

    app.post("/upload", upload.single("image"), uploadImg)

    app.put("/upload/:id", updatePost);
};

export default routes;
