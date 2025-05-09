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
exports.PaymentsService = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const payment_entity_1 = require("./entities/payment.entity");
const patient_models_1 = require("../patient/models/patient.models");
let PaymentsService = class PaymentsService {
    paymentModel;
    constructor(paymentModel) {
        this.paymentModel = paymentModel;
    }
    async create(createPaymentDto) {
        return this.paymentModel.create(createPaymentDto);
    }
    async findAll() {
        return this.paymentModel.findAll({
            include: [
                {
                    model: patient_models_1.Patient,
                    as: 'patient',
                    attributes: ['first_name', 'last_name'],
                },
            ],
        });
    }
    async findOne(id) {
        const payment = await this.paymentModel.findByPk(id, {
            include: [{ model: patient_models_1.Patient, as: 'patient' }],
        });
        if (!payment) {
            throw new common_1.NotFoundException(`Payment with ID ${id} not found`);
        }
        return payment;
    }
    async update(id, updatePaymentDto) {
        const [affectedCount] = await this.paymentModel.update(updatePaymentDto, {
            where: { id },
            returning: true,
        });
        if (affectedCount === 0) {
            throw new common_1.NotFoundException(`Payment with ID ${id} not found`);
        }
        const updatedPayment = await this.findOne(id);
        return updatedPayment;
    }
    async remove(id) {
        const payment = await this.findOne(id);
        await payment.destroy();
    }
};
exports.PaymentsService = PaymentsService;
exports.PaymentsService = PaymentsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(payment_entity_1.Payment)),
    __metadata("design:paramtypes", [Object])
], PaymentsService);
//# sourceMappingURL=payments.service.js.map