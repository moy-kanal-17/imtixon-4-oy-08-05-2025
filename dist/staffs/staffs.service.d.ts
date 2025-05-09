import { Staff } from './models/staff.model';
import { CreateStaffDto } from './dto/create-staff.dto';
import { UpdateStaffDto } from './dto/update-staff.dto';
export declare class StaffsService {
    private staffModel;
    constructor(staffModel: typeof Staff);
    create(createStaffDto: CreateStaffDto): Promise<Staff>;
    createAdmin(createStaffDto: CreateStaffDto): Promise<Staff>;
    findAll(): Promise<Staff[]>;
    findByspec(rolesid: number): Promise<Staff[]>;
    findOne(id: number): Promise<Staff>;
    update(id: number, updateStaffDto: UpdateStaffDto): Promise<Staff>;
    remove(id: number): Promise<void>;
}
