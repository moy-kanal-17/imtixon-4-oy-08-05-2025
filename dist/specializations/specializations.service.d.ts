import { Specialization } from './models/specialization.models';
import { CreateSpecializationDto } from './dto/create-specialization.dto';
import { UpdateSpecializationDto } from './dto/update-specialization.dto';
export declare class SpecializationsService {
    private specializationModel;
    constructor(specializationModel: typeof Specialization);
    create(createSpecializationDto: CreateSpecializationDto): Promise<Specialization>;
    findAll(): Promise<Specialization[]>;
    findOne(id: number): Promise<Specialization>;
    update(id: number, updateSpecializationDto: UpdateSpecializationDto): Promise<Specialization>;
    remove(id: number): Promise<void>;
}
