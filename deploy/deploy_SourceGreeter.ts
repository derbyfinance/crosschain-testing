import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { DeployFunction } from 'hardhat-deploy/types';

const func: DeployFunction = async function ({
  getNamedAccounts,
  deployments,
}: HardhatRuntimeEnvironment) {
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();

  const connext = '0xFCa08024A6D4bCc87275b1E4A1E22B71fAD7f649';
  const token = '0x7ea6eA49B0b0Ae9c5db7907d139D9Cd3439862a1';

  await deploy('SourceGreeter', {
    from: deployer,
    args: [connext, token],
    log: true,
    autoMine: true,
  });
};
export default func;
func.tags = ['SourceGreeter'];
