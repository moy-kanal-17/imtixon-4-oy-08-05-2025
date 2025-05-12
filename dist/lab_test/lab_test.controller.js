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
exports.LabTestsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const lab_test_service_1 = require("./lab_test.service");
const lab_test_entity_1 = require("./models/lab_test.entity");
const create_lab_test_dto_1 = require("./dto/create-lab_test.dto");
const update_lab_test_dto_1 = require("./dto/update-lab_test.dto");
const Self_guard_1 = require("../common/guards/Self.guard");
const doctors_guard_1 = require("../common/guards/doctors.guard");
let LabTestsController = class LabTestsController {
    labTestsService;
    constructor(labTestsService) {
        this.labTestsService = labTestsService;
    }
    async create(createLabTestDto) {
        return this.labTestsService.create(createLabTestDto);
    }
    async findAll() {
        return this.labTestsService.findAll();
    }
    findByspec(id) {
        return this.labTestsService.findByspec(+id);
    }
    async findOne(id) {
        return this.labTestsService.findOne(+id);
    }
    async update(id, updateLabTestDto) {
        return this.labTestsService.update(+id, updateLabTestDto);
    }
    async remove(id) {
        await this.labTestsService.remove(+id);
        return;
    }
};
exports.LabTestsController = LabTestsController;
__decorate([
    (0, swagger_1.ApiCreatedResponse)({
        description: "The record has been successfully created.",
        type: lab_test_entity_1.LabTest,
    }),
    (0, swagger_1.ApiBadRequestResponse)({ description: "Invalid input data." }),
    (0, common_1.UseGuards)(doctors_guard_1.DoctorsGuard),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_lab_test_dto_1.CreateLabTestDto]),
    __metadata("design:returntype", Promise)
], LabTestsController.prototype, "create", null);
__decorate([
    (0, common_1.UseGuards)(doctors_guard_1.DoctorsGuard),
    (0, swagger_1.ApiOkResponse)({ description: "List of all lab tests.", type: [lab_test_entity_1.LabTest] }),
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], LabTestsController.prototype, "findAll", null);
__decorate([
    (0, common_1.UseGuards)(doctors_guard_1.DoctorsGuard),
    (0, common_1.Get)("/spe/:id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], LabTestsController.prototype, "findByspec", null);
__decorate([
    (0, common_1.UseGuards)(doctors_guard_1.DoctorsGuard),
    (0, swagger_1.ApiOkResponse)({ description: "Lab test found.", type: lab_test_entity_1.LabTest }),
    (0, swagger_1.ApiNotFoundResponse)({ description: "Lab test not found." }),
    (0, swagger_1.ApiParam)({ name: "id", type: "number", description: "Lab test ID" }),
    (0, common_1.Get)(":id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], LabTestsController.prototype, "findOne", null);
__decorate([
    (0, swagger_1.ApiOkResponse)({
        description: "Lab test updated successfully.",
        type: lab_test_entity_1.LabTest,
    }),
    (0, common_1.UseGuards)(Self_guard_1.SelfOrStaffGuard),
    (0, swagger_1.ApiNotFoundResponse)({ description: "Lab test not found." }),
    (0, swagger_1.ApiBadRequestResponse)({ description: "Invalid input data." }),
    (0, swagger_1.ApiParam)({ name: "id", type: "number", description: "Lab test ID" }),
    (0, common_1.Patch)(":id"),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_lab_test_dto_1.UpdateLabTestDto]),
    __metadata("design:returntype", Promise)
], LabTestsController.prototype, "update", null);
__decorate([
    (0, common_1.UseGuards)(doctors_guard_1.DoctorsGuard),
    (0, swagger_1.ApiOkResponse)({ description: "Lab test deleted successfully." }),
    (0, swagger_1.ApiNotFoundResponse)({ description: "Lab test not found." }),
    (0, swagger_1.ApiParam)({ name: "id", type: "number", description: "Lab test ID" }),
    (0, common_1.Delete)(":id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], LabTestsController.prototype, "remove", null);
exports.LabTestsController = LabTestsController = __decorate([
    (0, swagger_1.ApiTags)("Lab Tests"),
    (0, common_1.Controller)("lab-tests"),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    __metadata("design:paramtypes", [lab_test_service_1.LabTestsService])
], LabTestsController);
//# sourceMappingURL=lab_test.controller.js.map