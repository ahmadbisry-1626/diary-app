import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";

@Injectable()
export class RefreshGuard implements CanActivate {
    constructor(private jwtService: JwtService) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest()
        const token = this.extractFromTheHeader(request)

        if (!token) throw new UnauthorizedException('Token not found')

        try {
            const payload = await this.jwtService.verifyAsync(token, {
                secret: process.env.jwtRefreshTokenKey
            });

            request['user'] = payload
        } catch {
            throw new UnauthorizedException('Token is invalid')
        }

        return true;
    }

    private extractFromTheHeader(request: Request) {
        const authorizationHeader = request.headers.authorization;

        if (!authorizationHeader) {
            return undefined; // or throw an error if appropriate
        }

        const [type, token] = authorizationHeader.split(' ') ?? [];

        return type === 'Refresh' ? token : undefined;
    }
}