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
exports.PatientGuard = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
let PatientGuard = class PatientGuard {
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
        let payload;
        try {
            payload = await this.jwtService.verifyAsync(token);
        }
        catch (err) {
            console.log(err);
            throw new common_1.UnauthorizedException("Token noto‘g‘ri yoki eskirgan");
        }
        if (payload.role !== "patient" &&
            payload.role !== "staff" &&
            payload.role !== "admin" &&
            payload.role !== "creator") {
            throw new common_1.UnauthorizedException("Faqat patient yoki staff kirishi mumkin");
        }
        req["user"] = payload;
        return true;
    }
};
exports.PatientGuard = PatientGuard;
exports.PatientGuard = PatientGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService])
], PatientGuard);
//# sourceMappingURL=patient.guard.js.map