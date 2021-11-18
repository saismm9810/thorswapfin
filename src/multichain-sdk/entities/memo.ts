import { MULTICHAIN_DECIMAL } from '../constants/decimals'
import { Amount } from './amount'
import { Asset } from './asset'
import { Percent } from './percent'

export class Memo {
  /**
   * Cannot be constructed.
   */
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private constructor() {}

  public static swapMemo(asset: Asset, address = '', limit?: Amount) {
    const { chain } = asset
    const { symbol } = asset

    // should be standard 1e8 format, even for ETH chain assets
    // 1. get asset amount
    // 2. switch to 1e8 base amount
    const limitString = limit
      ? limit.mul(MULTICHAIN_DECIMAL).assetAmount.toFixed(0)
      : ''

    return `SWAP:${chain}.${symbol}:${address}:${limitString}`
  }

  public static depositMemo(asset: Asset, address = '') {
    const { chain } = asset
    const { symbol } = asset

    return `ADD:${chain}.${symbol}:${address}`
  }

  public static withdrawMemo(
    asset: Asset,
    percent: Percent,
    targetAsset?: Asset,
  ) {
    const { chain } = asset
    const { symbol } = asset

    const target = targetAsset ? `:${targetAsset.toString()}` : ''

    // multiply percent by 100
    return `WITHDRAW:${chain}.${symbol}:${percent
      .mul(100)
      .assetAmount.toNumber()}${target}`
  }

  public static upgradeMemo(address: string) {
    return `SWITCH:${address}`
  }
}
