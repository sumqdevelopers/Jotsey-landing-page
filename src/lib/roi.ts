import type { RoiInputs, RoiMetrics } from "@/types/roi"

const WORKDAYS_PER_WEEK = 5
const MIN_MINUTES_SAVED_PER_VISIT = 8
const DOCUMENTATION_SHARE_OF_VISIT = 0.16
const REVENUE_PER_APPOINTMENT = 95
const WEEKS_PER_MONTH = 4
const WORKING_WEEKS_PER_YEAR = 48

export function calculateRoi({
  providers,
  visitsPerDay,
  appointmentMinutes,
}: RoiInputs): RoiMetrics {
  const minutesSavedPerVisit = Math.max(
    MIN_MINUTES_SAVED_PER_VISIT,
    appointmentMinutes * DOCUMENTATION_SHARE_OF_VISIT,
  )
  const weeklyHours =
    (providers * visitsPerDay * WORKDAYS_PER_WEEK * minutesSavedPerVisit) / 60
  const extraAppointments = Math.round((weeklyHours * 60) / appointmentMinutes)

  return {
    weeklyHours,
    annualHours: weeklyHours * WORKING_WEEKS_PER_YEAR,
    extraAppointments,
    monthlyRevenue: extraAppointments * REVENUE_PER_APPOINTMENT * WEEKS_PER_MONTH,
    hoursPerProvider: weeklyHours / providers,
  }
}
