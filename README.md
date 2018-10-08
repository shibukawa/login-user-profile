# login-user-info

[![TypeScript](https://badges.frapsoft.com/typescript/code/typescript.png?v=101)](https://github.com/ellerbrock/typescript-badges/)
[![Build Status](https://travis-ci.org/shibukawa/login-user-profile.svg?branch=master)](https://travis-ci.org/shibukawa/login-user-profile)

This package gets current user info:

```js
import { getLoginUserProfile } from "login-user-profile";

async function main() {
    const profile = await getLoginUserProfile();
    // profile.name = "User Name"
    // profile.email = "user@example.com"
    // profile.githubUserId = "example-user"
    // profile.url = "http://github.com/example-user"
}

main();
```

This package guesses user name and email address, url from git config. And then, get user id
