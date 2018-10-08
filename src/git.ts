import { exec } from "child_process";

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

export async function parseGitSetting(cwd?: string): Promise<IGitUser> {
    const command = "git config -l";
    return new Promise<IGitUser>((resolve, reject) => {
        if (cwd) {
            exec(command, { cwd }, (err, stdout) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(parseGitResult(stdout));
            });
        } else {
            exec(command, (err, stdout) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(parseGitResult(stdout));
            });
        }
    });
}
