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
Object.defineProperty(exports, "__esModule", { value: true });
exports.MedicalRecord = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const swagger_1 = require("@nestjs/swagger");
const doctors_models_1 = require("../../doctors/models/doctors.models");
const patient_models_1 = require("../../patient/models/patient.models");
let MedicalRecord = class MedicalRecord extends sequelize_typescript_1.Model {
    doctor_id;
    doctor;
    patient_id;
    patient;
    result;
    notes;
    name;
    descriptions;
};
exports.MedicalRecord = MedicalRecord;
__decorate([
    (0, swagger_1.ApiProperty)(),
    sequelize_typescript_1.PrimaryKey,
    sequelize_typescript_1.AutoIncrement,
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER }),
    __metadata("design:type", Number)
], MedicalRecord.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, sequelize_typescript_1.ForeignKey)(() => doctors_models_1.Doctor),
    (0, sequelize_typescript_1.Column)({ allowNull: false, type: sequelize_typescript_1.DataType.INTEGER }),
    __metadata("design:type", Number)
], MedicalRecord.prototype, "doctor_id", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => doctors_models_1.Doctor, { foreignKey: 'doctor_id', as: 'doctor' }),
    __metadata("design:type", doctors_models_1.Doctor)
], MedicalRecord.prototype, "doctor", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, sequelize_typescript_1.ForeignKey)(() => patient_models_1.Patient),
    (0, sequelize_typescript_1.Column)({ allowNull: false, type: sequelize_typescript_1.DataType.INTEGER }),
    __metadata("design:type", Number)
], MedicalRecord.prototype, "patient_id", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => patient_models_1.Patient, { foreignKey: 'patient_id', as: 'patient' }),
    __metadata("design:type", patient_models_1.Patient)
], MedicalRecord.prototype, "patient", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, sequelize_typescript_1.Column)({ allowNull: false, type: sequelize_typescript_1.DataType.STRING }),
    __metadata("design:type", String)
], MedicalRecord.prototype, "result", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, sequelize_typescript_1.Column)({ allowNull: false, type: sequelize_typescript_1.DataType.STRING }),
    __metadata("design:type", String)
], MedicalRecord.prototype, "notes", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, sequelize_typescript_1.Column)({ allowNull: false, type: sequelize_typescript_1.DataType.STRING }),
    __metadata("design:type", String)
], MedicalRecord.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, sequelize_typescript_1.Column)({ allowNull: false, type: sequelize_typescript_1.DataType.STRING }),
    __metadata("design:type", String)
], MedicalRecord.prototype, "descriptions", void 0);
exports.MedicalRecord = MedicalRecord = __decorate([
    sequelize_typescript_1.Table
], MedicalRecord);
//# sourceMappingURL=medical-record.entity.js.map