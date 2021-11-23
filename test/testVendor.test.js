const Vendor = artifacts.require('Vendor');
const MockAggregatorV3 = artifacts.require('MockAggregatorV3');

contract('Vendor', (accounts) => {
  let vendor;
  let oracle;

  before(async () => {
    vendor = await Vendor.deployed();
    oracle = await MockAggregatorV3.deployed();
  });

  describe('testing balanceOf()', async () => {
    it('successfully returns initial vendor balance', async () => {
      const expectedVendorBalance = web3.utils.toBN('1000000').mul(web3.utils.toBN('10').pow(web3.utils.toBN('18')));
      const actualVendorBalance = await vendor.balanceOf(vendor.address);

      assert.equal(actualVendorBalance.toString(), expectedVendorBalance.toString(), 'invalid vendor balance');
    });
  });

  describe('testing buyTokens()', async () => {
    it('successfully transfers tokens to user upon purchase', async () => {
      const ethValue = web3.utils.toWei('1.337', 'ether');

      await vendor.buyTokens({ value: ethValue, from: accounts[0] });

      const tokensPerEth = await vendor.getLatestTokensPerEth();

      const expectedUserBalance = web3.utils.toBN(ethValue).mul(tokensPerEth);
      const actualUserBalance = await vendor.balanceOf(accounts[0]);

      assert.equal(actualUserBalance.toString(), expectedUserBalance.toString());
    });

    it('correctly deducts tokens from vendor balance user upon purchase', async () => {
      const ethValue = web3.utils.toWei('1.337', 'ether');

      const initialVendorBalance = await vendor.balanceOf(vendor.address);

      await vendor.buyTokens({ value: ethValue, from: accounts[0] });

      const tokensPerEth = await vendor.getLatestTokensPerEth();
      const purchasedTokens = web3.utils.toBN(ethValue).mul(tokensPerEth);

      const expectedVendorBalance = initialVendorBalance.sub(purchasedTokens);
      const actualVendorBalance = await vendor.balanceOf(vendor.address);

      assert.equal(actualVendorBalance.toString(), expectedVendorBalance.toString());
    });

    it('correctly triggers BuyTokens event upon purchase', async () => {
      const ethValue = web3.utils.toWei('1.337', 'ether');

      const receipt = await vendor.buyTokens({ value: ethValue, from: accounts[0] });

      const event = receipt.logs[0];

      const tokensPerEth = await vendor.getLatestTokensPerEth();
      const purchasedTokens = web3.utils.toBN(ethValue).mul(tokensPerEth);

      assert.equal(event.event, 'BuyTokens');
      assert.equal(event.args.buyer, accounts[0]);
      assert.equal(event.args.amountOfEth, ethValue);
      assert.equal(event.args.amountOfTokens, purchasedTokens.toString());
    });

    it('fails when ether value is zero', async () => {
      let err = null

      try {
        await vendor.buyTokens({ from: accounts[0] });
      } catch (error) {
        err = error
      }

      assert.ok(err instanceof Error)
      expect(err.message).to.have.string('Value must be greater than zero');
    });

    it('fails when vendor token balance is less than purchase token amount', async () => {
      let err = null

      try {
        await vendor.buyTokens({ value: web3.utils.toWei('133742', 'ether'), from: accounts[0] });
      } catch (error) {
        err = error
      }

      assert.ok(err instanceof Error)
      expect(err.message).to.have.string('Not enough tokens left');
    });
  });

  describe('testing withdraw()', async () => {
    it('successfully transfers ether to the owner', async () => {
      const initialOwnerBalance = await web3.eth.getBalance(accounts[0]);
      const vendorBalance = await web3.eth.getBalance(vendor.address);

      const receipt = await vendor.withdraw({ from: accounts[0] });
      const tx = await web3.eth.getTransaction(receipt.tx);
      const gas = web3.utils.toBN(receipt.receipt.gasUsed).mul(web3.utils.toBN(tx.gasPrice));

      const expectedOwnerBalance = web3.utils.toBN(initialOwnerBalance).add(web3.utils.toBN(vendorBalance)).sub(gas);
      const actualOwnerBalance = web3.utils.toBN(await web3.eth.getBalance(accounts[0]));

      assert.equal(actualOwnerBalance.toString(), expectedOwnerBalance.toString());
    });
  });

  describe('testing getLatestTokensPerEth()', async () => {
    it('returns correct tokensPerEth value based on the oracle answer', async () => {
      const oracleAnswer = await oracle.answer();

      const expectedPrice =  Math.floor(oracleAnswer.div(web3.utils.toBN(100000000)).toNumber())
      const actualPrice = await vendor.getLatestTokensPerEth();

      assert.equal(actualPrice.toNumber(), expectedPrice);
    });

    it('returns correct tokensPerEth value after the oracle changes the answer', async () => {
      const expectedPrice = 1337;

      await oracle.updateAnswer(expectedPrice * 100000000);

      const actualPrice = await vendor.getLatestTokensPerEth();

      assert.equal(actualPrice.toNumber(), expectedPrice);
    });
  });
});
