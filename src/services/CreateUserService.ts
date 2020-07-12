import User from '../models/Users';
import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';

interface Request {
    name: string;
    password: string;
    email: string;
} /*DTO que recebe info*/

class CreateUserService {

    public async execute({ name, password, email }: Request): Promise<User> {
        const usersRepository = getRepository(User);

        const emailExists = await usersRepository.findOne({
            where: { email }
        })

        if (emailExists) {
            throw new Error('Email already used');
        }

        const criptPass = await hash(password, 8);

        const user = usersRepository.create({
            name, password: criptPass, email
        });

        await usersRepository.save(user);

        return user;
    }

}

export default CreateUserService;