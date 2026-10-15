export interface RoiInputs {
  providers: number
  visitsPerDay: number
  appointmentMinutes: number
}

export interface RoiMetrics {
  weeklyHours: number
  annualHours: number
  extraAppointments: number
  monthlyRevenue: number
  hoursPerProvider: number
}

export type RoiRangeKey = "providers" | "visitsPerDay"

export interface RoiRangeField {
  key: RoiRangeKey
  label: string
  min: number
  max: number
}
