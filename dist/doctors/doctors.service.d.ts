import { Doctor } from './models/doctors.models';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';
export declare class DoctorsService {
    private doctorModel;
    constructor(doctorModel: typeof Doctor);
    create(createDoctorDto: CreateDoctorDto): Promise<Doctor>;
    findAll(): Promise<Doctor[]>;
    findByspec(specializationId: number): Promise<Doctor[]>;
    findOne(id: number): Promise<Doctor>;
    update(id: number, updateDoctorDto: UpdateDoctorDto): Promise<Doctor>;
    remove(id: number): Promise<void>;
}
