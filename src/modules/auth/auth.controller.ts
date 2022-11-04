import { Body, Controller, Post } from '@nestjs/common';
import { UserDto } from '../users/dto/createUser.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  async userAuth(@Body() user: UserDto) {
    return this.authService.login(user);
  }
}
