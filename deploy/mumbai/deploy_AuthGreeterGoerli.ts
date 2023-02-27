import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { DeployFunction } from 'hardhat-deploy/types';
import { connextMumbai } from '../../test/helpers/addresses';

const func: DeployFunction = async function ({
  getNamedAccounts,
  deployments,
}: HardhatRuntimeEnvironment) {
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();

  await deploy('AuthGreeterMumbai', {
    from: deployer,
    contract: 'AuthGreeter',
    args: [connextMumbai.connext],
    log: true,
    autoMine: true,
  });
};
export default func;
func.tags = ['AuthGreeterMumbai'];
