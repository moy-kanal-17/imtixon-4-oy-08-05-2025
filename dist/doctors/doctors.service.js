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
const sequelize_2 = require("sequelize");
const bcrypt = require("bcrypt");
let DoctorsService = class DoctorsService {
    doctorModel;
    specializationModel;
    constructor(doctorModel, specializationModel) {
        this.doctorModel = doctorModel;
        this.specializationModel = specializationModel;
    }
    async create(createDoctorDto) {
        const doctor = await this.doctorModel.findOne({ where: { email: createDoctorDto.email } });
        if (doctor) {
            console.log(doctor);
            throw new common_1.NotFoundException("Doctor bor bunaqa");
        }
        const specialization = await this.specializationModel.findByPk(createDoctorDto.specialization_id);
        if (!specialization) {
            throw new common_1.NotFoundException("Specialization not found");
        }
        const hashedPassword = await bcrypt.hash(createDoctorDto.password, 10);
        createDoctorDto.password = hashedPassword;
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
    async findtime(startTime, finishTime) {
        try {
            const patients = await this.doctorModel.findAll({
                where: {
                    createdAt: {
                        [sequelize_2.Op.between]: [new Date(startTime), new Date(finishTime)],
                    },
                    is_active: true,
                }
            });
            return patients;
        }
        catch (error) {
            console.error("Bemorlarni vaqt oralig'ida olishda xatolik:", error);
            throw new Error("Bemorlarni olishda xatolik yuz berdi");
        }
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
    __param(1, (0, sequelize_1.InjectModel)(specialization_models_1.Specialization)),
    __metadata("design:paramtypes", [Object, Object])
], DoctorsService);
//# sourceMappingURL=doctors.service.js.map