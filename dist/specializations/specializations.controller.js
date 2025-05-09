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
exports.SpecializationsController = void 0;
const common_1 = require("@nestjs/common");
const specializations_service_1 = require("./specializations.service");
const create_specialization_dto_1 = require("./dto/create-specialization.dto");
const update_specialization_dto_1 = require("./dto/update-specialization.dto");
const swagger_1 = require("@nestjs/swagger");
const specialization_models_1 = require("./models/specialization.models");
const staffs_guard_1 = require("../common/guards/staffs.guard");
let SpecializationsController = class SpecializationsController {
    specializationsService;
    constructor(specializationsService) {
        this.specializationsService = specializationsService;
    }
    async create(createSpecializationDto) {
        return this.specializationsService.create(createSpecializationDto);
    }
    async findAll() {
        return this.specializationsService.findAll();
    }
    async findOne(id) {
        return this.specializationsService.findOne(+id);
    }
    async update(id, updateSpecializationDto) {
        return this.specializationsService.update(+id, updateSpecializationDto);
    }
    async remove(id) {
        await this.specializationsService.remove(+id);
        return;
    }
};
exports.SpecializationsController = SpecializationsController;
__decorate([
    (0, swagger_1.ApiCreatedResponse)({
        description: "The record has been successfully created.",
        type: specialization_models_1.Specialization,
    }),
    (0, swagger_1.ApiBadRequestResponse)({ description: "Invalid input data." }),
    (0, common_1.UseGuards)(staffs_guard_1.StaffGuard),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_specialization_dto_1.CreateSpecializationDto]),
    __metadata("design:returntype", Promise)
], SpecializationsController.prototype, "create", null);
__decorate([
    (0, swagger_1.ApiOkResponse)({
        description: "List of all specializations.",
        type: [specialization_models_1.Specialization],
    }),
    (0, common_1.UseGuards)(staffs_guard_1.StaffGuard),
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SpecializationsController.prototype, "findAll", null);
__decorate([
    (0, swagger_1.ApiOkResponse)({ description: "Specialization found.", type: specialization_models_1.Specialization }),
    (0, swagger_1.ApiNotFoundResponse)({ description: "Specialization not found." }),
    (0, swagger_1.ApiParam)({ name: "id", type: "number", description: "Specialization ID" }),
    (0, common_1.UseGuards)(staffs_guard_1.StaffGuard),
    (0, common_1.Get)(":id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SpecializationsController.prototype, "findOne", null);
__decorate([
    (0, swagger_1.ApiOkResponse)({
        description: "Specialization updated successfully.",
        type: specialization_models_1.Specialization,
    }),
    (0, swagger_1.ApiNotFoundResponse)({ description: "Specialization not found." }),
    (0, swagger_1.ApiBadRequestResponse)({ description: "Invalid input data." }),
    (0, swagger_1.ApiParam)({ name: "id", type: "number", description: "Specialization ID" }),
    (0, common_1.UseGuards)(staffs_guard_1.StaffGuard),
    (0, common_1.Patch)(":id"),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_specialization_dto_1.UpdateSpecializationDto]),
    __metadata("design:returntype", Promise)
], SpecializationsController.prototype, "update", null);
__decorate([
    (0, swagger_1.ApiOkResponse)({ description: "Specialization deleted successfully." }),
    (0, swagger_1.ApiNotFoundResponse)({ description: "Specialization not found." }),
    (0, swagger_1.ApiParam)({ name: "id", type: "number", description: "Specialization ID" }),
    (0, common_1.UseGuards)(staffs_guard_1.StaffGuard),
    (0, common_1.Delete)(":id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SpecializationsController.prototype, "remove", null);
exports.SpecializationsController = SpecializationsController = __decorate([
    (0, swagger_1.ApiTags)("Specializations"),
    (0, common_1.Controller)("specializations"),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    __metadata("design:paramtypes", [specializations_service_1.SpecializationsService])
], SpecializationsController);
//# sourceMappingURL=specializations.controller.js.map