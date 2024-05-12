import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { LoginDto } from './dto/auth.dto';
import { compare } from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService
    ) { }

    async validateusr(userLogin: LoginDto) {
        const userEmail = await this.userService.findByEmail(userLogin.email)

        if (userEmail && (await compare(userLogin.password, userEmail.password))) {
            const { password, ...result } = userEmail

            return result;
        }

        throw new UnauthorizedException('Invalid credentials')
    }

    async login(userLogin: LoginDto) {
        const user = await this.validateusr(userLogin)

        const payload = {
            email: user.email,
            sub: {
                firstName: user.firstName,
                lastName: user.lastName
            }
        }

        return {
            user,
            backendToken: {
                accessToken: await this.jwtService.signAsync(payload, {
                    expiresIn: '5h',
                    secret: process.env.jwtSecretKey
                }),
                refreshToken: await this.jwtService.signAsync(payload, {
                    expiresIn: '7d',
                    secret: process.env.jwtRefreshTokenKey
                })
            }
        }
    }

    async refreshToken(user: any) {
        const payload = {
            email: user.email,
            sub: user.sub
        }
        
        return {
            accessToken: await this.jwtService.signAsync(payload, {
                expiresIn: '5h',
                secret: process.env.jwtSecretKey
            }),
            refreshToken: await this.jwtService.signAsync(payload, {
                expiresIn: '7d',
                secret: process.env.jwtRefreshTokenKey
            })
        }
    }
}
