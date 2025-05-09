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
exports.MedicationsController = void 0;
const common_1 = require("@nestjs/common");
const medications_service_1 = require("./medications.service");
const create_medication_dto_1 = require("./dto/create-medication.dto");
const update_medication_dto_1 = require("./dto/update-medication.dto");
const swagger_1 = require("@nestjs/swagger");
const medication_entity_1 = require("./entities/medication.entity");
const doctors_guard_1 = require("../common/guards/doctors.guard");
let MedicationsController = class MedicationsController {
    medicationsService;
    constructor(medicationsService) {
        this.medicationsService = medicationsService;
    }
    async create(createMedicationDto) {
        return this.medicationsService.create(createMedicationDto);
    }
    async findAll() {
        return this.medicationsService.findAll();
    }
    async findOne(id) {
        return this.medicationsService.findOne(+id);
    }
    async update(id, updateMedicationDto) {
        return this.medicationsService.update(+id, updateMedicationDto);
    }
    async remove(id) {
        await this.medicationsService.remove(+id);
        return;
    }
};
exports.MedicationsController = MedicationsController;
__decorate([
    (0, swagger_1.ApiCreatedResponse)({
        description: "The record has been successfully created.",
        type: medication_entity_1.Medication,
    }),
    (0, swagger_1.ApiBadRequestResponse)({ description: "Invalid input data." }),
    (0, common_1.UseGuards)(doctors_guard_1.DoctorsGuard),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_medication_dto_1.CreateMedicationDto]),
    __metadata("design:returntype", Promise)
], MedicationsController.prototype, "create", null);
__decorate([
    (0, swagger_1.ApiOkResponse)({
        description: "List of all medications.",
        type: [medication_entity_1.Medication],
    }),
    (0, common_1.UseGuards)(doctors_guard_1.DoctorsGuard),
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], MedicationsController.prototype, "findAll", null);
__decorate([
    (0, swagger_1.ApiOkResponse)({ description: "Medication found.", type: medication_entity_1.Medication }),
    (0, swagger_1.ApiNotFoundResponse)({ description: "Medication not found." }),
    (0, swagger_1.ApiParam)({ name: "id", type: "number", description: "Medication ID" }),
    (0, common_1.UseGuards)(doctors_guard_1.DoctorsGuard),
    (0, common_1.Get)(":id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MedicationsController.prototype, "findOne", null);
__decorate([
    (0, swagger_1.ApiOkResponse)({
        description: "Medication updated successfully.",
        type: medication_entity_1.Medication,
    }),
    (0, swagger_1.ApiNotFoundResponse)({ description: "Medication not found." }),
    (0, swagger_1.ApiBadRequestResponse)({ description: "Invalid input data." }),
    (0, swagger_1.ApiParam)({ name: "id", type: "number", description: "Medication ID" }),
    (0, common_1.UseGuards)(doctors_guard_1.DoctorsGuard),
    (0, common_1.Patch)(":id"),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_medication_dto_1.UpdateMedicationDto]),
    __metadata("design:returntype", Promise)
], MedicationsController.prototype, "update", null);
__decorate([
    (0, swagger_1.ApiOkResponse)({ description: "Medication deleted successfully." }),
    (0, swagger_1.ApiNotFoundResponse)({ description: "Medication not found." }),
    (0, swagger_1.ApiParam)({ name: "id", type: "number", description: "Medication ID" }),
    (0, common_1.UseGuards)(doctors_guard_1.DoctorsGuard),
    (0, common_1.Delete)(":id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MedicationsController.prototype, "remove", null);
exports.MedicationsController = MedicationsController = __decorate([
    (0, swagger_1.ApiTags)("Medications"),
    (0, common_1.Controller)("medications"),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    __metadata("design:paramtypes", [medications_service_1.MedicationsService])
], MedicationsController);
//# sourceMappingURL=medications.controller.js.map