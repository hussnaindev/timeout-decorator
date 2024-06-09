/**
 * A decorator that enforces a time limit on the execution of an async method.
 * If the method does not complete within the specified time limit, it will be rejected.
 *
 * @param {number} milliseconds - The time limit in milliseconds.
 * @returns {MethodDecorator} The method decorator.
 */
function Timeout(milliseconds: number): MethodDecorator {
    return function (target: any, propertyKey: string | symbol, descriptor: PropertyDescriptor): PropertyDescriptor {
        const originalMethod = descriptor.value;

        descriptor.value = async function (...args: any[]): Promise<any> {
            return Promise.race([
                originalMethod.apply(this, args),
                new Promise((_, reject) => setTimeout(() => reject(new Error(`${String(propertyKey)} timed out`)), milliseconds))
            ]);
        };

        return descriptor;
    };
}

