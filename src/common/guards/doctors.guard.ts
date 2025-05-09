import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";


@Injectable()
export class DoctorsGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService


  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest<Request>();
    const token = req.cookies["access_token"];
    if (!token) {
      throw new UnauthorizedException("Access token mavjud emas (cookie)");
    }

    let payload ;
    let user;
    try {
        payload = await this.jwtService.verifyAsync(token);
    } catch (err) {
      console.log(err);
      throw new UnauthorizedException("Token noto‘g‘ri yoki eskirgan");
    }

      if (payload.role !== "doctor" && payload.role !== "staff" && payload.role !== "admin" &&payload.role !== "creator") {
        throw new UnauthorizedException(
          "Faqat doctor yoki staff kirishi mumkin"
        );
      }

      req["user"] = payload;
      return true;
    
  }
}
