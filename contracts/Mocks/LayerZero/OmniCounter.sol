pragma solidity ^0.8.4;
pragma abicoder v2;

import "./NonblockingLzApp.sol";

/// @title A LayerZero example sending a cross chain message from a source chain to a destination chain to increment a counter
contract OmniCounter is NonblockingLzApp {
    uint public counter;
    uint256 public value;

    constructor(address _lzEndpoint) NonblockingLzApp(_lzEndpoint) {}

    function _nonblockingLzReceive(uint16 _srcChainId, bytes memory _srcAddress, uint64 _nonce, bytes memory _payload) internal override {
        counter += 1;
        value = abi.decode(_payload, (uint256));
    }

    function incrementCounter(uint16 _dstChainId, uint256 _value) public {
        bytes memory callData = abi.encode(_value);
        _lzSend(_dstChainId, callData, payable(msg.sender), address(0x0), bytes(""));
    }
}