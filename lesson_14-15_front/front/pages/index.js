import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
// import { setIntervalAsync } from "set-interval-async/dynamic";

import { ConnectWallet } from "../components/ConnectWallet";
import { WaitingForTransactionMessage } from "../components/WaitingForTransactionMessage";
import { TransactionErrorMessage } from "../components/TransactionErrorMessage";

import auctionAddress from "../contracts/DutchAuction-contract-address.json";
import auctionArtifact from "../contracts/DutchAuction.json";

const HARDHAT_NETWORK_ID = "1337";
const ERROR_CODE_TX_REJECTED_BY_USER = 4001;

let _provider;
let _auction;
let checkPriceInterval;

export default function Home() {
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [txBeingSent, setTxBeginSent] = useState(null);
  const [networkError, setNetworkError] = useState(null);
  const [transactionError, setTransactionError] = useState(null);
  const [balance, setBalance] = useState(null);
  const [currentPrice, setCurrentPrice] = useState(null);
  const [stopped, setStopped] = useState(false);

  useEffect(() => {
    if (selectedAccount) {
      updateBalance();
    }

    return () => {
      clearInterval(checkPriceInterval);
    };
  }, [selectedAccount]);

  const _connectWallet = async () => {
    if (window.ethereum === undefined) {
      return setNetworkError("Please install Metamask!");
    }

    const [selectedAddress] = await window.ethereum.request({
      method: "eth_requestAccounts",
    });

    if (_checkNetwork()) {
      return;
    }

    _initialize(selectedAddress);

    window.ethereum.on("accountsChanged", ([newAddress]) => {
      if (newAddress === undefined) {
        return _resetState();
      }

      _initialize(newAddress);
    });

    window.ethereum.on("chainChanged", ([networkId]) => {
      _resetState();
    });
  };

  const _initialize = async (selectedAddress) => {
    _provider = new ethers.providers.Web3Provider(window.ethereum);
    _auction = new ethers.Contract(
      auctionAddress.DutchAuction,
      auctionArtifact.abi,
      _provider.getSigner(0)
    );

    if (await updatedStopped()) return;

    setSelectedAccount(selectedAddress);

    const startingPrice = await _auction.startingPrice();
    const startAt = ethers.BigNumber.from(await _auction.startAt());
    const discountRate = await _auction.discountRate();

    checkPriceInterval = setInterval(async () => {
      const elapsed = ethers.BigNumber.from(Math.floor(Date.now() / 1000)).sub(
        startAt
      );
      const discount = discountRate.mul(elapsed);
      const newPrice = startingPrice.sub(discount);

      setCurrentPrice(ethers.utils.formatEther(newPrice));
    }, 1000);

    const startBlockNumber = await _provider.getBlockNumber();

    _auction.on("Bought", (...args) => {
      const event = args[args.length - 1];
      console.log([...args]);
      if (event.blockNumber <= startBlockNumber) return;
    });
  };

  const updateBalance = async () => {
    const newBalance = (await _provider.getBalance(selectedAccount)).toString();
    setBalance(newBalance);
  };

  const updatedStopped = async () => {
    const stopped = await _auction.stopped();

    if (stopped) {
      clearInterval(checkPriceInterval);
    }

    setStopped(stopped);

    return stopped;
  };

  const _checkNetwork = () => {
    if (window.ethereum.networkVersion === HARDHAT_NETWORK_ID) {
      return true;
    }

    setNetworkError("Please connect to localhost:8545");

    return false;
  };

  const _resetState = () => {
    setSelectedAccount(null);
    setTxBeginSent(null);
    setNetworkError(null);
    setTransactionError(null);
    setBalance(null);
  };

  const _dismissNetworkError = () => {
    setNetworkError(null);
  };

  if (!selectedAccount) {
    return (
      <ConnectWallet
        connectWallet={_connectWallet}
        networkError={networkError}
        dismiss={_dismissNetworkError}
      />
    );
  }

  // const nextBlock = async () => {
  //   await _auction.nextBlock();
  // };

  const buy = async () => {
    try {
      const tx = await _auction.buy({
        value: ethers.utils.parseEther(currentPrice),
      });
      setTxBeginSent(tx.hash);

      await tx.wait();
    } catch (error) {
      if (error.code === ERROR_CODE_TX_REJECTED_BY_USER) return;

      setTransactionError(error);
      console.error("transacton error", error);
    } finally {
      setTxBeginSent(null);
      updatedStopped();
    }
  };

  const _getRpcErrorMessage = (error) => {
    if (error.data) {
      return error.data.message;
    }

    return error.message;
  };

  const dismissTransactionError = () => {
    setTransactionError(null);
  };

  if (stopped) return <p>Auction stopped!</p>;

  return (
    <>
      {txBeingSent && <WaitingForTransactionMessage txHash={txBeingSent} />}
      {transactionError && (
        <TransactionErrorMessage
          message={_getRpcErrorMessage(transactionError)}
          dismiss={dismissTransactionError}
        />
      )}
      {balance && <p>Your balance: {ethers.utils.formatEther(balance)} ETH</p>}
      {currentPrice && (
        <div>
          <p>Current item price: {currentPrice} ETH</p>
          <button onClick={buy}>Buy !</button>
        </div>
      )}
    </>
  );
}
