import { appendFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { helpOptions, lgas } from "@/content/campaign";

// Sign-ups land in .data/volunteers.jsonl for now. Swap `persist` for the
// campaign's CRM / Google Sheet / DB once the data desk picks one.
const DATA_DIR = path.join(process.cwd(), ".data");

async function persist(record: Record<string, unknown>) {
  await mkdir(DATA_DIR, { recursive: true });
  await appendFile(path.join(DATA_DIR, "volunteers.jsonl"), JSON.stringify(record) + "\n", "utf8");
}

const validLgas = new Set<string>(lgas.map((l) => l.name));
const validHelp = new Set<string>(helpOptions);

// Nigerian mobile: 0803..., +234803..., 234803...
const PHONE = /^(?:\+?234|0)[789][01]\d{8}$/;

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  const name = String(body.name ?? "").trim();
  const phone = String(body.phone ?? "").replace(/[\s-]/g, "");
  const lga = String(body.lga ?? "");
  const ward = String(body.ward ?? "").trim().slice(0, 80);
  const help = Array.isArray(body.help) ? body.help.map(String).filter((h) => validHelp.has(h)) : [];

  // Honeypot — real people never see this field.
  if (body.company) return Response.json({ ok: true });

  const errors: Record<string, string> = {};
  if (name.length < 3) errors.name = "Please enter your full name.";
  if (!PHONE.test(phone)) errors.phone = "Enter a valid Nigerian phone number.";
  if (!validLgas.has(lga)) errors.lga = "Choose your LGA.";

  if (Object.keys(errors).length) {
    return Response.json({ ok: false, errors }, { status: 422 });
  }

  await persist({ name, phone, lga, ward, help, at: new Date().toISOString() });

  return Response.json({ ok: true });
}
