interface IGitUser {
    name?: string;
    email?: string;
    url?: string;
}
export declare function parseGitSetting(cwd?: string): Promise<IGitUser>;
export {};
