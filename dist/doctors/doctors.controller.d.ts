import { DoctorsService } from './doctors.service';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';
import { Doctor } from './models/doctors.models';
export declare class DoctorsController {
    private readonly doctorsService;
    constructor(doctorsService: DoctorsService);
    create(createDoctorDto: CreateDoctorDto): Promise<Doctor>;
    findAll(): Promise<Doctor[]>;
    findOne(id: string): Promise<Doctor>;
    update(id: string, updateDoctorDto: UpdateDoctorDto): Promise<Doctor>;
    findbyspec(id: string): Promise<Doctor[]>;
    findByTime(body: {
        startTime: Date;
        finishTime: Date;
    }): Promise<Doctor[]>;
    remove(id: string): Promise<void>;
}
