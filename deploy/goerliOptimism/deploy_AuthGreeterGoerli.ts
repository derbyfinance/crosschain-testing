import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { DeployFunction } from 'hardhat-deploy/types';
import { connextOptimism } from '../../test/helpers/addresses';

const func: DeployFunction = async function ({
  getNamedAccounts,
  deployments,
}: HardhatRuntimeEnvironment) {
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();

  await deploy('AuthGreeterGoerliOptimism', {
    from: deployer,
    contract: 'AuthGreeter',
    args: [connextOptimism.connext],
    log: true,
    autoMine: true,
  });
};
export default func;
func.tags = ['AuthGreeterGoerliOptimism'];
