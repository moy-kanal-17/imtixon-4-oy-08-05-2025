import { AppointmentsService } from './appointments.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
export declare class AppointmentsController {
    private readonly appointmentsService;
    constructor(appointmentsService: AppointmentsService);
    create(createAppointmentDto: CreateAppointmentDto): Promise<import("./models/appointment.model").Appointment>;
    findAll(): Promise<import("./models/appointment.model").Appointment[]>;
    findOne(id: string): Promise<import("./models/appointment.model").Appointment>;
    findPatient(id: string): Promise<import("./models/appointment.model").Appointment[]>;
    update(id: string, updateAppointmentDto: UpdateAppointmentDto): Promise<import("./models/appointment.model").Appointment>;
    remove(id: string): Promise<void>;
}
