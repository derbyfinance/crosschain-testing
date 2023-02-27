import { connextGoerli } from '../test/helpers/addresses';

import { getContract, getTestnetSigner } from '../test/helpers/helpers';

// set greeting and send funds to mumbai
async function main() {
  const AuthGreeterMumbai = await getContract('AuthGreeterMumbai', 'AuthGreeter');
  const authGreeterGoerli = '0xf8c56205CFfF96C7032ee251d61E1A007cF1aa48';
  const signer = await getTestnetSigner();

  await AuthGreeterMumbai.connect(signer).setTrustedRemoteConnext(
    connextGoerli.id,
    authGreeterGoerli,
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
