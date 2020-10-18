import ListProviderDayAvailabilityService from '@modules/appointments/services/ListProviderDayAvailibilityService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class ProviderDayAvailabilityController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { day, year, month } = request.body;
    const { provider_id } = request.params;

    const listProviderDayAvailabilityService = container.resolve(
      ListProviderDayAvailabilityService,
    );
    const providers = await listProviderDayAvailabilityService.execute({
      day,
      month,
      year,
      provider_id,
    });

    return response.json(providers);
  }
}
