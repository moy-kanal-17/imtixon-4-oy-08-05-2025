"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StaffGuard = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
let StaffGuard = class StaffGuard {
    jwtService;
    constructor(jwtService) {
        this.jwtService = jwtService;
    }
    canActivate(context) {
        const request = context.switchToHttp().getRequest();
        const token = request.cookies["refresh_token"];
        if (!token) {
            throw new common_1.UnauthorizedException("Refresh token topilmadi");
        }
        let payload;
        try {
            payload = this.jwtService.verify(token, {
                secret: process.env.JWT_REFRESH_SECRET || "super-refresh-secret",
            });
        }
        catch (error) {
            console.log(error);
            throw new common_1.UnauthorizedException("Yaroqsiz token");
        }
        if (payload.role === "admin" || payload.role === "staff") {
            return true;
        }
        else {
            throw new common_1.UnauthorizedException("Staff yoki admin roli kerak");
        }
    }
};
exports.StaffGuard = StaffGuard;
exports.StaffGuard = StaffGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService])
], StaffGuard);
//# sourceMappingURL=staffs.guard%20copy.js.map