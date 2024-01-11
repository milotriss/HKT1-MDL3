import express from 'express';
import * as fs from 'fs';
import * as path from 'path';

const pathUser = path.join("public/users.json");
const pathPosts = path.join("public/posts.json");

class UserService {
    constructor(){

    }
    getAllUser (req: express.Request, res: express.Response){
        const result:string =  fs.readFileSync(pathUser, 'utf8').toString();
        const data = JSON.parse(result);
        res.status(200).json(data);
    }
    getUserById (req: express.Request, res: express.Response){
        const result:string =  fs.readFileSync(pathUser, 'utf8').toString();
        const dataPosts:string = fs.readFileSync(pathPosts,'utf-8').toString();
        const id:number = +req.params.id;
        const data = JSON.parse(result);
        const posts = JSON.parse(dataPosts) 
        const user = data.find((item:any) => item.id === id);
        const post = posts.filter((item:any) => item.userId === id)

        const needUser = {
            ...user,
            post:post
        }
        res.status(200).json(needUser);
    }
    getUserByName(req: express.Request, res: express.Response){
        const result:string =  fs.readFileSync(pathUser, 'utf8').toString();
        const data = JSON.parse(result);
        const searchValue = req.query.name
        const newData = data.filter((item:any) => item.name.toLowerCase().includes(searchValue))
        res.status(200).json(newData)
    }
    postNewUser(req: express.Request, res: express.Response){
        const result:string =  fs.readFileSync(pathUser, 'utf8').toString();
        const data = JSON.parse(result);
        const body = {
            id: data[data.length - 1].id +1,
            name:req.body.name,
            username:req.body.username,
            email:req.body.email,
            address: {
                street:req.body.street,
                suite:req.body.suite,
                city:req.body.city,
                zipcode:req.body.zipcode,
                geo:{
                    lat:req.body.lat,
                    lng:req.body.lng
                }
            },
            phone:req.body.phone,
            website: req.body.website,
            company:{
                namecompany:req.body.namecompany,
                catchPhrase:req.body.catchPhrase,
                bs:req.body.bs
            }
        }
        data.push(body)
        fs.writeFileSync(pathUser, JSON.stringify(data), 'utf8')

        res.status(201).json('Create user successfully')

    }
    patchUserById(req: express.Request, res: express.Response){
        const id:number = +req.params.id;
        const result:string =  fs.readFileSync(pathUser, 'utf8').toString();
        const data = JSON.parse(result);
        const user = data.find((item:any) => item.id === id);
        user.address = {
                street:req.body.street,
                suite:req.body.suite,
                city:req.body.city,
                zipcode:req.body.zipcode,
                geo:{
                    lat:req.body.lat,
                    lng:req.body.lng
                }
            
        }
        fs.writeFileSync(pathUser, JSON.stringify(data), 'utf8')

        res.status(200).json('Address update successfully')

    }
    deleteUserById(req: express.Request, res: express.Response){
        const id:number = +req.params.id;
        const result:string =  fs.readFileSync(pathUser, 'utf8').toString();
        const data = JSON.parse(result);
        const users = data.filter((item:any) => item.id !== id);
        const dataPosts:string = fs.readFileSync(pathPosts,'utf-8').toString();
        const posts = JSON.parse(dataPosts) ;
        const post = posts.filter((item:any) => item.userId !== id);
        fs.writeFileSync(pathUser, JSON.stringify(users), 'utf8')
        fs.writeFileSync(pathPosts, JSON.stringify(post), 'utf8')
        
        res.status(200).json('Delete user and post-user successfully')
    }
}

export default UserService