import express from "express";

const checkQuery = ((req: express.Request, res: express.Response, next: express.NextFunction) => {
    if (req.query.name) {
        next()
    }else{
        res.status(404).json("Do not have query")
    }
})
export default checkQuery