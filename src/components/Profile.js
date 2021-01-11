import { Redirect } from "@reach/router";
import React, { useContext } from "react"
import { UserContext } from '../App'
import { auth } from "../firebase"

const Profile = () => {
    const user = useContext(UserContext)
    const { photoURL, displayName, email } = user

    if (!user) return <Redirect to="/" />

    return (
        <div className="mx-auto w-11/12 md:w-2/4 py-8 px-4 md:px-8">
            <div className="flex border flex-col items-center md:flex-row md:items-start border-blue-400 px-3 py-4">
                <div
                    style={{
                        background:
                            `url(https://www.nj.com/resizer/h8MrN0-Nw5dB5FOmMVGMmfVKFJo=/450x0/smart/cloudfront-us-east-1.images.arcpublishing.com/advancelocal/SJGKVE5UNVESVCW7BBOHKQCZVE.jpg)  no-repeat center center`,
                        backgroundSize: "cover",
                        height: "200px",
                        width: "200px",
                    }}
                    className="border border-blue-300"
                ></div>
                <div className="md:pl-4">
                    <h2 className="text-2xl font-semibold">{displayName}</h2>
                    <h3 className="italic">{email}</h3>
                </div>
            </div>
            <button className="w-full py-3 bg-red-600 mt-4 text-white" onClick={() => auth.signOut()}>Sign out</button>
        </div >
    )
};
export default Profile