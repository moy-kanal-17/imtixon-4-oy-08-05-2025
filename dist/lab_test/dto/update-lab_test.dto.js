"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateLabTestDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const lab_test_entity_1 = require("../models/lab_test.entity");
class UpdateLabTestDto extends (0, swagger_1.PartialType)(lab_test_entity_1.LabTest) {
}
exports.UpdateLabTestDto = UpdateLabTestDto;
//# sourceMappingURL=update-lab_test.dto.js.map