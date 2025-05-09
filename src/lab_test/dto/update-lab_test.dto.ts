import { PartialType } from '@nestjs/swagger';
import { LabTest } from '../entities/lab_test.entity';

export class UpdateLabTestDto extends PartialType(LabTest) {}
