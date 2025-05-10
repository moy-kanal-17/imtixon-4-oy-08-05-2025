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
exports.Patient = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const swagger_1 = require("@nestjs/swagger");
const appointment_model_1 = require("../../appointments/models/appointment.model");
let Patient = class Patient extends sequelize_typescript_1.Model {
    first_name;
    last_name;
    gender;
    phone_number;
    hashed_token;
    birthday;
    appointments;
};
exports.Patient = Patient;
__decorate([
    (0, swagger_1.ApiProperty)(),
    sequelize_typescript_1.PrimaryKey,
    sequelize_typescript_1.AutoIncrement,
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER }),
    __metadata("design:type", Number)
], Patient.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, sequelize_typescript_1.Column)({ allowNull: false, type: sequelize_typescript_1.DataType.STRING }),
    __metadata("design:type", String)
], Patient.prototype, "first_name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, sequelize_typescript_1.Column)({ allowNull: false, type: sequelize_typescript_1.DataType.STRING }),
    __metadata("design:type", String)
], Patient.prototype, "last_name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, sequelize_typescript_1.Column)({ allowNull: false, type: sequelize_typescript_1.DataType.STRING }),
    __metadata("design:type", String)
], Patient.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, sequelize_typescript_1.Column)({ allowNull: false, type: sequelize_typescript_1.DataType.STRING }),
    __metadata("design:type", String)
], Patient.prototype, "password", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, sequelize_typescript_1.Column)({ allowNull: false, type: sequelize_typescript_1.DataType.STRING }),
    __metadata("design:type", String)
], Patient.prototype, "avatar", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, sequelize_typescript_1.Column)({ allowNull: true, type: sequelize_typescript_1.DataType.STRING }),
    __metadata("design:type", String)
], Patient.prototype, "gender", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, sequelize_typescript_1.Column)({ allowNull: false, type: sequelize_typescript_1.DataType.STRING }),
    __metadata("design:type", String)
], Patient.prototype, "phone_number", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, sequelize_typescript_1.Column)({ allowNull: true, type: sequelize_typescript_1.DataType.STRING }),
    __metadata("design:type", String)
], Patient.prototype, "hashed_token", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, sequelize_typescript_1.Column)({ allowNull: true, type: sequelize_typescript_1.DataType.DATE }),
    __metadata("design:type", Date)
], Patient.prototype, "birthday", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ default: false }),
    (0, sequelize_typescript_1.Column)({ defaultValue: false, type: sequelize_typescript_1.DataType.BOOLEAN }),
    __metadata("design:type", Boolean)
], Patient.prototype, "is_active", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, sequelize_typescript_1.Column)({ allowNull: true, type: sequelize_typescript_1.DataType.STRING }),
    __metadata("design:type", String)
], Patient.prototype, "active_link", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => appointment_model_1.Appointment, { foreignKey: "Patients_id", as: "appointments" }),
    __metadata("design:type", Array)
], Patient.prototype, "appointments", void 0);
exports.Patient = Patient = __decorate([
    sequelize_typescript_1.Table
], Patient);
//# sourceMappingURL=patient.models.js.map