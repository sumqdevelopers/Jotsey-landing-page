import type { FaqEntry } from "@/types/content"

export const faqs: FaqEntry[] = [
  {
    question: "Can I edit or review notes before they enter my EHR?",
    answer:
      "Yes. Every draft remains under provider control. Review, edit, and validate the note before sending it to the patient chart.",
  },
  {
    question: "Does Jotsey work with telehealth and in-person visits?",
    answer:
      "Yes. Capture ambient audio in the room or securely stream virtual encounters with the same clinical workflow.",
  },
  {
    question: "Is Jotsey HIPAA compliant?",
    answer:
      "Jotsey uses encryption, access controls, audit logging, and HIPAA-aligned handling of protected health information. BAAs are available.",
  },
  {
    question: "Is patient data used to train shared AI models?",
    answer:
      "No. Your clinical data is isolated and is never used to train shared models without explicit authorization.",
  },
  {
    question: "How quickly can our practice get started?",
    answer:
      "Most providers can record a first encounter on day one. Our practice plan includes workflow mapping and guided EHR rollout.",
  },
]
