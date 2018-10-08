import { exec } from "child_process";
import { join } from "path";

import { parseGitSetting } from "../src/git";

beforeAll(() => {
    // todo: Windows
    const src = join(__dirname, "dummy", "_git");
    const dest = join(__dirname, "dummy", ".git");
    return new Promise(resolve => {
        exec(`cp -r ${src} ${dest}`, () => {
            resolve();
        });
    });
});

test("get user information from git setting", async () => {
    const src = join(__dirname, "dummy");
    const result = await parseGitSetting(src);
    expect(result.name).toBe("Dummy User Name");
    expect(result.email).toBe("dummy@example.com");
    expect(result.url).toBe("https://github.com/dummy-user");
});

afterAll(() => {
    // todo: Windows
    const dest = join(__dirname, "dummy", ".git");
    return new Promise(resolve => {
        exec(`rm -rf ${dest}`, () => {
            resolve();
        });
    });
});
