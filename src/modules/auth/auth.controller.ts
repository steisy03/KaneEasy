import { Controller, Post, Get, Body, Request, UseGuards, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { CreateUserDto } from '../../common/dto/create-user.dto';

@Controller({path: 'auth', version: '1' }) 
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('user')
  async register(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto);
  }

  @Post()
  async login(@Body() body: { email: string; password: string }) {
    const user = await this.authService.validateUser(body.email, body.password);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return this.authService.login(user);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  getLoginUser(@Request() req) {
    return req.user;
  }
}
