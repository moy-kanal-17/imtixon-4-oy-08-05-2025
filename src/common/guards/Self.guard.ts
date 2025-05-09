import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
  ForbiddenException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";

@Injectable()
export class SelfOrStaffGuard implements CanActivate {
  
  constructor(private readonly jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest<Request>();
    const token = req.cookies["access_token"]; 

    if (!token) {
      throw new UnauthorizedException("Access token mavjud emas (cookie)");
    }

    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_ACCESS_SECRET || "super-secret",
      });

      req["user"] = payload;

      const userIdFromToken = payload.sub;
      const role = payload.role;

      const targetUserId = parseInt(req.params.id, 10); 

      if (userIdFromToken === targetUserId || role === "staff" || role === "admin" || role === "creator") {
        return true;
      }

      throw new ForbiddenException("Sizga bu amalga ruxsat yo‘q");
    } catch (error) {
      console.log(error);
      throw new UnauthorizedException("Yaroqsiz yoki muddati o‘tgan token");
    }
  }
}
