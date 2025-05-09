import { RolesService } from './role.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Role } from './models/role.model';
export declare class RolesController {
    private readonly rolesService;
    constructor(rolesService: RolesService);
    create(createRoleDto: CreateRoleDto): Promise<Role>;
    findAll(): Promise<Role[]>;
    findOne(id: string): Promise<Role>;
    update(id: string, updateRoleDto: UpdateRoleDto): Promise<Role>;
    remove(id: string): Promise<void>;
}
