import { QueryFailedError } from 'typeorm';
import { CustomException } from '../utils/custom-exception';

export function errorHandler() {
  return (
    target: any,
    propertyKey: any,
    propertyDescriptor: PropertyDescriptor,
  ) => {
    const originalMethod = propertyDescriptor.value;
    propertyDescriptor.value = async function (...args: any[]) {
      try {
        return await originalMethod.apply(this, args);
      } catch (error) {
        if (error instanceof QueryFailedError) {
          throw new CustomException(
            `${error.driverError.code}, ${error.message}`,
          );
        }
        console.log('manejador de errores', { error });
        throw new CustomException('bad request');
      }
    };
  };
}
