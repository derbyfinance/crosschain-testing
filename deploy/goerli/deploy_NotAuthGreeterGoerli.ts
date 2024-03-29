import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { DeployFunction } from 'hardhat-deploy/types';
import { connextGoerli } from '../../test/helpers/addresses';

const func: DeployFunction = async function ({
  getNamedAccounts,
  deployments,
}: HardhatRuntimeEnvironment) {
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();

  await deploy('NotAuthGreeterGoerli', {
    from: deployer,
    contract: 'NotAuthGreeter',
    args: [connextGoerli.connext],
    log: true,
    autoMine: true,
  });
};
export default func;
func.tags = ['NotAuthGreeterGoerli'];
