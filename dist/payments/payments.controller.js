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
exports.PaymentsController = void 0;
const common_1 = require("@nestjs/common");
const payments_service_1 = require("./payments.service");
const create_payment_dto_1 = require("./dto/create-payment.dto");
const update_payment_dto_1 = require("./dto/update-payment.dto");
const swagger_1 = require("@nestjs/swagger");
const payment_entity_1 = require("./entities/payment.entity");
const staffs_guard_1 = require("../common/guards/staffs.guard");
const Self_guard_1 = require("../common/guards/Self.guard");
const admin_guard_1 = require("../common/guards/admin.guard");
const patient_guard_1 = require("../common/guards/patient.guard");
let PaymentsController = class PaymentsController {
    paymentsService;
    constructor(paymentsService) {
        this.paymentsService = paymentsService;
    }
    async create(createPaymentDto) {
        return this.paymentsService.create(createPaymentDto);
    }
    async findAll() {
        return this.paymentsService.findAll();
    }
    async findOne(id) {
        return this.paymentsService.findOne(+id);
    }
    async update(id, updatePaymentDto) {
        return this.paymentsService.update(+id, updatePaymentDto);
    }
    async remove(id) {
        await this.paymentsService.remove(+id);
        return;
    }
};
exports.PaymentsController = PaymentsController;
__decorate([
    (0, swagger_1.ApiCreatedResponse)({
        description: "The record has been successfully created.",
        type: payment_entity_1.Payment,
    }),
    (0, swagger_1.ApiBadRequestResponse)({ description: "Invalid input data." }),
    (0, common_1.UseGuards)(patient_guard_1.PatientGuard),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_payment_dto_1.CreatePaymentDto]),
    __metadata("design:returntype", Promise)
], PaymentsController.prototype, "create", null);
__decorate([
    (0, common_1.UseGuards)(staffs_guard_1.StaffGuard),
    (0, swagger_1.ApiOkResponse)({ description: "List of all payments.", type: [payment_entity_1.Payment] }),
    (0, common_1.UseGuards)(admin_guard_1.AdminGuard),
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PaymentsController.prototype, "findAll", null);
__decorate([
    (0, swagger_1.ApiOkResponse)({ description: "Payment found.", type: payment_entity_1.Payment }),
    (0, swagger_1.ApiNotFoundResponse)({ description: "Payment not found." }),
    (0, swagger_1.ApiParam)({ name: "id", type: "number", description: "Payment ID" }),
    (0, common_1.UseGuards)(Self_guard_1.SelfOrStaffGuard),
    (0, common_1.Get)(":id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PaymentsController.prototype, "findOne", null);
__decorate([
    (0, swagger_1.ApiOkResponse)({
        description: "Payment updated successfully.",
        type: payment_entity_1.Payment,
    }),
    (0, swagger_1.ApiNotFoundResponse)({ description: "Payment not found." }),
    (0, swagger_1.ApiBadRequestResponse)({ description: "Invalid input data." }),
    (0, swagger_1.ApiParam)({ name: "id", type: "number", description: "Payment ID" }),
    (0, common_1.UseGuards)(Self_guard_1.SelfOrStaffGuard),
    (0, common_1.Patch)(":id"),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_payment_dto_1.UpdatePaymentDto]),
    __metadata("design:returntype", Promise)
], PaymentsController.prototype, "update", null);
__decorate([
    (0, common_1.UseGuards)(Self_guard_1.SelfOrStaffGuard),
    (0, swagger_1.ApiOkResponse)({ description: "Payment deleted successfully." }),
    (0, swagger_1.ApiNotFoundResponse)({ description: "Payment not found." }),
    (0, swagger_1.ApiParam)({ name: "id", type: "number", description: "Payment ID" }),
    (0, common_1.Delete)(":id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PaymentsController.prototype, "remove", null);
exports.PaymentsController = PaymentsController = __decorate([
    (0, swagger_1.ApiTags)("Payments"),
    (0, common_1.Controller)("payments"),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    __metadata("design:paramtypes", [payments_service_1.PaymentsService])
], PaymentsController);
//# sourceMappingURL=payments.controller.js.map