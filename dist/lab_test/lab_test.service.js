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
exports.LabTestsService = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const patient_models_1 = require("../patient/models/patient.models");
const lab_test_entity_1 = require("./models/lab_test.entity");
let LabTestsService = class LabTestsService {
    labTestModel;
    constructor(labTestModel) {
        this.labTestModel = labTestModel;
    }
    async create(createLabTestDto) {
        return this.labTestModel.create(createLabTestDto);
    }
    async findAll() {
        return this.labTestModel.findAll({
            include: [
                {
                    model: patient_models_1.Patient,
                    as: "patient",
                    attributes: ["first_name", "last_name"],
                },
            ],
        });
    }
    async findOne(id) {
        const labTest = await this.labTestModel.findByPk(id, {
            include: [{ model: patient_models_1.Patient, as: "patient" }],
        });
        if (!labTest) {
            throw new common_1.NotFoundException(`Lab test with ID ${id} not found`);
        }
        return labTest;
    }
    async findByspec(rolesid) {
        return this.labTestModel.findAll({
            include: [
                {
                    model: patient_models_1.Patient,
                    as: "patient",
                    where: { id: rolesid },
                },
            ],
        });
    }
    async update(id, updateLabTestDto) {
        const [affectedCount] = await this.labTestModel.update(updateLabTestDto, {
            where: { id },
            returning: true,
        });
        if (affectedCount === 0) {
            throw new common_1.NotFoundException(`Lab test with ID ${id} not found`);
        }
        const updatedLabTest = await this.findOne(id);
        return updatedLabTest;
    }
    async remove(id) {
        const labTest = await this.findOne(id);
        await labTest.destroy();
    }
};
exports.LabTestsService = LabTestsService;
exports.LabTestsService = LabTestsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(lab_test_entity_1.LabTest)),
    __metadata("design:paramtypes", [Object])
], LabTestsService);
//# sourceMappingURL=lab_test.service.js.map