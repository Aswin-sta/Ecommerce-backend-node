import { NextFunction,urlencoded } from 'express';
import { Request, Response   } from 'express';
import jwt  from 'jsonwebtoken';

const verifyJWT=(req:Request,res:Response,next:NextFunction)=>{
    try{
    let token  = req.headers.authorization;
  const secret_key='your-secret-key'
    // Check if the token is present in the header
    if (!token) {
        return res.status(401).json({ error: 'Unauthorized - Token not provided' });
    }    
    let processedToken = token.split('Bearer ')[1];

    const decoded:jwt.JwtPayload =jwt.verify(processedToken,secret_key) as jwt.JwtPayload

    req.body.jwt_decoded=decoded;
    let version=req.baseUrl

    if ((version === '/api/v1' && decoded.client_type !== 'supplier')
    ||(version === '/api/v2' && decoded.client_type !== 'customer')) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    next();
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

export default verifyJWT