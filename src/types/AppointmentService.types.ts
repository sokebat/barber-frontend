export interface Appointment {
  id: string;
  serviceName: string;
  specialistName: string;
  customerName: string;
  appointmentDate: string;
  appointmentTime: string;
  isApproved: boolean;
}

export interface CreateAppointmentDto {
  serviceName: string;
  specialistName: string;
  customerName: string;
  appointmentDate: string;
  appointmentTime: string;
  isApproved?: boolean;
}

export interface UpdateAppointmentDto {
  serviceName?: string;
  specialistName?: string;
  customerName?: string;
  appointmentDate?: string;
  appointmentTime?: string;
  isApproved?: boolean;
}