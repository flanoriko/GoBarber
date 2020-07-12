import User from '../models/Users';
import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import authConfig from '../config/auth';

interface Request {
    password: string;
    email: string;
} /*DTO que recebe info*/

class CreateUserSessionService {

    public async execute({ password, email }: Request): Promise<{ user: User, token: string }> {
        const usersRepository = getRepository(User);

        const user = await usersRepository.findOne({
            where: { email }
        });

        if (!user) {
            throw new Error('Invalid Email/Password');
        };

        const PasswordOk = await compare(password, user.password);

        if (!PasswordOk) {
            throw new Error('Invalid Email/Password');
        };
       
        const {secret, expiresIn} = authConfig.jwt;

        const token = sign({}, secret, {
            subject: user.id,
            expiresIn
        })

        return { user, token };
    }

}

export default CreateUserSessionService;