import { asset } from "@/lib/asset"
import type { WorkflowStep } from "@/types/content"

export const workflowSteps: WorkflowStep[] = [
  {
    title: "Capture",
    description: "Securely stream the visit from any device with 240ms live latency.",
    image: asset("/assets/images/01_capture-1800.jpg"),
    imageAlt:
      "Live session streaming a patient conversation with a real-time transcript, beside a phone recording the visit",
  },
  {
    title: "Validate",
    description: "Jotsey turns the clinical dialogue into a structured SOAP draft.",
    image: asset("/assets/images/02_validate-1800.jpg"),
    imageAlt:
      "Clinical dialogue transformed into a drafted SOAP note with subjective, objective, assessment and plan",
  },
  {
    title: "Send",
    description: "Review once, then place the signed note directly into your EHR.",
    image: asset("/assets/images/03_send-1800.jpg"),
    imageAlt:
      "Signed note syncing to the EHR, with every SOAP section confirmed as successfully transferred",
  },
]
