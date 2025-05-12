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
exports.PrescriptionsService = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const prescription_entity_1 = require("./models/prescription.entity");
const medical_record_entity_1 = require("../medical-records/models/medical-record.entity");
const medication_entity_1 = require("../medications/models/medication.entity");
let PrescriptionsService = class PrescriptionsService {
    prescriptionModel;
    constructor(prescriptionModel) {
        this.prescriptionModel = prescriptionModel;
    }
    async create(createPrescriptionDto) {
        return this.prescriptionModel.create(createPrescriptionDto);
    }
    async findAll() {
        try {
            return this.prescriptionModel.findAll({
                include: [
                    { model: medical_record_entity_1.MedicalRecord, as: "medicalRecord", attributes: ["name"] },
                    { model: medication_entity_1.Medication, as: "medication", attributes: ["name"] },
                ],
            });
        }
        catch (error) {
            console.error("Error fetching prescriptions:", error);
            return [];
        }
    }
    async findOne(id) {
        const prescription = await this.prescriptionModel.findByPk(id, {
            include: [
                { model: medical_record_entity_1.MedicalRecord, as: "medicalRecord" },
                { model: medication_entity_1.Medication, as: "medication" },
            ],
        });
        if (!prescription) {
            throw new common_1.NotFoundException(`Prescription with ID ${id} not found`);
        }
        return prescription;
    }
    async update(id, updatePrescriptionDto) {
        const [affectedCount] = await this.prescriptionModel.update(updatePrescriptionDto, {
            where: { id },
            returning: true,
        });
        if (affectedCount === 0) {
            throw new common_1.NotFoundException(`Prescription with ID ${id} not found`);
        }
        const updatedPrescription = await this.findOne(id);
        return updatedPrescription;
    }
    async remove(id) {
        const prescription = await this.findOne(id);
        await prescription.destroy();
    }
};
exports.PrescriptionsService = PrescriptionsService;
exports.PrescriptionsService = PrescriptionsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(prescription_entity_1.Prescription)),
    __metadata("design:paramtypes", [Object])
], PrescriptionsService);
//# sourceMappingURL=prescription.service.js.map