import type { RoiInputs, RoiRangeField } from "@/types/roi"

export const defaultRoiInputs: RoiInputs = {
  providers: 5,
  visitsPerDay: 12,
  appointmentMinutes: 30,
}

export const roiRangeFields: RoiRangeField[] = [
  { key: "providers", label: "Practitioners", min: 1, max: 30 },
  {
    key: "visitsPerDay",
    label: "Appointments / day · per practitioner",
    min: 1,
    max: 25,
  },
]

export const appointmentLengths = [15, 30, 45, 60, 90]
