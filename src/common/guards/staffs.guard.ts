import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from "@nestjs/common";
import { Observable } from "rxjs";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class StaffGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    
    const token = request.cookies["access_token"];
    
    if (!token) {
        throw new UnauthorizedException("ACCESS token topilmadi");
    }
    
    let payload;
    try {
        payload = this.jwtService.verify(token, {
          secret: process.env.JWT_ACCESS_SECRET || "super-refresh-secret",
        });
    } catch (error) {
        console.log(error);
        
      throw new UnauthorizedException("Yaroqsiz token");
    }
      if (payload.role === "admin" || payload.role === "staff" || payload.role === 'creator') {
        return true;
      } else {
        throw new UnauthorizedException("Staff yoki admin roli kerak");
      }
  }
}
