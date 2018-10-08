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
export declare function getLoginUserProfile(opts?: IOption): Promise<IProfile>;
export {};
