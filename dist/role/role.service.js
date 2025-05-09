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
exports.RolesService = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const role_model_1 = require("./models/role.model");
let RolesService = class RolesService {
    roleModel;
    constructor(roleModel) {
        this.roleModel = roleModel;
    }
    async create(createRoleDto) {
        return this.roleModel.create(createRoleDto);
    }
    async findAll() {
        return this.roleModel.findAll();
    }
    async findOne(id) {
        const role = await this.roleModel.findByPk(id);
        if (!role) {
            throw new common_1.NotFoundException(`Role with ID ${id} not found`);
        }
        return role;
    }
    async update(id, updateRoleDto) {
        const [affectedCount] = await this.roleModel.update(updateRoleDto, {
            where: { id },
            returning: true,
        });
        if (affectedCount === 0) {
            throw new common_1.NotFoundException(`Role with ID ${id} not found`);
        }
        const updatedRole = await this.findOne(id);
        return updatedRole;
    }
    async remove(id) {
        const role = await this.findOne(id);
        await role.destroy();
    }
};
exports.RolesService = RolesService;
exports.RolesService = RolesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(role_model_1.Role)),
    __metadata("design:paramtypes", [Object])
], RolesService);
//# sourceMappingURL=role.service.js.map