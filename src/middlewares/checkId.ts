import express from "express";

const checkId = ((req: express.Request, res: express.Response, next: express.NextFunction) => {
    if (req.params.id) {
        next()
    }else{
        res.status(404).json("Do not have id")
    }
})
export default checkId