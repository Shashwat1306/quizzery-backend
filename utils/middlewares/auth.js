import { verifyToken } from "../services/token";
export const auth=(req,res,next)=>{
    const token=req.headers['authorization'];
    console.log('token is', token);
    if(!token) {
        return res.status(401).json({message:'Unauthorized access'});
    }
    else{
        try{
            const email=verifyToken(token);
            next();
        }
        catch(err) {
            res.status(401).json({message:'Unauthorized access'});
        }
    }
}