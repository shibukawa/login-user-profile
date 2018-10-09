import { join } from "path";

import { parseGitSetting } from "../src/git";

test("get user information from git setting", async () => {
    const src = join(__dirname, "dummy", "_git", "config");
    const result = await parseGitSetting({ file: src });
    expect(result.name).toBe("Dummy User Name");
    expect(result.email).toBe("dummy@example.com");
    expect(result.url).toBe("https://github.com/dummy-user");
});
