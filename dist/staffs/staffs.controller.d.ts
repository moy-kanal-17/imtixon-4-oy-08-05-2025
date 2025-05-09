import { StaffsService } from './staffs.service';
import { CreateStaffDto } from './dto/create-staff.dto';
import { UpdateStaffDto } from './dto/update-staff.dto';
export declare class StaffsController {
    private readonly staffsService;
    constructor(staffsService: StaffsService);
    create(createStaffDto: CreateStaffDto): Promise<import("./models/staff.model").Staff>;
    createAdmin(createStaffDto: CreateStaffDto): Promise<import("./models/staff.model").Staff>;
    findAll(): Promise<import("./models/staff.model").Staff[]>;
    findOne(id: string): Promise<import("./models/staff.model").Staff>;
    findByspec(id: string): Promise<import("./models/staff.model").Staff[]>;
    update(id: string, updateStaffDto: UpdateStaffDto): Promise<import("./models/staff.model").Staff>;
    remove(id: string): Promise<void>;
}
