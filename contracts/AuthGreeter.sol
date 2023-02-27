// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.15;

import {IXReceiver} from "@connext/smart-contracts/contracts/core/connext/interfaces/IXReceiver.sol";
import {IConnext} from "@connext/smart-contracts/contracts/core/connext/interfaces/IConnext.sol";

import "hardhat/console.sol";

contract AuthGreeter is IXReceiver {
  IConnext public immutable connext;

  mapping(uint32 => address) public trustedRemoteConnext;
  address public dao;
  string public greeting;

  modifier onlySource(address _originSender, uint32 _origin) {
    require(
      _originSender == trustedRemoteConnext[_origin] && msg.sender == address(connext),
      "Not trusted"
    );
    _;
  }

  modifier onlyDao() {
    require(msg.sender == dao, "xProvider: only DAO");
    _;
  }

  modifier onlySelf() {
    require(msg.sender == address(this), "xProvider: only Self");
    _;
  }

  constructor(address _connext) {
    connext = IConnext(_connext);
    dao = msg.sender;
  }

  /** @notice Updates a greeting variable on the DestinationGreeterAuthenticated contract.
   * @param target Address of the DestinationGreeterAuthenticated contract.
   * @param destinationDomain The destination domain ID.
   * @param newGreeting New greeting to update to.
   * @param relayerFee The fee offered to relayers.
   */
  function xUpdateGreeting(
    address target,
    uint32 destinationDomain,
    string memory newGreeting,
    uint256 relayerFee
  ) external payable {
    // Encode the data needed for the target contract call.

    bytes4 selector = bytes4(keccak256("setGreeting(string)"));
    bytes memory callData = abi.encodeWithSelector(selector, newGreeting);

    connext.xcall{value: relayerFee}(
      destinationDomain, // _destination: Domain ID of the destination chain
      target, // _to: address of the target contract
      address(0), // _asset: use address zero for 0-value transfers
      msg.sender, // _delegate: address that can revert or forceLocal on destination
      0, // _amount: 0 because no funds are being transferred
      0, // _slippage: can be anything between 0-10000 because no funds are being transferred
      callData // _callData: the encoded calldata to send
    );
  }

  /** @notice Authenticated receiver function.
   * @param _callData Calldata containing the new greeting.
   */
  function xReceive(
    bytes32 _transferId,
    uint256 _amount,
    address _asset,
    address _originSender,
    uint32 _origin,
    bytes memory _callData
  ) external onlySource(_originSender, _origin) returns (bytes memory) {
    (bool success, ) = address(this).call(_callData);
    require(success, "xReceive: No success");
  }

  /** @notice Internal function to update the greeting.
   * @param newGreeting The new greeting.
   */
  function setGreeting(string memory newGreeting) external onlySelf {
    greeting = newGreeting;
  }

  /// @notice set trusted provider on remote chains, allow owner to set it multiple times.
  /// @param _srcChainId Chain is for remote xprovider, some as the remote receiving contract chain id (xReceive)
  /// @param _srcAddress Address of remote xprovider
  function setTrustedRemoteConnext(uint32 _srcChainId, address _srcAddress) external onlyDao {
    trustedRemoteConnext[_srcChainId] = _srcAddress;
  }
}
