/**
 * A decorator that enforces a time limit on the execution of an async method.
 * If the method does not complete within the specified time limit, it will be rejected.
 *
 * @param {number} milliseconds - The time limit in milliseconds.
 * @returns {MethodDecorator} The method decorator.
 */
export function Timeout(milliseconds: number): MethodDecorator {
    return function (target: any, propertyKey: string | symbol, descriptor: PropertyDescriptor): PropertyDescriptor {
        const originalMethod = descriptor.value;

        descriptor.value = function (...args: any[]): any {
            if (originalMethod.constructor.name === 'AsyncFunction') {
                // If the original method is async, return a promise
                return new Promise(async (resolve, reject) => {
                    try {
                        const result = await Promise.race([
                            originalMethod.apply(this, args),
                            new Promise((_, reject) => setTimeout(() => reject(new Error(`${String(propertyKey)} timed out`)), milliseconds))
                        ]);
                        resolve(result);
                    } catch (error) {
                        reject(error);
                    }
                });
            } else {
                // If the original method is synchronous, execute it directly
                try {
                    return originalMethod.apply(this, args);
                } catch (error) {
                    throw error;
                }
            }
        };

        return descriptor;
    };
}
