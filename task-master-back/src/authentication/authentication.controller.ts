import { AuthDto } from './dto/auth-dto';
import { UsersService } from 'src/users/users.service';
import { Body, Controller, Post } from '@nestjs/common';

@Controller('authentication')
export class AuthenticationController {
  constructor(private authService: UsersService) {}

  @Post('/login')
  async login(@Body() authDto: AuthDto): Promise<any> {
    return this.authService.queryLogin(authDto);
  }
}
