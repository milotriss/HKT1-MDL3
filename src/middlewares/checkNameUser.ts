import express from "express";

const checkNameUser = ((req: express.Request, res: express.Response, next: express.NextFunction) => {
    let name = req.body.name;
    if (name.trim().length > 2 && name.trim().length < 21) {
        next()
    }else{
        res.status(400).json("Your name between 3 and 20 characters")
    }
})
export default checkNameUser