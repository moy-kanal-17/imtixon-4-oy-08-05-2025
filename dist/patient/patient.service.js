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
exports.PatientService = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const patient_models_1 = require("./models/patient.models");
const appointment_model_1 = require("../appointments/models/appointment.model");
const file_service_1 = require("../file/file.service");
const bcrypt = require("bcrypt");
const sequelize_2 = require("sequelize");
let PatientService = class PatientService {
    patientModel;
    fileservice;
    constructor(patientModel, fileservice) {
        this.patientModel = patientModel;
        this.fileservice = fileservice;
    }
    async create(createPatientDto, avatar) {
        const re = await this.patientModel.findOne({
            where: { email: createPatientDto.email },
        });
        if (re) {
            throw new common_1.NotFoundException("BU YUSER BOR!");
        }
        const fileName = await this.fileservice.saveImage(avatar.buffer);
        console.log(fileName);
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(createPatientDto.password, saltRounds);
        createPatientDto.password = hashedPassword;
        return this.patientModel.create({ ...createPatientDto, avatar: fileName });
    }
    async findtime(startTime, finishTime) {
        try {
            const patients = await this.patientModel.findAll({
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
    async findAll() {
        return this.patientModel.findAll({
            include: [
                {
                    model: appointment_model_1.Appointment,
                    as: "appointments",
                },
            ],
        });
    }
    async findOne(id) {
        const patient = await this.patientModel.findByPk(id, {
            include: [
                {
                    model: appointment_model_1.Appointment,
                    as: "appointments",
                },
            ],
        });
        if (!patient) {
            throw new common_1.NotFoundException(`Patient with ID ${id} not found`);
        }
        return patient;
    }
    async update(id, updatePatientDto) {
        const [affectedCount] = await this.patientModel.update(updatePatientDto, {
            where: { id },
            returning: true,
        });
        if (affectedCount === 0) {
            throw new common_1.NotFoundException(`Patient with ID ${id} not found`);
        }
        const updatedPatient = await this.findOne(id);
        return updatedPatient;
    }
    async remove(id) {
        const patient = await this.findOne(id);
        await patient.destroy();
    }
};
exports.PatientService = PatientService;
exports.PatientService = PatientService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(patient_models_1.Patient)),
    __metadata("design:paramtypes", [Object, file_service_1.FileService])
], PatientService);
//# sourceMappingURL=patient.service.js.map