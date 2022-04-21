import React from "react";
import web3, { isWeb3Enable } from "libs/web3";

const WalletAddressInput = ({value, onChange}: {value?: string, onChange: Function}) => {

    const handleClick = () => {
        if(!isWeb3Enable) return;
        web3.eth.requestAccounts()
        .then(users => onChange(users[0]))
        .catch(err => window.console.log(err.message));
    }
    return (
        <button
            onClick={handleClick}
            className="text-left rounded-[4px] text-gray-500 w-full py-2 px-3 focus:outline-none border-[1px] border-slate-200"
        >{isWeb3Enable ? value || "Enter your wallet address" : 'Please install metamask'}</button>
    )
}

export default WalletAddressInput;