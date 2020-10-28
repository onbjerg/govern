import { ethers } from '@nomiclabs/buidler'
import { expect } from 'chai'
import { Signer } from 'ethers'
import { Govern } from '../typechain'

const ERRORS = {
  AUTH: 'acl: auth',
}

const EVENTS = {
  EXECUTED: 'Executed',
}

const B32_ZERO = `0x${'00'.repeat(32)}`

describe('Govern', function () {
  let signers: Signer[], owner: string, govern: Govern, governNotOwner: Govern

  before(async () => {
    signers = await ethers.getSigners()
    owner = await signers[0].getAddress()
  })

  beforeEach(async () => {
    const Govern = await ethers.getContractFactory('Govern')
    govern = (await Govern.deploy(owner)) as Govern
    governNotOwner = await govern.connect(signers[1])
  })

  it('owner can exec', async () => {
    await expect(govern.exec([], B32_ZERO, B32_ZERO))
      .to.emit(govern, EVENTS.EXECUTED)
      .withArgs(owner, [], B32_ZERO, B32_ZERO, [])
  })

  it('non-owner cannot exec', async () => {
    await expect(
      governNotOwner.exec([], B32_ZERO, B32_ZERO)
    ).to.be.revertedWith(ERRORS.AUTH)
  })
})
