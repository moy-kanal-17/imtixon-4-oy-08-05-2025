"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdatePrescriptionDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_prescription_dto_1 = require("./create-prescription.dto");
class UpdatePrescriptionDto extends (0, swagger_1.PartialType)(create_prescription_dto_1.CreatePrescriptionDto) {
}
exports.UpdatePrescriptionDto = UpdatePrescriptionDto;
//# sourceMappingURL=update-prescription.dto.js.map