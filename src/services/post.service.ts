import express from 'express';
import * as fs from 'fs';
import * as path from 'path';
const pathPosts = path.join("public/posts.json");
class PostService {
    constructor(){
    }
    getUserPosts(req: express.Request, res: express.Response){
        const id = +req.params.id;
        const result:string =  fs.readFileSync(pathPosts, 'utf8').toString();
        const data = JSON.parse(result);
        const newData = data.filter((item:any)=> item.userId === id)
        res.status(200).json(newData);
    }
    postNewUserPosts(req: express.Request, res: express.Response){
        const id = +req.params.id;
        const result:string =  fs.readFileSync(pathPosts, 'utf8').toString();
        const data = JSON.parse(result);
        const body = req.body
        data.push({
            ...body,
            id:data[data.length - 1].id + 1,
            userId: id
        })
        fs.writeFileSync(pathPosts, JSON.stringify(data))
        res.status(201).json("Create user-posts successfully")
    }
}

export default PostService