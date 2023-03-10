using System;
using System.Threading.Tasks;
using System.Collections.Generic;
using System.Numerics;
using Nethereum.Hex.HexTypes;
using Nethereum.ABI.FunctionEncoding.Attributes;
using Nethereum.Web3;
using Nethereum.RPC.Eth.DTOs;
using Nethereum.Contracts.CQS;
using Nethereum.Contracts;
using System.Threading;

namespace Solidity.Contracts.MyShop.ContractDefinition
{


    public partial class MyShopDeployment : MyShopDeploymentBase
    {
        public MyShopDeployment() : base(BYTECODE) { }
        public MyShopDeployment(string byteCode) : base(byteCode) { }
    }

    public class MyShopDeploymentBase : ContractDeploymentMessage
    {
        public static string BYTECODE = "608060405234801561001057600080fd5b50600080546001600160a01b03191633179055610194806100326000396000f3fe60806040526004361061003f5760003560e01c806313bea46014610044578063853828b61461005d5780638da5cb5b14610072578063e2982c21146100af575b600080fd5b61005b336000908152600160205260409020349055565b005b34801561006957600080fd5b5061005b6100ea565b34801561007e57600080fd5b50600054610092906001600160a01b031681565b6040516001600160a01b0390911681526020015b60405180910390f35b3480156100bb57600080fd5b506100dc6100ca36600461012e565b60016020526000908152604090205481565b6040519081526020016100a6565b600080546040516001600160a01b039091169130918391833180156108fc02929091818181858888f19350505050158015610129573d6000803e3d6000fd5b505050565b60006020828403121561014057600080fd5b81356001600160a01b038116811461015757600080fd5b939250505056fea2646970667358221220fc2ef4fe293c0abbb5d8125f1120928a77cb43cca365097333f7d53af2eab52f64736f6c63430008110033";
        public MyShopDeploymentBase() : base(BYTECODE) { }
        public MyShopDeploymentBase(string byteCode) : base(byteCode) { }

    }

    public partial class OwnerFunction : OwnerFunctionBase { }

    [Function("owner", "address")]
    public class OwnerFunctionBase : FunctionMessage
    {

    }

    public partial class PayForItemFunction : PayForItemFunctionBase { }

    [Function("payForItem")]
    public class PayForItemFunctionBase : FunctionMessage
    {

    }

    public partial class PaymentsFunction : PaymentsFunctionBase { }

    [Function("payments", "uint256")]
    public class PaymentsFunctionBase : FunctionMessage
    {
        [Parameter("address", "", 1)]
        public virtual string ReturnValue1 { get; set; }
    }

    public partial class WithdrawAllFunction : WithdrawAllFunctionBase { }

    [Function("withdrawAll")]
    public class WithdrawAllFunctionBase : FunctionMessage
    {

    }

    public partial class OwnerOutputDTO : OwnerOutputDTOBase { }

    [FunctionOutput]
    public class OwnerOutputDTOBase : IFunctionOutputDTO 
    {
        [Parameter("address", "", 1)]
        public virtual string ReturnValue1 { get; set; }
    }



    public partial class PaymentsOutputDTO : PaymentsOutputDTOBase { }

    [FunctionOutput]
    public class PaymentsOutputDTOBase : IFunctionOutputDTO 
    {
        [Parameter("uint256", "", 1)]
        public virtual BigInteger ReturnValue1 { get; set; }
    }


}
