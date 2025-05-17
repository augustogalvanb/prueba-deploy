import { Test } from '@nestjs/testing';
import { UsersService } from './users.service';
import { UsersRepository } from './users.repository';
import { createUserDto } from './dtos/createUser.dto';
import { Role } from '../../enums/roles.enum';

describe('usersService', () => {
    let usersService: UsersService;

    const mockUser: createUserDto = {
        name: "marcelo",
        email: "marcelo@gmail.com",
        password: "Marcelo123!",
        confirmPassword: "Marcelo123!",
        phone: 65465487,
        country: "argentina",
        address: "calle falsa 123",
        city: "salta",
        administrator: Role.User
    }

    beforeEach(async () => {
    const mockUsersRepository: Partial<UsersRepository> = {
        signup: (user: createUserDto): Promise<string> => Promise.resolve("usuario creado con éxito")
    } 
    const module = await Test.createTestingModule({
        providers: [UsersService,{
            provide: UsersRepository,
            useValue: mockUsersRepository
        }]
    }).compile()
    usersService = module.get<UsersService>(UsersService);
    });


    it('crear una instancia de usersService', async () => {
        expect(usersService).toBeDefined();
    });

    it('crea un nuevo usuario', async () => {
        const user = await usersService.signup(mockUser)
        expect(user).toBeDefined();
    });
  
});