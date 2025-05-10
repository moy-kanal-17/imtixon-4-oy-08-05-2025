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
exports.Doctor = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const swagger_1 = require("@nestjs/swagger");
const specialization_models_1 = require("../../specializations/models/specialization.models");
let Doctor = class Doctor extends sequelize_typescript_1.Model {
};
exports.Doctor = Doctor;
__decorate([
    (0, swagger_1.ApiProperty)(),
    sequelize_typescript_1.PrimaryKey,
    sequelize_typescript_1.AutoIncrement,
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Doctor.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Doctor.prototype, "first_name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Doctor.prototype, "last_name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, sequelize_typescript_1.ForeignKey)(() => specialization_models_1.Specialization),
    (0, sequelize_typescript_1.Column)({ allowNull: true }),
    __metadata("design:type", Number)
], Doctor.prototype, "specialization_id", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => specialization_models_1.Specialization, {
        foreignKey: "specialization_id",
        as: "specialization",
    }),
    __metadata("design:type", specialization_models_1.Specialization)
], Doctor.prototype, "specialization", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, sequelize_typescript_1.Column)({ allowNull: true }),
    __metadata("design:type", String)
], Doctor.prototype, "hashed_token", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Doctor.prototype, "phone_number", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, sequelize_typescript_1.Column)({ allowNull: true }),
    __metadata("design:type", Date)
], Doctor.prototype, "birthday", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ default: true }),
    (0, sequelize_typescript_1.Column)({ allowNull: true }),
    __metadata("design:type", String)
], Doctor.prototype, "active_link", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, sequelize_typescript_1.Column)({ allowNull: true }),
    __metadata("design:type", String)
], Doctor.prototype, "gender", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, sequelize_typescript_1.Column)({ allowNull: true }),
    __metadata("design:type", String)
], Doctor.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, sequelize_typescript_1.Column)({ allowNull: true }),
    __metadata("design:type", String)
], Doctor.prototype, "password", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, sequelize_typescript_1.Column)({ defaultValue: false }),
    __metadata("design:type", Boolean)
], Doctor.prototype, "is_active", void 0);
exports.Doctor = Doctor = __decorate([
    sequelize_typescript_1.Table
], Doctor);
//# sourceMappingURL=doctors.models.js.map