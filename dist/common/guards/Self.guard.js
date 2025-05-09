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
exports.SelfOrStaffGuard = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
let SelfOrStaffGuard = class SelfOrStaffGuard {
    jwtService;
    constructor(jwtService) {
        this.jwtService = jwtService;
    }
    async canActivate(context) {
        const req = context.switchToHttp().getRequest();
        const token = req.cookies["access_token"];
        if (!token) {
            throw new common_1.UnauthorizedException("Access token mavjud emas (cookie)");
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
            throw new common_1.ForbiddenException("Sizga bu amalga ruxsat yo‘q");
        }
        catch (error) {
            console.log(error);
            throw new common_1.UnauthorizedException("Yaroqsiz yoki muddati o‘tgan token");
        }
    }
};
exports.SelfOrStaffGuard = SelfOrStaffGuard;
exports.SelfOrStaffGuard = SelfOrStaffGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService])
], SelfOrStaffGuard);
//# sourceMappingURL=Self.guard.js.map