import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { CheckSession } from './checkSession';
/**
 * 
 * @returns thsi Decoratore still does not work !
 */
export const WithSession = () => {
  return function(target: any, key: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;

    descriptor.value = function (...args: any[]) {
        if (CheckSession()(args[2], args[3], args[4])!== null) { // Pass ExecutionContext args
        return originalMethod.apply(this, args);
      } else {
        throw new Error('Session not found');
      }
    }

    return descriptor;
  }
}