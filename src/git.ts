import { exec } from "child_process";
import { promisify } from "util";

const execAsync = promisify(exec);

interface IGitUser {
    name?: string;
    email?: string;
    url?: string;
}

function parseGitResult(stdout: string): IGitUser {
    const result: IGitUser = {};
    for (const line of stdout.split(/(\r\n|\n|\r)/)) {
        if (line.startsWith("user.name=")) {
            result.name = line.slice("user.name=".length);
        } else if (line.startsWith("user.email=")) {
            result.email = line.slice("user.email=".length);
        } else if (line.startsWith("user.url=")) {
            result.url = line.slice("user.url=".length);
        }
    }
    return result;
}

interface IOption {
    cwd?: string;
    file?: string;
}

export async function parseGitSetting(opts: IOption = {}): Promise<IGitUser> {
    const command = "git config -l";
    let result;
    if (opts.cwd) {
        result = await execAsync(command, { cwd: opts.cwd });
    } else if (opts.file) {
        result = await execAsync(`${command} --file ${opts.file}`);
    } else {
        result = await execAsync(command);
    }
    return parseGitResult(result.stdout);
}
