import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from "@nestjs/common";
import { Observable } from "rxjs";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();

    const token = request.cookies["access_token"];

    if (!token) {
      throw new UnauthorizedException("access token topilmadi");
    }

    let payload;
    let user;
    try {
      payload = this.jwtService.verify(token, {
        secret: process.env.JWT_ACCESS_SECRET || "super-refresh-secret",
      });
    } catch (error) {
      console.log(error);

      throw new UnauthorizedException("Yaroqsiz token");
    }
    if (payload.role === "admin" || payload.role === "creator") {
      return true;
    } else {
      throw new UnauthorizedException("Admin roli kerak");
    }
  }
}
