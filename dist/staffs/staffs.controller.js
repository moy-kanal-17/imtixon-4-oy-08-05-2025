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
exports.StaffsController = void 0;
const common_1 = require("@nestjs/common");
const staffs_service_1 = require("./staffs.service");
const create_staff_dto_1 = require("./dto/create-staff.dto");
const update_staff_dto_1 = require("./dto/update-staff.dto");
const admin_guard_1 = require("../common/guards/admin.guard");
const Crreator_guard_1 = require("../common/guards/Crreator.guard");
let StaffsController = class StaffsController {
    staffsService;
    constructor(staffsService) {
        this.staffsService = staffsService;
    }
    create(createStaffDto) {
        return this.staffsService.create(createStaffDto);
    }
    createAdmin(createStaffDto) {
        return this.staffsService.createAdmin(createStaffDto);
    }
    findAll() {
        return this.staffsService.findAll();
    }
    findOne(id) {
        return this.staffsService.findOne(+id);
    }
    findByspec(id) {
        return this.staffsService.findByspec(+id);
    }
    update(id, updateStaffDto) {
        return this.staffsService.update(+id, updateStaffDto);
    }
    remove(id) {
        return this.staffsService.remove(+id);
    }
};
exports.StaffsController = StaffsController;
__decorate([
    (0, common_1.UseGuards)(admin_guard_1.AdminGuard),
    (0, common_1.Post)("/staff"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_staff_dto_1.CreateStaffDto]),
    __metadata("design:returntype", void 0)
], StaffsController.prototype, "create", null);
__decorate([
    (0, common_1.Post)("/admin"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_staff_dto_1.CreateStaffDto]),
    __metadata("design:returntype", void 0)
], StaffsController.prototype, "createAdmin", null);
__decorate([
    (0, common_1.UseGuards)(admin_guard_1.AdminGuard),
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], StaffsController.prototype, "findAll", null);
__decorate([
    (0, common_1.UseGuards)(admin_guard_1.AdminGuard),
    (0, common_1.Get)("by/:id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], StaffsController.prototype, "findOne", null);
__decorate([
    (0, common_1.UseGuards)(admin_guard_1.AdminGuard),
    (0, common_1.Get)("/spe/:id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], StaffsController.prototype, "findByspec", null);
__decorate([
    (0, common_1.UseGuards)(Crreator_guard_1.CreatorGuard),
    (0, common_1.Patch)(":id"),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_staff_dto_1.UpdateStaffDto]),
    __metadata("design:returntype", void 0)
], StaffsController.prototype, "update", null);
__decorate([
    (0, common_1.UseGuards)(Crreator_guard_1.CreatorGuard),
    (0, common_1.Delete)(":id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], StaffsController.prototype, "remove", null);
exports.StaffsController = StaffsController = __decorate([
    (0, common_1.Controller)("staffs"),
    (0, common_1.Controller)("staffs"),
    __metadata("design:paramtypes", [staffs_service_1.StaffsService])
], StaffsController);
//# sourceMappingURL=staffs.controller.js.map