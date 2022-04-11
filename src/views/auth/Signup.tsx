import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import validator from "validator";
import { URL } from "libs/constants";
import web3, { isWeb3Enable } from "libs/web3";
import Auth from "api/auth";
import { useAuth } from "contexts/AuthContext";
import iconLogo from "assets/img/svg/logo.svg";
import iconMetamask from "assets/img/svg/metamask.svg";

const Signup = () => {
    var signupButton;
    var errMessage;
    const navigate = useNavigate();
    const [ name, setName ] = useState<string>("");
    const [ email, setEmail ] = useState<string>("");
    const [ password, setPassword ] = useState<string>("");
    const [ error, setError ] = useState<string>("");
    const { logIn } = useAuth();

    const handleChangeName = e => setName(e.target.value);
    const handleChangeEmail = e => setEmail(e.target.value);
    const handleChangePassword = e => setPassword(e.target.value);

    useEffect(() => {
        Auth.me().then(res => navigate(URL.HOME)).catch(err => {});
    }, [navigate]);

    const signUp = (e) => {
        e.preventDefault();
        signupButton.disabled = true;
        errMessage.style.display = 'none';
        if(!validator.isLength(name, { min: 2 })) {
            errMessage.style.display = 'block';
            signupButton.disabled = false;
            setError("Name must be at least 2 characters");
        }
        else if(!validator.isEmail(email)) {
            errMessage.style.display = 'block';
            signupButton.disabled = false;
            setError("Input email correctly.");
        }
        else if(!validator.isLength(password, { min: 8 })) {
            errMessage.style.display = 'block';
            signupButton.disabled = false;
            setError("Password must be at least 8 characters");
        }
        else {
            Auth.signup({ name, email, password })
            .then(res => {
                logIn(res.data.token);
                errMessage.style.display = 'none';
                navigate(URL.EMAIL_VERIFY);
                signupButton.disabled = false;
            })
            .catch(err => {
                errMessage.style.display = 'block';
                signupButton.disabled = false;
                if(!err.response) setError("You're offline.");
                else if(err.response.status === 409) setError(err.response.data.message);
                else setError(err);
            });
        }
    }
    const handleMetamaskSignup = () => {
        if(!isWeb3Enable) {
            alert('Please install metamask.');
            return;
        }
        web3.eth.requestAccounts()
        .then(users => Auth.getMetamaskToken(users[0]))
        .then(async res => {
            let address = res.data.address;
            let signature = await web3!.eth.personal.sign(
                `Please sign the message to authenticate.\ntoken: ${res.data.randomkey}`,
                address,
                ''
            );
            return { address, signature };
        })
        .then(res => Auth.signupMetamask(res))
        .then(res => {
            logIn(res.data.token);
            navigate(URL.HOME);
        })
        .catch(err => alert(err.message));
    }

    return (
        <div className="flex justify-center py-40 text-sm">
            <form onSubmit={signUp} className="flex flex-col items-center w-[350px]">
                <Link to={URL.HOME}><img src={iconLogo} className="w-8" alt="" /></Link>
                <div className="pt-6 text-2xl font-bold">Create an account</div>
                <div className="pt-3 text-gray-500">Welcome! You must be Ape Gorilla holder to sign up.</div>
                <div className="flex flex-col w-full pt-6">
                    <div className="pb-1 font-bold">Name*</div>
                    <input type="text" value={name} onChange={handleChangeName} className="w-full py-2 px-3 focus:outline-none border-[1px] border-slate-200" placeholder="Enter your name" autoComplete="true" />
                </div>
                <div className="flex flex-col w-full pt-6">
                    <div className="pb-1 font-bold">Email*</div>
                    <input type="email" value={email} onChange={handleChangeEmail} className="w-full py-2 px-3 focus:outline-none border-[1px] border-slate-200" placeholder="Enter your email" autoComplete="true" />
                </div>
                <div className="flex flex-col w-full py-6">
                    <div className="pb-1 font-bold">Password*</div>
                    <input type="password" value={password} onChange={handleChangePassword} className="w-full py-2 px-3 focus:outline-none border-[1px] border-slate-200" placeholder="Enter your password" autoComplete="true" />
                    <div className="pt-2 text-gray-500">Must be at least 8 characters.</div>
                </div>
                <div ref={el => errMessage = el} className="hidden w-full py-3 mb-6 text-center bg-red-400">{error}</div>
                <button type="submit" ref={el => signupButton = el} className="w-full py-2 font-bold text-white bg-teal-700 disabled:opacity-50">Sign up</button>
                <button type="button" onClick={handleMetamaskSignup} className="flex justify-center w-full py-2 mt-3 border-[1px] border-slate-200">
                    <img src={iconMetamask} alt="" />
                    <div className="pl-1 font-bold border-slate-200">Sign in with Metamask</div>
                </button>
                <div className="pt-6 text-gray-500">
                    Already have an account?
                    <Link to={URL.LOGIN} className="pl-1 font-bold text-teal-700">Sign in</Link>
                </div>
            </form>
        </div>
    )
}

export default Signup;