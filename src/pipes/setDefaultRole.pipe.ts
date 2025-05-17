import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';
import { Role } from 'src/enums/roles.enum';
import { createUserDto } from 'src/modules/users/dtos/createUser.dto';

@Injectable()
export class SetDefaultRolePipe implements PipeTransform {
  transform(value: createUserDto, metadata: ArgumentMetadata) {
    if (!value.administrator) {
      value.administrator = Role.User; // Asignar valor por defecto
    }
    return value;
  }
}