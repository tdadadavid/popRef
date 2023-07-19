import { CurrentUser } from "./current.user";
import { SignIn } from "./signIn.user";
import { SignUp } from "./signup.user";


export const signIn = new SignIn("Users" as any);
export const currentUser = new CurrentUser();
// export const signUp = new SignUp("Users" as any);