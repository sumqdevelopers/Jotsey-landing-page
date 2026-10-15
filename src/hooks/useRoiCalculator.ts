import { useCallback, useMemo, useState } from "react"
import { defaultRoiInputs } from "@/data/roi"
import { calculateRoi } from "@/lib/roi"
import type { RoiInputs } from "@/types/roi"

export function useRoiCalculator(initialInputs: RoiInputs = defaultRoiInputs) {
  const [inputs, setInputs] = useState<RoiInputs>(initialInputs)

  const setInput = useCallback(
    <K extends keyof RoiInputs>(key: K, value: RoiInputs[K]) => {
      setInputs((previous) => ({ ...previous, [key]: value }))
    },
    [],
  )

  const metrics = useMemo(() => calculateRoi(inputs), [inputs])

  return { inputs, setInput, metrics }
}
