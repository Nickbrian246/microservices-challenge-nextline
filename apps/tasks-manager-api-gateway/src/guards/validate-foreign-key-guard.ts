import {
  Injectable,
  CanActivate,
  ExecutionContext,
  BadRequestException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { catchError } from 'rxjs/operators';
import { lastValueFrom } from 'rxjs';
import { HandlerMicroServiceErrors } from '../utils/custom-error-handler';

@Injectable()
export class ValidateForeignKey implements CanActivate {
  constructor(
    private usersService: UsersService,
    private microserviceErrorHandler: HandlerMicroServiceErrors,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { userId } = request.body;

    if (!userId) {
      throw new BadRequestException('User ID not provided in request body');
    }

    try {
      const user = await lastValueFrom(
        this.usersService.getUserById(userId).pipe(
          catchError((err) => {
            throw this.microserviceErrorHandler.handleError(err);
          }),
        ),
      );

      if (!user.data) {
        throw new BadRequestException('User not found');
      }

      return true;
    } catch (error) {
      throw this.microserviceErrorHandler.handleError(error);
    }
  }
}
