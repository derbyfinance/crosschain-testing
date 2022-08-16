// SPDX-License-Identifier: MIT
pragma solidity ^0.8.11;

import "../Connext/interfaces/IXProviderMock.sol";
import "../Connext/interfaces/IXReceiveMock.sol";
import "../../Interfaces/ExternalInterfaces/IConnextHandler.sol"; // https://github.com/connext/nxtp/blob/main/packages/deployments/contracts/contracts/core/connext/interfaces/IConnextHandler.sol
import {XCallArgs, CallParams} from "../../libraries/LibConnextStorage.sol";
import "./NonblockingLzApp.sol";

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

contract LZXProviderMock is IXProviderMock, NonblockingLzApp  {
    using SafeERC20 for IERC20;

    IConnextHandler public immutable connext;
    address public dao;
    address public xReceiveMock;
    uint16 public xReceiveMockChainID;

    uint256 public value; // test

    modifier onlyDao {
      require(msg.sender == dao, "ConnextProvider: only DAO");
      _;
    }

    constructor(address _endpoint, address _dao, address _connextHandler) NonblockingLzApp(_endpoint) {
        dao = _dao;
        connext = IConnextHandler(_connextHandler);
    }

    /// @notice setter for the receiver contract parameters, always needs to be set, could be a list when multiple contracts on the sending chain have to send values.
    /// @param _xReceiveMock address of receiving contract, e.g. xChainController contract to send game totalAllocations to xChainController
    /// @param _xReceiveMockChainID chain id of receiving contract, e.g. ethereum, where the xChainController lives
    function setxReceiveMock(address _xReceiveMock, uint16 _xReceiveMockChainID) external onlyDao {
        xReceiveMock = _xReceiveMock;
        xReceiveMockChainID = _xReceiveMockChainID;
    }
    
    /// @notice Function to send an integer value crosschain
    /// @param _value Value to send crosschain.
    function xSend(
        uint256 _value
    ) external payable {
        bytes memory trustedRemote = trustedRemoteLookup[xReceiveMockChainID]; // same chainID as the provider on the receiverChain 
        require(trustedRemote.length != 0, "LzApp: destination chain is not a trusted source");

        bytes4 selector = bytes4(keccak256("xReceive(uint256)"));    
        bytes memory callData = abi.encodeWithSelector(selector, _value);   
        _lzSend(xReceiveMockChainID, callData, payable(msg.sender), address(0x0), bytes(""));
    }

    function _nonblockingLzReceive(uint16 _srcChainId, bytes memory _srcAddress, uint64 _nonce, bytes memory _payload) internal override {
        (bool success,) = address(this).call(_payload); 
        require(success, "LZXProviderMock: lzReceive: No success"); 
    }

    /// @notice Function to receive value crosschain, onlyExecutor modifier makes sure only xSend can actually send the value
    /// @param _value Value to send crosschain.
    function xReceive(uint256 _value) external {
        IXReceiveMock(xReceiveMock).xReceiveAndSetSomeValue(_value);
    }

    function xTransfer(address to, address asset, uint32 originDomain, uint32 destinationDomain, uint256 amount) external payable {
        IERC20 token = IERC20(asset);    
        require(token.allowance(msg.sender, address(this)) >= amount, "LZXProvider: User must approve amount");
        token.transferFrom(msg.sender, address(this), amount);    
        token.approve(address(connext), amount);

        CallParams memory callParams = CallParams({
            to: to,      
            callData: "",      
            originDomain: originDomain,      
            destinationDomain: destinationDomain,      
            agent: to,      
            recovery: to,      
            forceSlow: false,      
            receiveLocal: false,      
            callback: address(0),      
            callbackFee: 0,      
            relayerFee: 0,      
            slippageTol: 9995    
        });

        XCallArgs memory xcallArgs = XCallArgs({
            params: callParams,      
            transactingAssetId: asset, 
            amount: amount  
        });    
        connext.xcall(xcallArgs);
    }

     receive() external payable {} // for destination gas payments
}