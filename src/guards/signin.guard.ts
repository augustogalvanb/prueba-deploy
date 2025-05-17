import { CanActivate, ExecutionContext, HttpException, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class Signin implements CanActivate {
    constructor(private readonly jwtService: JwtService) {}
    async canActivate(context: ExecutionContext): Promise<boolean>  {
        // obtener el objeto request
        const request = context.switchToHttp().getRequest();
        const token = request.headers['authorization']?.split(' ')[1]
        if(!token) { throw new UnauthorizedException('Bearer token no encontrado')}
        try {
            const secret = process.env.JWT_SECRET
            const payload = await this.jwtService.verifyAsync(token, { secret })
            payload.iat = new Date(payload.iat * 1000) //se multiplica por 1000 para convertirlo a milisegundos
            payload.exp = new Date(payload.exp * 1000)
            request.user = payload
            return true
        } catch (error) {
            throw new HttpException({
                status: 401,
                error: "Invalid token"
            },
            401)
        }
    }
}