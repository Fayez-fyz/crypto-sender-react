import HomeComponent from "@/components/home/home.componet";
import SendCryptoForm from "@/schema/send-crypto.form";
import { createEthereumContract } from "@/utils/contractInstance";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { ethers } from "ethers";
import NavbarComponent from "@/components/navbar/navbar.component";
import { toast } from "@/hooks/use-toast";
const HomePage = () => {
  const { ethereum } = window;
  const [account, setAccount] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [transactionList, setTransactionList] = useState([]);
  const form = useForm({
    resolver: zodResolver(SendCryptoForm),
    defaultValues: {
      addressTo: "",
      amount: "",
      keyword: "",
      message: "",
    },
  });

  useEffect(() => {
    checkWalletIsConnected();
    if (ethereum) {
      ethereum.on("accountsChanged", handleAccountChanger);
    }
  }, []);

  const handleAccountChanger = (accounts) => {
    console.log(accounts[0]);
    setAccount(accounts[0]);
  };

  const checkWalletIsConnected = async () => {
    try {
      if (!ethereum) throw new Error("Please install Metamask");
      const provider = new ethers.BrowserProvider(ethereum);
      const accounts = await provider.send("eth_accounts", []);
      if (accounts.length > 0) {
        setAccount(accounts[0]);
       await getTransactionList();
      } 
    } catch (error) {
      console.log(error);
    }
  };

  const connectWallet = async () => {
    try {
      const { signer } = await createEthereumContract();
      console.log(signer);
      setAccount(signer.address);
      await getTransactionList();
      // const balance = await contract.getBalance();
      // console.log(balance);
    } catch (error) {
      console.log(error);
    }
  };

  const sendTransaction = async (data) => {
    try {
      setIsLoading(true);
      const { addressTo, amount, keyword, message } = data;
      const { contract, signer } = await createEthereumContract();
      const parsedAmount = ethers.parseEther(amount);
      console.log(ethers.formatEther(parsedAmount), "Amount in ETH");

      const gasPrice = await signer.provider.getFeeData();
      const increasedGasPrice = (gasPrice.gasPrice * BigInt(120)) / BigInt(100);

      const estimatedGas = await signer.estimateGas({
        to: addressTo,
        value: parsedAmount,
      });

      const sendTransactionResponse = await signer.sendTransaction({
        from: account,
        to: addressTo,
        value: parsedAmount,
        gasLimit: estimatedGas,
        gasPrice: increasedGasPrice,
      });
  
     await sendTransactionResponse.wait();

      const saveToBlockchain = await contract.addToBlockchain(
        addressTo,
        parsedAmount,
        keyword,
        message
      );
      console.log(saveToBlockchain?.hash, "Loading");

      const waitingBlockchain = await saveToBlockchain.wait();
      setIsLoading(false);
      console.log(waitingBlockchain?.hash, "Success");

      form.reset();
      toast({
        title:'Transaction sent',
        description:'Transaction sent successfully',
        })
     await getTransactionList();
    } catch (error) {
      console.log(error);
      toast({
        title:'Transaction failed',
        description:'Transaction failed',
        variant:'destructive'
        })
      setIsLoading(false);
    }
  };

  const getTransactionList = async () => {
    console.log('getTransactionList')
    try {
      const { contract } = await createEthereumContract();
      const transactionList = await contract.getAllTransactions();
      const structuredTransactionList = transactionList.map((transaction) => {
        return {
          addressTo: transaction.receiver,
          addressFrom: transaction.sender,
          amount: ethers.formatEther(transaction.amount),
          keyword: transaction.keyword,
          message: transaction.message,
          timestamp: new Date(
            Number(transaction.timestamp) * 1000
          ).toLocaleString(),
        };
      });
      // console.log(structuredTransactionList,'structuredTransactionList')
      setTransactionList(structuredTransactionList);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="max-w-screen-lg mx-auto  ">
      <NavbarComponent connectWallet={connectWallet} />
      <HomeComponent
        form={form}
        connectWallet={connectWallet}
        onSubmit={sendTransaction}
        account={account}
        isLoading={isLoading}
        transactionList={transactionList}
      />
    </div>
  );
};
export default HomePage;
