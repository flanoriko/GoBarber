import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import authConfig from '../config/auth';

import AppErrors from '../errors/AppError';

interface TokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

export default function ensureAuth(request: Request, response: Response, next: NextFunction): void {
  const authHeader = request.headers.authorization;
  if (!authHeader) {
    throw new AppErrors('INVALID JWT',401);
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
    throw new AppErrors('INVALID JWT TOKEN!!',401)
  }

}