import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from "@nestjs/common";
import { Observable } from "rxjs";
import { JwtService } from "@nestjs/jwt";
import { InjectModel } from "@nestjs/sequelize";
import { Staff } from "src/staffs/models/staff.model";
@Injectable()
export class CreatorGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    
    const token = request.cookies["refresh_token"];
    
    if (!token) {
        throw new UnauthorizedException("Refresh token topilmadi");
    }
    
    let payload;
    let user;
    try {
        payload = this.jwtService.verify(token, {
          secret: process.env.JWT_REFRESH_SECRET || "super-refresh-secret",
        });
    } catch (error) {
        console.log(error);
        
      throw new UnauthorizedException("Yaroqsiz token");
    }
      if (payload.role === "creator") {
        return true;
      } else {
        throw new UnauthorizedException("Admin roli kerak");
      }
  }
}
