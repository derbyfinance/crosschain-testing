import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { DeployFunction } from 'hardhat-deploy/types';
import { connextArbitrumGoerli } from '../../test/helpers/addresses';

const func: DeployFunction = async function ({
  getNamedAccounts,
  deployments,
}: HardhatRuntimeEnvironment) {
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();

  await deploy('AuthGreeterGoerliArbitrum', {
    from: deployer,
    contract: 'AuthGreeter',
    args: [connextArbitrumGoerli.connext],
    log: true,
    autoMine: true,
  });
};
export default func;
func.tags = ['AuthGreeterGoerliArbitrum'];
