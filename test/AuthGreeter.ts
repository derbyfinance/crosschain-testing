import { deployments, ethers } from 'hardhat';
import { expect } from 'chai';
import { getContract, getTestnetSigner } from './helpers/helpers';

describe('Testing auth greeter mock setup', () => {
  const setup = deployments.createFixture(
    async ({ deployments, getNamedAccounts, ethers, network }) => {
      await deployments.fixture(['AuthGreeter1', 'AuthGreeter2']);
      const signer = await getTestnetSigner();

      const authGreeter1 = await getContract('AuthGreeter1', 'AuthGreeter');
      const authGreeter2 = await getContract('AuthGreeter2', 'AuthGreeter');
      const connext = await getContract('ConnextMock');

      await Promise.all([
        connext.connect(signer).setDomainLookup(authGreeter1.address, 10),
        connext.connect(signer).setDomainLookup(authGreeter2.address, 100),
        authGreeter1.connect(signer).setTrustedRemoteConnext(100, authGreeter2.address),
        authGreeter2.connect(signer).setTrustedRemoteConnext(10, authGreeter1.address),
      ]);

      return { authGreeter1, authGreeter2 };
    },
  );

  it('Should set greeter', async function () {
    const { authGreeter1, authGreeter2 } = await setup();
    const relayerFee = ethers.utils.parseEther('0.03');
    const greeting = 'mooi';

    console.log(authGreeter1.address);
    await authGreeter1.xUpdateGreeting(authGreeter2.address, 100, greeting, relayerFee, {
      value: relayerFee,
    });

    expect(await authGreeter2.greeting()).to.be.equal(greeting);
  });
});
