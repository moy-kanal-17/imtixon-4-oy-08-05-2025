"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateMedicationDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_medication_dto_1 = require("./create-medication.dto");
class UpdateMedicationDto extends (0, swagger_1.PartialType)(create_medication_dto_1.CreateMedicationDto) {
}
exports.UpdateMedicationDto = UpdateMedicationDto;
//# sourceMappingURL=update-medication.dto.js.map