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
exports.RolesController = void 0;
const common_1 = require("@nestjs/common");
const role_service_1 = require("./role.service");
const create_role_dto_1 = require("./dto/create-role.dto");
const update_role_dto_1 = require("./dto/update-role.dto");
const swagger_1 = require("@nestjs/swagger");
const role_model_1 = require("./models/role.model");
const staffs_guard_1 = require("../common/guards/staffs.guard");
let RolesController = class RolesController {
    rolesService;
    constructor(rolesService) {
        this.rolesService = rolesService;
    }
    async create(createRoleDto) {
        return this.rolesService.create(createRoleDto);
    }
    async findAll() {
        return this.rolesService.findAll();
    }
    async findOne(id) {
        return this.rolesService.findOne(+id);
    }
    async update(id, updateRoleDto) {
        return this.rolesService.update(+id, updateRoleDto);
    }
    async remove(id) {
        await this.rolesService.remove(+id);
        return;
    }
};
exports.RolesController = RolesController;
__decorate([
    (0, swagger_1.ApiCreatedResponse)({
        description: "The record has been successfully created.",
        type: role_model_1.Role,
    }),
    (0, swagger_1.ApiBadRequestResponse)({ description: "Invalid input data." }),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_role_dto_1.CreateRoleDto]),
    __metadata("design:returntype", Promise)
], RolesController.prototype, "create", null);
__decorate([
    (0, swagger_1.ApiOkResponse)({ description: "List of all roles.", type: [role_model_1.Role] }),
    (0, common_1.UseGuards)(staffs_guard_1.StaffGuard),
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], RolesController.prototype, "findAll", null);
__decorate([
    (0, swagger_1.ApiOkResponse)({ description: "Role found.", type: role_model_1.Role }),
    (0, swagger_1.ApiNotFoundResponse)({ description: "Role not found." }),
    (0, swagger_1.ApiParam)({ name: "id", type: "number", description: "Role ID" }),
    (0, common_1.UseGuards)(staffs_guard_1.StaffGuard),
    (0, common_1.Get)(":id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], RolesController.prototype, "findOne", null);
__decorate([
    (0, swagger_1.ApiOkResponse)({ description: "Role updated successfully.", type: role_model_1.Role }),
    (0, swagger_1.ApiNotFoundResponse)({ description: "Role not found." }),
    (0, swagger_1.ApiBadRequestResponse)({ description: "Invalid input data." }),
    (0, swagger_1.ApiParam)({ name: "id", type: "number", description: "Role ID" }),
    (0, common_1.UseGuards)(staffs_guard_1.StaffGuard),
    (0, common_1.Patch)(":id"),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_role_dto_1.UpdateRoleDto]),
    __metadata("design:returntype", Promise)
], RolesController.prototype, "update", null);
__decorate([
    (0, swagger_1.ApiOkResponse)({ description: "Role deleted successfully." }),
    (0, swagger_1.ApiNotFoundResponse)({ description: "Role not found." }),
    (0, swagger_1.ApiParam)({ name: "id", type: "number", description: "Role ID" }),
    (0, common_1.UseGuards)(staffs_guard_1.StaffGuard),
    (0, common_1.Delete)(":id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], RolesController.prototype, "remove", null);
exports.RolesController = RolesController = __decorate([
    (0, swagger_1.ApiTags)("Roles"),
    (0, common_1.Controller)("roles"),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    __metadata("design:paramtypes", [role_service_1.RolesService])
], RolesController);
//# sourceMappingURL=role.controller.js.map