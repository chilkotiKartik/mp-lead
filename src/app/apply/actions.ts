"use server";

import { createApplication } from "@/lib/applications";

export type ApplyFormState = {
  ok: boolean;
  id?: string;
  error?: string;
};

export async function submitApplication(
  _prev: ApplyFormState,
  formData: FormData
): Promise<ApplyFormState> {
  const fullName = String(formData.get("fullName") || "").trim();
  const email = String(formData.get("email") || "").trim();
  const phone = String(formData.get("phone") || "").trim();
  const state = String(formData.get("state") || "").trim();
  const education = String(formData.get("education") || "").trim();
  const experience = String(formData.get("experience") || "").trim();
  const focusArea = String(formData.get("focusArea") || "").trim();
  const motivation = String(formData.get("motivation") || "").trim();

  if (!fullName || !email || !state || !motivation) {
    return { ok: false, error: "Please fill in all required fields." };
  }

  const application = await createApplication({
    fullName,
    email,
    phone,
    state,
    education,
    experience,
    focusArea,
    motivation,
  });

  return { ok: true, id: application.id };
}
