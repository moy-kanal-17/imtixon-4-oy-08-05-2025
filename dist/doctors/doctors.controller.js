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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DoctorsController = void 0;
const common_1 = require("@nestjs/common");
const doctors_service_1 = require("./doctors.service");
const create_doctor_dto_1 = require("./dto/create-doctor.dto");
const update_doctor_dto_1 = require("./dto/update-doctor.dto");
const swagger_1 = require("@nestjs/swagger");
const doctors_models_1 = require("./models/doctors.models");
const Self_guard_1 = require("../common/guards/Self.guard");
const patient_guard_1 = require("../common/guards/patient.guard");
const admin_guard_1 = require("../common/guards/admin.guard");
let DoctorsController = class DoctorsController {
    doctorsService;
    constructor(doctorsService) {
        this.doctorsService = doctorsService;
    }
    async create(createDoctorDto) {
        return this.doctorsService.create(createDoctorDto);
    }
    async findAll() {
        return this.doctorsService.findAll();
    }
    async findOne(id) {
        return this.doctorsService.findOne(+id);
    }
    async update(id, updateDoctorDto) {
        return this.doctorsService.update(+id, updateDoctorDto);
    }
    async findbyspec(id) {
        return this.doctorsService.findByspec(+id);
    }
    findByTime(body) {
        const { startTime, finishTime } = body;
        return this.doctorsService.findtime(startTime, finishTime);
    }
    async remove(id) {
        await this.doctorsService.remove(+id);
        return;
    }
};
exports.DoctorsController = DoctorsController;
__decorate([
    (0, swagger_1.ApiCreatedResponse)({
        description: "The record has been successfully created.",
        type: doctors_models_1.Doctor,
    }),
    (0, swagger_1.ApiBadRequestResponse)({ description: "Invalid input data." }),
    (0, common_1.UseGuards)(admin_guard_1.AdminGuard),
    (0, common_1.Post)(),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ transform: true })),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_doctor_dto_1.CreateDoctorDto]),
    __metadata("design:returntype", Promise)
], DoctorsController.prototype, "create", null);
__decorate([
    (0, swagger_1.ApiOkResponse)({ description: "List of all doctors.", type: [doctors_models_1.Doctor] }),
    (0, common_1.UseGuards)(admin_guard_1.AdminGuard),
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], DoctorsController.prototype, "findAll", null);
__decorate([
    (0, common_1.UseGuards)(Self_guard_1.SelfOrStaffGuard),
    (0, swagger_1.ApiOkResponse)({ description: "Doctor found.", type: doctors_models_1.Doctor }),
    (0, swagger_1.ApiNotFoundResponse)({ description: "Doctor not found." }),
    (0, swagger_1.ApiParam)({ name: "id", type: "number", description: "Doctor ID" }),
    (0, common_1.Get)(":id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], DoctorsController.prototype, "findOne", null);
__decorate([
    (0, swagger_1.ApiOkResponse)({ description: "Doctor updated successfully.", type: doctors_models_1.Doctor }),
    (0, swagger_1.ApiNotFoundResponse)({ description: "Doctor not found." }),
    (0, swagger_1.ApiBadRequestResponse)({ description: "Invalid input data." }),
    (0, swagger_1.ApiParam)({ name: "id", type: "number", description: "Doctor ID" }),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    (0, common_1.UseGuards)(Self_guard_1.SelfOrStaffGuard),
    (0, common_1.Patch)(":id"),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_doctor_dto_1.UpdateDoctorDto]),
    __metadata("design:returntype", Promise)
], DoctorsController.prototype, "update", null);
__decorate([
    (0, common_1.UseGuards)(patient_guard_1.PatientGuard),
    (0, common_1.Get)("spe/:id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], DoctorsController.prototype, "findbyspec", null);
__decorate([
    (0, common_1.UseGuards)(admin_guard_1.AdminGuard),
    (0, common_1.Get)("spec/3"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], DoctorsController.prototype, "findByTime", null);
__decorate([
    (0, common_1.UseGuards)(Self_guard_1.SelfOrStaffGuard),
    (0, swagger_1.ApiOkResponse)({ description: "Doctor deleted successfully." }),
    (0, swagger_1.ApiNotFoundResponse)({ description: "Doctor not found." }),
    (0, swagger_1.ApiParam)({ name: "id", type: "number", description: "Doctor ID" }),
    (0, common_1.Delete)(":id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], DoctorsController.prototype, "remove", null);
exports.DoctorsController = DoctorsController = __decorate([
    (0, swagger_1.ApiTags)("Doctors"),
    (0, common_1.Controller)("doctors"),
    __metadata("design:paramtypes", [doctors_service_1.DoctorsService])
], DoctorsController);
//# sourceMappingURL=doctors.controller.js.map