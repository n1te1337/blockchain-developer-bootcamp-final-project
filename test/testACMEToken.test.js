const ACMEToken = artifacts.require('ACMEToken');

contract('ACMEToken', (accounts) => {
  let token;

  before(async () => {
    token = await ACMEToken.new();
  });

  describe('testing token creation', async () => {
    it('successfully mints 1,000,000 tokens', async () => {
      const expectedTotalSupply = web3.utils.toBN('1000000').mul(web3.utils.toBN('10').pow(web3.utils.toBN('18')));
      const actualTotalSupply = await token.totalSupply();

      assert.equal(actualTotalSupply.toString(), expectedTotalSupply.toString());
    });
  });
});