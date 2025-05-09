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
exports.DoctorsService = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const doctors_models_1 = require("./models/doctors.models");
const specialization_models_1 = require("../specializations/models/specialization.models");
let DoctorsService = class DoctorsService {
    doctorModel;
    constructor(doctorModel) {
        this.doctorModel = doctorModel;
    }
    async create(createDoctorDto) {
        return this.doctorModel.create(createDoctorDto);
    }
    async findAll() {
        return this.doctorModel.findAll({
            include: [
                {
                    model: specialization_models_1.Specialization,
                    as: "specialization",
                },
            ],
        });
    }
    async findByspec(specializationId) {
        return this.doctorModel.findAll({
            include: [
                {
                    model: specialization_models_1.Specialization,
                    as: "specialization",
                    where: { id: specializationId },
                },
            ],
        });
    }
    async findOne(id) {
        const doctor = await this.doctorModel.findByPk(id, {
            include: [
                {
                    model: specialization_models_1.Specialization,
                    as: "specialization",
                },
            ],
        });
        if (!doctor) {
            throw new common_1.NotFoundException(`Doctor with ID ${id} not found`);
        }
        return doctor;
    }
    async update(id, updateDoctorDto) {
        const [affectedCount] = await this.doctorModel.update(updateDoctorDto, {
            where: { id },
            returning: true,
        });
        if (affectedCount === 0) {
            throw new common_1.NotFoundException(`Doctor with ID ${id} not found`);
        }
        const updatedDoctor = await this.findOne(id);
        return updatedDoctor;
    }
    async remove(id) {
        const doctor = await this.findOne(id);
        await doctor.destroy();
    }
};
exports.DoctorsService = DoctorsService;
exports.DoctorsService = DoctorsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(doctors_models_1.Doctor)),
    __metadata("design:paramtypes", [Object])
], DoctorsService);
//# sourceMappingURL=doctors.service.js.map