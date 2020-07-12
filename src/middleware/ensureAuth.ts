import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import authConfig from '../config/auth';

interface TokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

export default function ensureAuth(request: Request, response: Response, next: NextFunction): void {
  const authHeader = request.headers.authorization;
  if (!authHeader) {
    throw new Error('INVALID JWT');
  }

  const [, token] = authHeader.split(' ');
  const secret = authConfig.jwt.secret;


  try {
    const decoded = verify(token, secret);
    const { sub } = decoded as TokenPayload;
    request.user = {
      id: sub
    }
   
    return next();
  }
  catch{
    throw new Error('INVALID JWT TOKEN!!')
  }

}