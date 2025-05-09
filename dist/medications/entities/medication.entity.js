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
exports.Medication = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const swagger_1 = require("@nestjs/swagger");
const prescription_entity_1 = require("../../prescription/entities/prescription.entity");
let Medication = class Medication extends sequelize_typescript_1.Model {
    name;
    descriptions;
    price;
    prescriptions;
};
exports.Medication = Medication;
__decorate([
    (0, swagger_1.ApiProperty)(),
    sequelize_typescript_1.PrimaryKey,
    sequelize_typescript_1.AutoIncrement,
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER }),
    __metadata("design:type", Number)
], Medication.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, sequelize_typescript_1.Column)({ allowNull: false, type: sequelize_typescript_1.DataType.STRING }),
    __metadata("design:type", String)
], Medication.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, sequelize_typescript_1.Column)({ allowNull: false, type: sequelize_typescript_1.DataType.STRING }),
    __metadata("design:type", String)
], Medication.prototype, "descriptions", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, sequelize_typescript_1.Column)({ allowNull: false, type: sequelize_typescript_1.DataType.INTEGER }),
    __metadata("design:type", Number)
], Medication.prototype, "price", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => prescription_entity_1.Prescription, {
        foreignKey: 'medications_id',
        as: 'prescriptions',
    }),
    __metadata("design:type", Array)
], Medication.prototype, "prescriptions", void 0);
exports.Medication = Medication = __decorate([
    sequelize_typescript_1.Table
], Medication);
//# sourceMappingURL=medication.entity.js.map