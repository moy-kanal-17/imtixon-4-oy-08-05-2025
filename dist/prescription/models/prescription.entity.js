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
exports.Prescription = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const swagger_1 = require("@nestjs/swagger");
const medical_record_entity_1 = require("../../medical-records/models/medical-record.entity");
const medication_entity_1 = require("../../medications/models/medication.entity");
let Prescription = class Prescription extends sequelize_typescript_1.Model {
    medical_records_id;
    medicalRecord;
    medications_id;
    medication;
    name;
    descriptions;
    allPrice;
};
exports.Prescription = Prescription;
__decorate([
    (0, swagger_1.ApiProperty)(),
    sequelize_typescript_1.PrimaryKey,
    sequelize_typescript_1.AutoIncrement,
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER }),
    __metadata("design:type", Number)
], Prescription.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, sequelize_typescript_1.ForeignKey)(() => medical_record_entity_1.MedicalRecord),
    (0, sequelize_typescript_1.Column)({
        allowNull: false,
        type: sequelize_typescript_1.DataType.INTEGER,
        field: "medical_records_id",
    }),
    __metadata("design:type", Number)
], Prescription.prototype, "medical_records_id", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => medical_record_entity_1.MedicalRecord, {
        foreignKey: "medical_records_id",
        as: "medicalRecord",
    }),
    __metadata("design:type", medical_record_entity_1.MedicalRecord)
], Prescription.prototype, "medicalRecord", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, sequelize_typescript_1.ForeignKey)(() => medication_entity_1.Medication),
    (0, sequelize_typescript_1.Column)({ allowNull: false, type: sequelize_typescript_1.DataType.INTEGER, field: "medications_id" }),
    __metadata("design:type", Number)
], Prescription.prototype, "medications_id", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => medication_entity_1.Medication, {
        foreignKey: "medications_id",
        as: "medication",
    }),
    __metadata("design:type", medication_entity_1.Medication)
], Prescription.prototype, "medication", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, sequelize_typescript_1.Column)({ allowNull: false, type: sequelize_typescript_1.DataType.STRING }),
    __metadata("design:type", String)
], Prescription.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, sequelize_typescript_1.Column)({ allowNull: false, type: sequelize_typescript_1.DataType.STRING }),
    __metadata("design:type", String)
], Prescription.prototype, "descriptions", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, sequelize_typescript_1.Column)({ allowNull: false, type: sequelize_typescript_1.DataType.STRING, field: "all_price" }),
    __metadata("design:type", String)
], Prescription.prototype, "allPrice", void 0);
exports.Prescription = Prescription = __decorate([
    sequelize_typescript_1.Table
], Prescription);
//# sourceMappingURL=prescription.entity.js.map