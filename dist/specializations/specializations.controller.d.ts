import { SpecializationsService } from './specializations.service';
import { CreateSpecializationDto } from './dto/create-specialization.dto';
import { UpdateSpecializationDto } from './dto/update-specialization.dto';
import { Specialization } from './models/specialization.models';
export declare class SpecializationsController {
    private readonly specializationsService;
    constructor(specializationsService: SpecializationsService);
    create(createSpecializationDto: CreateSpecializationDto): Promise<Specialization>;
    findAll(): Promise<Specialization[]>;
    findOne(id: string): Promise<Specialization>;
    update(id: string, updateSpecializationDto: UpdateSpecializationDto): Promise<Specialization>;
    remove(id: string): Promise<void>;
}
