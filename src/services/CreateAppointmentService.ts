import Appointment from '../models/Appointment';
import AppointmentsRepository from '../repositories/AppointmentsRepository';
import { startOfHour } from "date-fns";
import {getCustomRepository} from 'typeorm';
import AppErrors from '../errors/AppError';
interface Request {
    provider_id: string;
    date: Date;
} /*DTO que recebe info*/

class CreateAppointmentService {
   
    public async execute({ provider_id, date }: Request): Promise<Appointment> {
        const appointmentsRepository = getCustomRepository(AppointmentsRepository);
        const appointmentDate = startOfHour(date);
        const findAppointmentIsSameDate = await  appointmentsRepository.findByDate(appointmentDate);

        if (findAppointmentIsSameDate) {
            throw new AppErrors('Já existe agendamento para este horario');
        };
        const appointment = appointmentsRepository.create({
            provider_id,
            date: appointmentDate
        });
        
        await appointmentsRepository.save(appointment);

        return appointment;
    }

}

export default CreateAppointmentService;