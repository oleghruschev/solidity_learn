using System;
using System.Threading.Tasks;
using System.Collections.Generic;
using System.Numerics;
using Nethereum.Hex.HexTypes;
using Nethereum.ABI.FunctionEncoding.Attributes;
using Nethereum.Web3;
using Nethereum.RPC.Eth.DTOs;
using Nethereum.Contracts.CQS;
using Nethereum.Contracts.ContractHandlers;
using Nethereum.Contracts;
using System.Threading;
using Solidity.Contracts.MyShop.ContractDefinition;

namespace Solidity.Contracts.MyShop
{
    public partial class MyShopService
    {
        public static Task<TransactionReceipt> DeployContractAndWaitForReceiptAsync(Nethereum.Web3.Web3 web3, MyShopDeployment myShopDeployment, CancellationTokenSource cancellationTokenSource = null)
        {
            return web3.Eth.GetContractDeploymentHandler<MyShopDeployment>().SendRequestAndWaitForReceiptAsync(myShopDeployment, cancellationTokenSource);
        }

        public static Task<string> DeployContractAsync(Nethereum.Web3.Web3 web3, MyShopDeployment myShopDeployment)
        {
            return web3.Eth.GetContractDeploymentHandler<MyShopDeployment>().SendRequestAsync(myShopDeployment);
        }

        public static async Task<MyShopService> DeployContractAndGetServiceAsync(Nethereum.Web3.Web3 web3, MyShopDeployment myShopDeployment, CancellationTokenSource cancellationTokenSource = null)
        {
            var receipt = await DeployContractAndWaitForReceiptAsync(web3, myShopDeployment, cancellationTokenSource);
            return new MyShopService(web3, receipt.ContractAddress);
        }

        protected Nethereum.Web3.Web3 Web3{ get; }

        public ContractHandler ContractHandler { get; }

        public MyShopService(Nethereum.Web3.Web3 web3, string contractAddress)
        {
            Web3 = web3;
            ContractHandler = web3.Eth.GetContractHandler(contractAddress);
        }

        public Task<string> OwnerQueryAsync(OwnerFunction ownerFunction, BlockParameter blockParameter = null)
        {
            return ContractHandler.QueryAsync<OwnerFunction, string>(ownerFunction, blockParameter);
        }

        
        public Task<string> OwnerQueryAsync(BlockParameter blockParameter = null)
        {
            return ContractHandler.QueryAsync<OwnerFunction, string>(null, blockParameter);
        }

        public Task<string> PayForItemRequestAsync(PayForItemFunction payForItemFunction)
        {
             return ContractHandler.SendRequestAsync(payForItemFunction);
        }

        public Task<string> PayForItemRequestAsync()
        {
             return ContractHandler.SendRequestAsync<PayForItemFunction>();
        }

        public Task<TransactionReceipt> PayForItemRequestAndWaitForReceiptAsync(PayForItemFunction payForItemFunction, CancellationTokenSource cancellationToken = null)
        {
             return ContractHandler.SendRequestAndWaitForReceiptAsync(payForItemFunction, cancellationToken);
        }

        public Task<TransactionReceipt> PayForItemRequestAndWaitForReceiptAsync(CancellationTokenSource cancellationToken = null)
        {
             return ContractHandler.SendRequestAndWaitForReceiptAsync<PayForItemFunction>(null, cancellationToken);
        }

        public Task<BigInteger> PaymentsQueryAsync(PaymentsFunction paymentsFunction, BlockParameter blockParameter = null)
        {
            return ContractHandler.QueryAsync<PaymentsFunction, BigInteger>(paymentsFunction, blockParameter);
        }

        
        public Task<BigInteger> PaymentsQueryAsync(string returnValue1, BlockParameter blockParameter = null)
        {
            var paymentsFunction = new PaymentsFunction();
                paymentsFunction.ReturnValue1 = returnValue1;
            
            return ContractHandler.QueryAsync<PaymentsFunction, BigInteger>(paymentsFunction, blockParameter);
        }

        public Task<string> WithdrawAllRequestAsync(WithdrawAllFunction withdrawAllFunction)
        {
             return ContractHandler.SendRequestAsync(withdrawAllFunction);
        }

        public Task<string> WithdrawAllRequestAsync()
        {
             return ContractHandler.SendRequestAsync<WithdrawAllFunction>();
        }

        public Task<TransactionReceipt> WithdrawAllRequestAndWaitForReceiptAsync(WithdrawAllFunction withdrawAllFunction, CancellationTokenSource cancellationToken = null)
        {
             return ContractHandler.SendRequestAndWaitForReceiptAsync(withdrawAllFunction, cancellationToken);
        }

        public Task<TransactionReceipt> WithdrawAllRequestAndWaitForReceiptAsync(CancellationTokenSource cancellationToken = null)
        {
             return ContractHandler.SendRequestAndWaitForReceiptAsync<WithdrawAllFunction>(null, cancellationToken);
        }
    }
}
