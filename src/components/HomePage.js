import React, { useContext } from "react"
import { UserContext } from '../App'
import { Router } from "@reach/router"
import SignIn from "./SignIn"
import SignUp from "./SignUp"
import Profile from "./Profile"
import PasswordReset from "./PasswordReset"

function HomePage() {
    const user = useContext(UserContext)
    
    return (
        user
            ? <Profile />
            : <Router>
                <SignUp path="signUp" />
                <SignIn path="/" />
                <PasswordReset path="passwordReset" />
            </Router>

    );
}
export default HomePage