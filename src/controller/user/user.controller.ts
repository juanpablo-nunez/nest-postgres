import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  ParseUUIDPipe,
  HttpStatus,
} from '@nestjs/common';
import { UserService } from '../../service/user/user.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from 'src/dto/create-user.dto';
import { UpdateUserDto } from 'src/dto/update-user.dto';
import { ResponseCustom } from 'src/utils/response/response';

@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {
    this.findAll();
  }

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    // const response = await this.userService.create(createUserDto);
    // return new ResponseCustom(HttpStatus.CREATED, response);
    return this.userService.create(createUserDto);
  }

  @Get()
  async findAll() {
    const response = await this.userService.findAll();
    return new ResponseCustom(HttpStatus.OK, response);
    // return this.userService.findAll();
  }

  @Get('/:id')
  async findById(@Param('id', ParseUUIDPipe) id: string) {
    const response = await this.userService.findUserById(id);
    return new ResponseCustom(HttpStatus.OK, response);
    // return this.userService.findUserById(id);
  }

  @Patch('/:id')
  updateUser(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() userData: UpdateUserDto,
  ) {
    return this.userService.updateUser(id, userData);
  }

  @Delete('/:id')
  deleteUser(@Param('id', ParseUUIDPipe) id: string) {
    return this.userService.deleteUser(id);
  }
}
