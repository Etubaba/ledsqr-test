import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

describe('AuthController', () => {
  let controller: AuthController;
  let service: AuthService;

  // const mockAuthService = {
  //   createUser: jest.fn((dto) => {
  //     return {
  //       email: dto.email,
  //       password: dto.password,
  //       ...dto,
  //     };
  //   }),
  // };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [AuthService],
    })
      // .overrideProvider(AuthService)
      // .useValue(mockAuthService)
      .compile();
    service = module.get<AuthService>(AuthService);
    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  //accept user data for authentification
  // it('should receive request to authentificate user', async () => {
  //   const userDto = {
  //     email: 'etubaba@gmail.com',
  //     password: '123456',
  //   };
  //   expect(controller.userAuth(userDto));
  // });
});
