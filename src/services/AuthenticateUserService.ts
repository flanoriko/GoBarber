import User from '../models/Users';
import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import authConfig from '../config/auth';
import AppErrors from '../errors/AppError';

interface Request {
    password: string;
    email: string;
} /*DTO que recebe info*/

class AuthenticateUserService {

    public async execute({ password, email }: Request): Promise<{ user: User, token: string }> {
        const usersRepository = getRepository(User);

        const user = await usersRepository.findOne({
            where: { email }
        });

        if (!user) {
            throw new AppErrors('Invalid Email/Password', 401);
        };

        const PasswordOk = await compare(password, user.password);

        if (!PasswordOk) {
            throw new AppErrors('Invalid Email/Password',401);
        };
       
        const {secret, expiresIn} = authConfig.jwt;

        const token = sign({}, secret, {
            subject: user.id,
            expiresIn
        })

        return { user, token };
    }

}

export default AuthenticateUserService;