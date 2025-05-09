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
exports.MedicalRecordsController = void 0;
const common_1 = require("@nestjs/common");
const medical_records_service_1 = require("./medical-records.service");
const create_medical_record_dto_1 = require("./dto/create-medical-record.dto");
const update_medical_record_dto_1 = require("./dto/update-medical-record.dto");
const swagger_1 = require("@nestjs/swagger");
const medical_record_entity_1 = require("./entities/medical-record.entity");
const doctors_guard_1 = require("../common/guards/doctors.guard");
const Self_guard_1 = require("../common/guards/Self.guard");
let MedicalRecordsController = class MedicalRecordsController {
    medicalRecordsService;
    constructor(medicalRecordsService) {
        this.medicalRecordsService = medicalRecordsService;
    }
    async create(createMedicalRecordDto) {
        return this.medicalRecordsService.create(createMedicalRecordDto);
    }
    async findAll() {
        return this.medicalRecordsService.findAll();
    }
    async findOne(id) {
        return this.medicalRecordsService.findOne(+id);
    }
    async update(id, updateMedicalRecordDto) {
        return this.medicalRecordsService.update(+id, updateMedicalRecordDto);
    }
    async remove(id) {
        await this.medicalRecordsService.remove(+id);
        return;
    }
};
exports.MedicalRecordsController = MedicalRecordsController;
__decorate([
    (0, swagger_1.ApiCreatedResponse)({
        description: "The record has been successfully created.",
        type: medical_record_entity_1.MedicalRecord,
    }),
    (0, swagger_1.ApiBadRequestResponse)({ description: "Invalid input data." }),
    (0, common_1.UseGuards)(doctors_guard_1.DoctorsGuard),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_medical_record_dto_1.CreateMedicalRecordDto]),
    __metadata("design:returntype", Promise)
], MedicalRecordsController.prototype, "create", null);
__decorate([
    (0, swagger_1.ApiOkResponse)({
        description: "List of all medical records.",
        type: [medical_record_entity_1.MedicalRecord],
    }),
    (0, common_1.UseGuards)(doctors_guard_1.DoctorsGuard),
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], MedicalRecordsController.prototype, "findAll", null);
__decorate([
    (0, common_1.UseGuards)(Self_guard_1.SelfOrStaffGuard),
    (0, swagger_1.ApiOkResponse)({ description: "Medical record found.", type: medical_record_entity_1.MedicalRecord }),
    (0, swagger_1.ApiNotFoundResponse)({ description: "Medical record not found." }),
    (0, swagger_1.ApiParam)({ name: "id", type: "number", description: "Medical record ID" }),
    (0, common_1.Get)(":id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MedicalRecordsController.prototype, "findOne", null);
__decorate([
    (0, swagger_1.ApiOkResponse)({
        description: "Medical record updated successfully.",
        type: medical_record_entity_1.MedicalRecord,
    }),
    (0, common_1.UseGuards)(doctors_guard_1.DoctorsGuard),
    (0, swagger_1.ApiNotFoundResponse)({ description: "Medical record not found." }),
    (0, swagger_1.ApiBadRequestResponse)({ description: "Invalid input data." }),
    (0, swagger_1.ApiParam)({ name: "id", type: "number", description: "Medical record ID" }),
    (0, common_1.Patch)(":id"),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_medical_record_dto_1.UpdateMedicalRecordDto]),
    __metadata("design:returntype", Promise)
], MedicalRecordsController.prototype, "update", null);
__decorate([
    (0, common_1.UseGuards)(doctors_guard_1.DoctorsGuard),
    (0, swagger_1.ApiOkResponse)({ description: "Medical record deleted successfully." }),
    (0, swagger_1.ApiNotFoundResponse)({ description: "Medical record not found." }),
    (0, swagger_1.ApiParam)({ name: "id", type: "number", description: "Medical record ID" }),
    (0, common_1.Delete)(":id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MedicalRecordsController.prototype, "remove", null);
exports.MedicalRecordsController = MedicalRecordsController = __decorate([
    (0, swagger_1.ApiTags)("Medical Records"),
    (0, common_1.Controller)("medical-records"),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    __metadata("design:paramtypes", [medical_records_service_1.MedicalRecordsService])
], MedicalRecordsController);
//# sourceMappingURL=medical-records.controller.js.map