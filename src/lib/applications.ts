import { promises as fs } from "fs";
import path from "path";
import { randomUUID } from "crypto";

export type Application = {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  state: string;
  education: string;
  experience: string;
  focusArea: string;
  motivation: string;
  status: "Submitted" | "Screening" | "Shortlisted" | "Interview" | "Selected" | "Not Selected";
  submittedAt: string;
};

const DATA_DIR = path.join(process.cwd(), ".data");
const DATA_FILE = path.join(DATA_DIR, "applications.json");

async function ensureStore(): Promise<Application[]> {
  await fs.mkdir(DATA_DIR, { recursive: true });
  try {
    const raw = await fs.readFile(DATA_FILE, "utf-8");
    return JSON.parse(raw) as Application[];
  } catch {
    await fs.writeFile(DATA_FILE, "[]", "utf-8");
    return [];
  }
}

export async function listApplications(): Promise<Application[]> {
  return ensureStore();
}

export async function getApplication(id: string): Promise<Application | undefined> {
  const all = await ensureStore();
  return all.find((a) => a.id === id);
}

export async function createApplication(
  input: Omit<Application, "id" | "status" | "submittedAt">
): Promise<Application> {
  const all = await ensureStore();
  const application: Application = {
    ...input,
    id: randomUUID().slice(0, 8),
    status: "Submitted",
    submittedAt: new Date().toISOString(),
  };
  all.unshift(application);
  await fs.writeFile(DATA_FILE, JSON.stringify(all, null, 2), "utf-8");
  return application;
}
