"use client";

type Props = { contractAddress: string };
import { getContract, prepareContractCall, readContract } from "thirdweb";

import { optimism } from "thirdweb/chains";
import { sepolia } from "thirdweb/chains";
import { client } from "@/lib/thirdwebClient";
import { useCallback, useEffect, useMemo } from "react";
import { useActiveAccount, useSendTransaction } from "thirdweb/react";
import { parseUnits } from "ethers";
import { useState } from "react";
import contractABI from "./ABI";

export default function MintButton(props: Props) {
  const {
    mutate: sendTransaction,
    data,
    error,
    status,
    failureReason,
  } = useSendTransaction();

  // get a contract
  const contract = useMemo(
    () =>
      getContract({
        // the client you have created via `createThirdwebClient()`
        client,
        // the chain the contract is deployed on
        chain: sepolia,
        // the contract's address
        //address: "0x94b008aA00579c1307B0EF2c499aD98a8ce58e58", //optimism contract address
        address: "0x1b44F3514812d835EB1BDB0acB33d3fA3351Ee43", //sepolia contract address
        

      }),
    []
  );

  const address = useActiveAccount(); //intenta conseguir la wallet conectada
  const [balance, setBalance] = useState(0n);
  useEffect( () =>{
    async function run(){
      console.log("esta es mi walet mia de mi:")
      console.log(address?.address);

      if (address?.address){
        const balance = await readContract({
          contract: contract,
          method: "function balanceOf(address) view returns (uint256)",
          params: [address.address],
        });
        console.log("balance");
        console.log(balance);
        setBalance(balance);
      }
    } 
    console.log("running");
    run();
  }, [address?.address, contract]); //aca termina el useEffect



  // const onClick = useCallback(async () => {
  //   const transaction = prepareContractCall({
  //     contract,
  //     method: "function mint(address to, uint256 amount)",
  //     params: [
  //       "0x5be2eee4d534298c6f089479c904d6eda18f28f0",
  //       parseUnits("10.5", 18), 
  //     ],
  //   });
  //   sendTransaction(transaction);
  // }, [contract, sendTransaction]);

  console.log(data);
  console.log(error);
  console.log(failureReason);
  console.log(status);

  return (
    <div>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => {
          console.log("here");
          //onClick();
        }}
      >
        { balance.toString() }
      </button>

    </div>
  );
}
