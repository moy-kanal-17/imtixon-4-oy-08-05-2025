import { Doctor } from './models/doctors.models';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';
import { Specialization } from 'src/specializations/models/specialization.models';
export declare class DoctorsService {
    private doctorModel;
    private specializationModel;
    constructor(doctorModel: typeof Doctor, specializationModel: typeof Specialization);
    create(createDoctorDto: CreateDoctorDto): Promise<Doctor>;
    findAll(): Promise<Doctor[]>;
    findByspec(specializationId: number): Promise<Doctor[]>;
    findtime(startTime: Date, finishTime: Date): Promise<Doctor[]>;
    findOne(id: number): Promise<Doctor>;
    update(id: number, updateDoctorDto: UpdateDoctorDto): Promise<Doctor>;
    remove(id: number): Promise<void>;
}
