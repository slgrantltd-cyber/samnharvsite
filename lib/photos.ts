import { existsSync } from "node:fs";
import { join } from "node:path";

/**
 * Photos land in public/photos as the user supplies them; pages render the
 * real image when the file exists and the marked placeholder otherwise.
 * (Static pages pick up new files on the next build / dev reload.)
 */
export function photoPath(name: string): string | null {
  const file = join(process.cwd(), "public", "photos", name);
  return existsSync(file) ? `/photos/${name}` : null;
}
