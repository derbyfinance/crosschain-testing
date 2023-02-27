import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { DeployFunction } from 'hardhat-deploy/types';

const func: DeployFunction = async function ({
  getNamedAccounts,
  deployments,
}: HardhatRuntimeEnvironment) {
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();

  const connext = await deployments.get('ConnextMock');

  await deploy('AuthGreeter2', {
    from: deployer,
    contract: 'AuthGreeter',
    args: [connext.address],
    log: true,
    autoMine: true,
  });
};
export default func;
func.tags = ['AuthGreeter2'];
func.dependencies = ['ConnextMock'];
