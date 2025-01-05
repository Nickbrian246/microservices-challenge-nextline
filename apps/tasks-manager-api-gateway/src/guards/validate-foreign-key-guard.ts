import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
} from '@nestjs/common';
import { lastValueFrom } from 'rxjs';
import { UsersService } from '../users/users.service';

@Injectable()
export class ValidateForeignKey implements CanActivate {
  constructor(private usersService: UsersService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { userId } = request.body;
    if (!userId) {
      throw new BadRequestException('User ID not provided in request body');
    }

    const user = await lastValueFrom(this.usersService.getUserById(userId));

    if (!user.data) {
      throw new BadRequestException('User not found');
    }

    return true;
  }
}
