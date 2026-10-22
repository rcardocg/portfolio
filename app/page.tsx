import { readFile } from "node:fs/promises";
import path from "node:path";
import Desktop from "@/components/desktop/Desktop";

export default async function Home() {
  const logo = await readFile(path.join(process.cwd(), "public/images/sheep.txt"), "utf8");
  return <Desktop logo={logo} />;
}
