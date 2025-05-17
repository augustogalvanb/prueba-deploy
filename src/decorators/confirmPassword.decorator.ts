import { ValidationOptions, ValidationArguments, registerDecorator } from "class-validator"

export function ConfirmPassword(property: string, validationOptions?: ValidationOptions) {
    return function (object: any, propertyName: string) {
      registerDecorator({
        name: 'ConfirmPassword',
        target: object.constructor,
        propertyName: propertyName,
        constraints: [property],
        options: validationOptions,
        validator: {
          validate(value: any, args: ValidationArguments) {
            const relatedValue = (args.object as any)[args.constraints[0]];
            return value === relatedValue; // Aquí comparamos el valor con el de `password`
          },
          defaultMessage(args: ValidationArguments) {
            return `${args.property} no coincide con ${args.constraints[0]}`;
          },
        },
      });
    };
  }