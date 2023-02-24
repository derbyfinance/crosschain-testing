## for testing run npx hardhat node

### deploy all contracts on given network

npx hardhat --network localhost deploy

### deploy all contracts and resets the deployments from scratch

npx hardhat --network localhost deploy --reset

### deploy given contract

npx hardhat --network localhost deploy --tags SourceGreeter

### verify contracts on goerli

npx hardhat --network goerli etherscan-verify

### run scripts on given network

npx hardhat --network goerli run scripts/test.ts
