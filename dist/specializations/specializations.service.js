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
exports.SpecializationsService = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const specialization_models_1 = require("./models/specialization.models");
const doctors_models_1 = require("../doctors/models/doctors.models");
let SpecializationsService = class SpecializationsService {
    specializationModel;
    constructor(specializationModel) {
        this.specializationModel = specializationModel;
    }
    create(createSpecializationDto) {
        return this.specializationModel.create(createSpecializationDto);
    }
    async findAll() {
        return this.specializationModel.findAll();
    }
    async findOne(id) {
        const specialization = await this.specializationModel.findByPk(id, {
            include: [
                {
                    model: doctors_models_1.Doctor,
                    as: "doctors",
                },
            ],
        });
        if (!specialization) {
            throw new common_1.NotFoundException(`Specialization with ID ${id} not found`);
        }
        return specialization;
    }
    async update(id, updateSpecializationDto) {
        const [affectedCount] = await this.specializationModel.update(updateSpecializationDto, {
            where: { id },
            returning: true,
        });
        if (affectedCount === 0) {
            throw new common_1.NotFoundException(`Specialization with ID ${id} not found`);
        }
        const updatedSpecialization = await this.findOne(id);
        return updatedSpecialization;
    }
    async remove(id) {
        const specialization = await this.findOne(id);
        await specialization.destroy();
    }
};
exports.SpecializationsService = SpecializationsService;
exports.SpecializationsService = SpecializationsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(specialization_models_1.Specialization)),
    __metadata("design:paramtypes", [Object])
], SpecializationsService);
//# sourceMappingURL=specializations.service.js.map