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
exports.AppointmentsService = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const appointment_model_1 = require("./models/appointment.model");
const patient_models_1 = require("../patient/models/patient.models");
const doctors_models_1 = require("../doctors/models/doctors.models");
let AppointmentsService = class AppointmentsService {
    appointmentModel;
    constructor(appointmentModel) {
        this.appointmentModel = appointmentModel;
    }
    async create(createAppointmentDto) {
        console.log('YARATILDI APPOINTMENT!');
        return this.appointmentModel.create(createAppointmentDto);
    }
    async findAll() {
        return this.appointmentModel.findAll({
            include: [
                { model: patient_models_1.Patient, as: 'patient' },
                { model: doctors_models_1.Doctor, as: 'doctor' },
            ],
        });
    }
    async findOne(id) {
        const appointment = await this.appointmentModel.findByPk(id, {
            include: [
                { model: patient_models_1.Patient, as: 'patient' },
                { model: doctors_models_1.Doctor, as: 'doctor' },
            ],
        });
        if (!appointment) {
            throw new common_1.NotFoundException(`Appointment with ID ${id} not found`);
        }
        return appointment;
    }
    async update(id, updateAppointmentDto) {
        const [affectedCount] = await this.appointmentModel.update(updateAppointmentDto, {
            where: { id },
            returning: true,
        });
        if (affectedCount === 0) {
            throw new common_1.NotFoundException(`Appointment with ID ${id} not found`);
        }
        const updatedAppointment = await this.findOne(id);
        return updatedAppointment;
    }
    async remove(id) {
        const appointment = await this.findOne(id);
        await appointment.destroy();
    }
};
exports.AppointmentsService = AppointmentsService;
exports.AppointmentsService = AppointmentsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(appointment_model_1.Appointment)),
    __metadata("design:paramtypes", [Object])
], AppointmentsService);
//# sourceMappingURL=appointments.service.js.map