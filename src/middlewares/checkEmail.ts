import express from "express";
import * as fs from "fs";
import * as path from "path";
const pathUser = path.join("public/users.json");

const checkEmail = ((req: express.Request, res: express.Response, next: express.NextFunction) => {
    const result:string =  fs.readFileSync(pathUser, 'utf8').toString();
    const data = JSON.parse(result);
    const email:string = req.body.email;
    const regex = new RegExp("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z]{2,}$");
    const isValid = regex.test(email);
    const user = data.find((item:any)=> item.email === email)
    if (!isValid && email.length > 0) {
        res.status(400).json("Your email error syntax")
    }else if(user){
        res.status(400).json('Email has been exist')
    }else{
        next()
    }
})
export default checkEmail