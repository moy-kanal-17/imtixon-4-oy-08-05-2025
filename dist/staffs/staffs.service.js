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
exports.StaffsService = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const staff_model_1 = require("./models/staff.model");
const role_model_1 = require("../role/models/role.model");
let StaffsService = class StaffsService {
    staffModel;
    constructor(staffModel) {
        this.staffModel = staffModel;
    }
    async create(createStaffDto) {
        try {
            return this.staffModel.create(createStaffDto);
        }
        catch (error) {
            console.log(error);
            throw error;
        }
    }
    async createAdmin(createStaffDto) {
        try {
            const staffData = {
                ...createStaffDto,
                IsCreator: true,
            };
            const newStaff = await this.staffModel.create(staffData);
            return newStaff;
        }
        catch (error) {
            console.error("Error creating admin staff:", error);
            throw error;
        }
    }
    async findAll() {
        return this.staffModel.findAll({
            include: [
                {
                    model: role_model_1.Role,
                    as: "role",
                },
            ],
        });
    }
    async findByspec(rolesid) {
        return this.staffModel.findAll({
            include: [
                {
                    model: role_model_1.Role,
                    as: "role",
                    where: { id: rolesid },
                },
            ],
        });
    }
    async findOne(id) {
        const staff = await this.staffModel.findByPk(id, {
            include: [
                {
                    model: role_model_1.Role,
                    as: "role",
                },
            ],
        });
        if (!staff) {
            throw new common_1.NotFoundException(`Staff with ID ${id} not found`);
        }
        return staff;
    }
    async update(id, updateStaffDto) {
        const [affectedCount] = await this.staffModel.update(updateStaffDto, {
            where: { id },
            returning: true,
        });
        if (affectedCount === 0) {
            throw new common_1.NotFoundException(`Staff with ID ${id} not found`);
        }
        const updatedStaff = await this.findOne(id);
        return updatedStaff;
    }
    async remove(id) {
        const staff = await this.findOne(id);
        await staff.destroy();
    }
};
exports.StaffsService = StaffsService;
exports.StaffsService = StaffsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(staff_model_1.Staff)),
    __metadata("design:paramtypes", [Object])
], StaffsService);
//# sourceMappingURL=staffs.service.js.map