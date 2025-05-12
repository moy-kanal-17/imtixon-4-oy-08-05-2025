import { PartialType } from "@nestjs/swagger";
import { LabTest } from "../models/lab_test.entity";

export class UpdateLabTestDto extends PartialType(LabTest) {}
