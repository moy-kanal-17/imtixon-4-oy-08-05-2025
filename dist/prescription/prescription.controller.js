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
exports.PrescriptionsController = void 0;
const common_1 = require("@nestjs/common");
const prescription_service_1 = require("./prescription.service");
const create_prescription_dto_1 = require("./dto/create-prescription.dto");
const update_prescription_dto_1 = require("./dto/update-prescription.dto");
const swagger_1 = require("@nestjs/swagger");
const prescription_entity_1 = require("./entities/prescription.entity");
const doctors_guard_1 = require("../common/guards/doctors.guard");
let PrescriptionsController = class PrescriptionsController {
    prescriptionsService;
    constructor(prescriptionsService) {
        this.prescriptionsService = prescriptionsService;
    }
    async create(createPrescriptionDto) {
        return this.prescriptionsService.create(createPrescriptionDto);
    }
    async findAll() {
        return this.prescriptionsService.findAll();
    }
    async findOne(id) {
        return this.prescriptionsService.findOne(+id);
    }
    async update(id, updatePrescriptionDto) {
        return this.prescriptionsService.update(+id, updatePrescriptionDto);
    }
    async remove(id) {
        await this.prescriptionsService.remove(+id);
        return;
    }
};
exports.PrescriptionsController = PrescriptionsController;
__decorate([
    (0, swagger_1.ApiCreatedResponse)({
        description: "The record has been successfully created.",
        type: prescription_entity_1.Prescription,
    }),
    (0, swagger_1.ApiBadRequestResponse)({ description: "Invalid input data." }),
    (0, common_1.UseGuards)(doctors_guard_1.DoctorsGuard),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_prescription_dto_1.CreatePrescriptionDto]),
    __metadata("design:returntype", Promise)
], PrescriptionsController.prototype, "create", null);
__decorate([
    (0, swagger_1.ApiOkResponse)({
        description: "List of all prescriptions.",
        type: [prescription_entity_1.Prescription],
    }),
    (0, common_1.UseGuards)(doctors_guard_1.DoctorsGuard),
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PrescriptionsController.prototype, "findAll", null);
__decorate([
    (0, swagger_1.ApiOkResponse)({ description: "Prescription found.", type: prescription_entity_1.Prescription }),
    (0, swagger_1.ApiNotFoundResponse)({ description: "Prescription not found." }),
    (0, swagger_1.ApiParam)({ name: "id", type: "number", description: "Prescription ID" }),
    (0, common_1.UseGuards)(doctors_guard_1.DoctorsGuard),
    (0, common_1.Get)(":id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PrescriptionsController.prototype, "findOne", null);
__decorate([
    (0, swagger_1.ApiOkResponse)({
        description: "Prescription updated successfully.",
        type: prescription_entity_1.Prescription,
    }),
    (0, swagger_1.ApiNotFoundResponse)({ description: "Prescription not found." }),
    (0, swagger_1.ApiBadRequestResponse)({ description: "Invalid input data." }),
    (0, swagger_1.ApiParam)({ name: "id", type: "number", description: "Prescription ID" }),
    (0, common_1.UseGuards)(doctors_guard_1.DoctorsGuard),
    (0, common_1.Patch)(":id"),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_prescription_dto_1.UpdatePrescriptionDto]),
    __metadata("design:returntype", Promise)
], PrescriptionsController.prototype, "update", null);
__decorate([
    (0, swagger_1.ApiOkResponse)({ description: "Prescription deleted successfully." }),
    (0, swagger_1.ApiNotFoundResponse)({ description: "Prescription not found." }),
    (0, common_1.UseGuards)(doctors_guard_1.DoctorsGuard),
    (0, swagger_1.ApiParam)({ name: "id", type: "number", description: "Prescription ID" }),
    (0, common_1.Delete)(":id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PrescriptionsController.prototype, "remove", null);
exports.PrescriptionsController = PrescriptionsController = __decorate([
    (0, swagger_1.ApiTags)("Prescriptions"),
    (0, common_1.Controller)("prescriptions"),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    __metadata("design:paramtypes", [prescription_service_1.PrescriptionsService])
], PrescriptionsController);
//# sourceMappingURL=prescription.controller.js.map