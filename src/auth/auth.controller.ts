import { Body, Controller, Post, Request, UseGuards, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserService } from 'src/user/user.service';
import { UserDto } from 'src/user/dto/user.dto';
import { Prisma } from '@prisma/client';
import { LoginDto } from './dto/auth.dto';
import { RefreshGuard } from './guards/refresh.guard';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly userService: UserService
    ) { }

    @Post('register')
    async register(@Body(ValidationPipe) userData: Prisma.UserCreateInput) {
        return await this.userService.create(userData)
    }

    @Post('login')
    async login(@Body(ValidationPipe) userLogin: LoginDto) {
        return await this.authService.login(userLogin)
    }

    @UseGuards(RefreshGuard)
    @Post('refresh')
    async refreshToken(@Request() req) {
        return await this.authService.refreshToken(req.user)
    }
}
