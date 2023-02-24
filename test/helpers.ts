import { Contract } from 'ethers';
import { deployments, ethers, getNamedAccounts } from 'hardhat';

export async function getContract(contractName: string, contractType?: string): Promise<Contract> {
  const deployment = await deployments.get(contractName);
  const contract = await ethers.getContractAt(
    contractType ? contractType : contractName,
    deployment.address,
  );

  return contract;
}

export async function getTestnetSigner() {
  const { deployer } = await getNamedAccounts();
  return ethers.provider.getSigner(deployer);
}
