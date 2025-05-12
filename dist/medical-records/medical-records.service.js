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
exports.MedicalRecordsService = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const medical_record_entity_1 = require("./models/medical-record.entity");
const doctors_models_1 = require("../doctors/models/doctors.models");
const patient_models_1 = require("../patient/models/patient.models");
let MedicalRecordsService = class MedicalRecordsService {
    medicalRecordModel;
    constructor(medicalRecordModel) {
        this.medicalRecordModel = medicalRecordModel;
    }
    async create(createMedicalRecordDto) {
        return this.medicalRecordModel.create(createMedicalRecordDto);
    }
    async findAll() {
        return this.medicalRecordModel.findAll({
            include: [
                {
                    model: doctors_models_1.Doctor,
                    as: "doctor",
                    attributes: ["first_name", "last_name"],
                },
                {
                    model: patient_models_1.Patient,
                    as: "patient",
                    attributes: ["first_name", "last_name"],
                },
            ],
        });
    }
    async findOne(id) {
        const medicalRecord = await this.medicalRecordModel.findByPk(id, {
            include: [
                { model: doctors_models_1.Doctor, as: "doctor" },
                { model: patient_models_1.Patient, as: "patient" },
            ],
        });
        if (!medicalRecord) {
            throw new common_1.NotFoundException(`Medical record with ID ${id} not found`);
        }
        return medicalRecord;
    }
    async update(id, updateMedicalRecordDto) {
        const [affectedCount] = await this.medicalRecordModel.update(updateMedicalRecordDto, {
            where: { id },
            returning: true,
        });
        if (affectedCount === 0) {
            throw new common_1.NotFoundException(`Medical record with ID ${id} not found`);
        }
        const updatedMedicalRecord = await this.findOne(id);
        return updatedMedicalRecord;
    }
    async remove(id) {
        const medicalRecord = await this.findOne(id);
        await medicalRecord.destroy();
    }
};
exports.MedicalRecordsService = MedicalRecordsService;
exports.MedicalRecordsService = MedicalRecordsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(medical_record_entity_1.MedicalRecord)),
    __metadata("design:paramtypes", [Object])
], MedicalRecordsService);
//# sourceMappingURL=medical-records.service.js.map