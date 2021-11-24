const ACMEToken = artifacts.require('ACMEToken');
const Vendor = artifacts.require('Vendor');
const MockAggregatorV3 = artifacts.require('MockAggregatorV3');

module.exports = async (deployer, network, accounts) => {
  await deployer.deploy(ACMEToken);

  if (network === 'development' || network === 'test') {
    await deployer.deploy(MockAggregatorV3);
    await deployer.deploy(Vendor, ACMEToken.address, MockAggregatorV3.address);
  } else if (network === 'rinkeby' || network === 'rinkeby-fork') {
    await deployer.deploy(Vendor, ACMEToken.address, process.env.RINKEBY_CHAINLINK_DATA_FEED_ADDRESS);
  } else {
    throw new Error('Network not implemented');
  }

  const acmeToken = await ACMEToken.deployed();
  await acmeToken.transfer(
    Vendor.address,
    web3.utils.toWei('1000000', 'ether')
  );
};
