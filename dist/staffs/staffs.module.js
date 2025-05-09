"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StaffsModule = void 0;
const common_1 = require("@nestjs/common");
const staffs_service_1 = require("./staffs.service");
const staffs_controller_1 = require("./staffs.controller");
const staff_model_1 = require("./models/staff.model");
const sequelize_1 = require("@nestjs/sequelize");
let StaffsModule = class StaffsModule {
};
exports.StaffsModule = StaffsModule;
exports.StaffsModule = StaffsModule = __decorate([
    (0, common_1.Module)({
        imports: [sequelize_1.SequelizeModule.forFeature([staff_model_1.Staff])],
        controllers: [staffs_controller_1.StaffsController],
        providers: [staffs_service_1.StaffsService],
        exports: [staffs_service_1.StaffsService]
    })
], StaffsModule);
//# sourceMappingURL=staffs.module.js.map