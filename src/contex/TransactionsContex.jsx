import React, {useEffect, useState} from 'react';
import { ethers } from 'ethers';

import { contractAbi, contactAddress } from '../utils/constants';


export const TransactionContext = React.createContext();

const {ethereum} = window;

const getEthereumContract = () => {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const TransactionContact = new ethers.constants(contactAddress, contractAbi, signer)

    console.log({
        provider,
        signer,
        transationContract
    })
}

export const TransationProvider = ({children}) => {

    const [currentAccount, setCurrentAccount] = useState("")

    const checkIfWalletIsConnected = async () => {

        try{
            if (!ethereum) return alert ("please install metamask");
    
            const accounts = await ethereum.request({method: 'eth_accounts'});
    
            if (accounts.length) {
                setCurrentAccount(accounts[0]);
    
                //getAllTransactions();
            }else {
                console.log("No Accounts found");
            }

        }catch(error){
            console.log(error)
            console.log("No ethereum object")
        }

    }

    const connectWallet = async () => {
        try{
            if (!ethereum) return alert ("please install metamask");
            const accounts = await ethereum.request({method: 'eth_requestAccounts'});
            setCurrentAccount(accounts[0]);

        }catch(error){
            console.log(error)
            throw new Error("No ehereum object")
        }
    }

    useEffect(() => {
        checkIfWalletIsConnected();
    }, []);
    return (
        <TransactionContext.Provider value={{connectWallet, currentAccount}}>
            {children}
        </TransactionContext.Provider>
    )
}