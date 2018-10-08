import githubProfile from "github-profile";
import { parseGitSetting } from "./git";

interface IProfile {
    name?: string;
    email?: string;
    url?: string;
    githubUserId?: string;
}

interface IOption {
    cwd?: string;
    token?: string;
}

export async function getLoginUserProfile(
    opts: IOption = {}
): Promise<IProfile> {
    const result: IProfile = {};

    const { name, email, url } = await parseGitSetting(opts.cwd);

    result.name = name;
    result.email = email;
    result.url = url;

    if (email) {
        const profile = await githubProfile(email, opts.token);
        result.githubUserId = profile.login;
        if (!result.url) {
            result.url = profile.url;
        }
    }

    return result;
}
