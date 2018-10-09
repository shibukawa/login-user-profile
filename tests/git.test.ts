import { exec } from "child_process";
import { join } from "path";
import sleep from "sleep-promise";
import { promisify } from "util";

const execAsync = promisify(exec);

import { parseGitSetting } from "../src/git";

beforeAll(async () => {
    // todo: Windows
    const src = join(__dirname, "dummy", "_git");
    const dest = join(__dirname, "dummy", ".git");
    await execAsync(`cp -r ${src} ${dest}`);
    await sleep(500);
});

test("get user information from git setting", async () => {
    const src = join(__dirname, "dummy");
    const result = await parseGitSetting(src);
    expect(result.name).toBe("Dummy User Name");
    expect(result.email).toBe("dummy@example.com");
    expect(result.url).toBe("https://github.com/dummy-user");
});

afterAll(async () => {
    // todo: Windows
    const dest = join(__dirname, "dummy", ".git");
    await exec(`rm -rf ${dest}`);
    await sleep(500);
});
