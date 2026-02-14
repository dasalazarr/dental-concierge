import { env } from "../config/env";
import { logger } from "./logger";

export interface CalendarSlot {
  start: string;
  end: string;
  available: boolean;
}

export interface AppointmentInput {
  phone: string;
  summary: string;
  start: string;
  end: string;
}

export interface GoogleCalendarConnector {
  checkAvailability(dateISO: string): Promise<CalendarSlot[]>;
  createAppointment(input: AppointmentInput): Promise<{ id: string }>;
}

export class GoogleCalendarService implements GoogleCalendarConnector {
  async checkAvailability(dateISO: string): Promise<CalendarSlot[]> {
    const day = new Date(dateISO);
    const base = new Date(Date.UTC(day.getUTCFullYear(), day.getUTCMonth(), day.getUTCDate(), 15, 0, 0));

    const slots: CalendarSlot[] = [0, 1, 2].map((offset) => {
      const start = new Date(base.getTime() + offset * 60 * 60 * 1000);
      const end = new Date(start.getTime() + 60 * 60 * 1000);
      return {
        start: start.toISOString(),
        end: end.toISOString(),
        available: true
      };
    });

    logger.info("google_calendar_availability_checked", {
      calendarId: env.googleCalendarId,
      dateISO,
      slotsCount: slots.length
    });

    return slots;
  }

  async createAppointment(input: AppointmentInput): Promise<{ id: string }> {
    const appointmentId = `appt_${Date.now()}`;

    logger.info("google_calendar_appointment_created", {
      calendarId: env.googleCalendarId,
      appointmentId,
      input
    });

    return { id: appointmentId };
  }
}
