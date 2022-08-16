/* eslint-disable prettier/prettier */
import { deployContract } from "ethereum-waffle";
import { Signer, BigNumber } from "ethers";
import type { 
  ConnextXProviderMock,
  ConnextExecutorMock,
  ConnextHandlerMock,
  XReceiveMock,
  XSendMock,
  LZEndpointMock,
  LZXProviderMock
 } from '../../typechain-types';

import ConnextXProviderMockArtifact from '../../artifacts/contracts/Mocks/Connext/ConnextXProviderMock.sol/ConnextXProviderMock.json';
import ConnextExecutorMockArtifact from '../../artifacts/contracts/Mocks/Connext/ConnextExecutorMock.sol/ConnextExecutorMock.json';
import ConnextHandlerMockArtifact from '../../artifacts/contracts/Mocks/Connext/ConnextHandlerMock.sol/ConnextHandlerMock.json';
import LZEndpointMockArtifact  from "../../artifacts/contracts/Mocks/LayerZero/LZEndpointMock.sol/LZEndpointMock.json";
import LZXProviderMockArtifact  from "../../artifacts/contracts/Mocks/LayerZero/LZXProviderMock.sol/LZXProviderMock.json";
import XReceiveMockArtifact from '../../artifacts/contracts/Mocks/XReceiveMock.sol/XReceiveMock.json';
import XSendMockArtifact from '../../artifacts/contracts/Mocks/XSendMock.sol/XSendMock.json';

export const deployConnextXProviderMock = (deployerSign: Signer, executorAddress: string, daoAddress: string, connextAddress: string): Promise<ConnextXProviderMock> => {
  return (deployContract(deployerSign, ConnextXProviderMockArtifact, [executorAddress, daoAddress, connextAddress])) as Promise<ConnextXProviderMock>;
};

export const deployConnextExecutorMock = (deployerSign: Signer, handlerAddress: string): Promise<ConnextExecutorMock> => {
  return (deployContract(deployerSign, ConnextExecutorMockArtifact, [handlerAddress])) as Promise<ConnextExecutorMock>;
}

export const deployConnextHandlerMock = (deployerSign: Signer, daoAddress: string): Promise<ConnextHandlerMock> => {
  return (deployContract(deployerSign, ConnextHandlerMockArtifact, [daoAddress])) as Promise<ConnextHandlerMock>;
}

export const deployLZEndpointMock = (deployerSign: Signer, chainID: number): Promise<LZEndpointMock> => {
  return (deployContract(deployerSign, LZEndpointMockArtifact, [chainID])) as Promise<LZEndpointMock>
}

export const deployLZXProviderMock = (deployerSign: Signer, endpointAddress: string, daoAddress: string, connextAddress: string): Promise<LZXProviderMock> => {
  return (deployContract(deployerSign, LZXProviderMockArtifact, [endpointAddress, daoAddress, connextAddress])) as Promise<LZXProviderMock>
}

export const deployXReceiveMock = (deployerSign: Signer, daoAddress: string): Promise<XReceiveMock> => {
  return (deployContract(deployerSign, XReceiveMockArtifact, [daoAddress])) as Promise<XReceiveMock>;
}

export const deployXSendMock = (deployerSign: Signer, daoAddress: string): Promise<XSendMock> => {
  return (deployContract(deployerSign, XSendMockArtifact, [daoAddress])) as Promise<XSendMock>;
}


