const ACMEToken = artifacts.require('ACMEToken');
const Vendor = artifacts.require('Vendor');
const MockAggregatorV3 = artifacts.require('MockAggregatorV3');

module.exports = async (deployer, network, accounts) => {
  await deployer.deploy(ACMEToken);
  await deployer.deploy(MockAggregatorV3);
  await deployer.deploy(Vendor, ACMEToken.address, MockAggregatorV3.address);

  const acmeToken = await ACMEToken.deployed();
  await acmeToken.transfer(
    Vendor.address,
    web3.utils.toWei('1000000', 'ether')
  );
};
