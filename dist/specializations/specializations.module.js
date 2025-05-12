"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpecializationsModule = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const specialization_models_1 = require("./models/specialization.models");
const specializations_service_1 = require("./specializations.service");
const specializations_controller_1 = require("./specializations.controller");
let SpecializationsModule = class SpecializationsModule {
};
exports.SpecializationsModule = SpecializationsModule;
exports.SpecializationsModule = SpecializationsModule = __decorate([
    (0, common_1.Module)({
        imports: [sequelize_1.SequelizeModule.forFeature([specialization_models_1.Specialization])],
        controllers: [specializations_controller_1.SpecializationsController],
        providers: [specializations_service_1.SpecializationsService],
        exports: [sequelize_1.SequelizeModule, specializations_service_1.SpecializationsService],
    })
], SpecializationsModule);
//# sourceMappingURL=specializations.module.js.map