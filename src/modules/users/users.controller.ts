import { Body, Controller, Post, Get } from '@nestjs/common';
import { NewUser } from './dto/createUser.dto';
import { UsersService } from './users.service';

@Controller('user')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  //create user controller
  @Post('/create')
  async createUser(@Body() user: NewUser) {
    return await this.userService.createUser(user);
  }

  //get all user controller
  @Get('/all')
  async getAllUsers() {
    return await this.userService.getAllUsers();
  }
}
