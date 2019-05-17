/**
 * @module mazey-ui/js
 * @author 钱程 <mazey@mazey.net>
 * @description 常用的数据结构, 方法
 * */

import DataStructure from './js/data-structure/index'
import Deal from './js/deal/index'

// default
export default {
  // Data structure
  Set: DataStructure.MSet,
  // Deal
  join: Deal.mJoin,
  renderTable: Deal.mRenderTable,
  getHashQueryParam: Deal.mGetHashQueryParam,
  camelCaseToKebabCase: Deal.mCamelCaseToKebabCase,
  getDomain: Deal.mGetDomain,
  getTrim: Deal.mGetTrim,
  trim: Deal.mTrim,
  newLine: Deal.mNewLine,
  deepCopyObject: Deal.mDeepCopyObject,
  generateRndNum: Deal.mGenerateRndNum,
  generateUniqueNum: Deal.mGenerateUniqueNum,
  resetForm: Deal.mResetForm,
  floatToPercent: Deal.mFloatToPercent,
  floatFixed: Deal.mFloatFixed,
  compatibleExist: Deal.mCompatibleExist,
  cancelBubble: Deal.mCancelBubble,
  hasClass: Deal.mHasClass,
  addClass: Deal.mAddClass,
  removeClass: Deal.mRemoveClass,
  throttle: Deal.mThrottle,
  debounce: Deal.mDebounce,
  friendlyInterval: Deal.mFriendlyInterval,
  updateQueryStringParameter: Deal.mUpdateQueryStringParameter,
  isJsonString: Deal.mIsJsonString,
  getUrlParam: Deal.mGetUrlParam,
  getSearchQueryParam: Deal.mGetSearchQueryParam,
}

// Data structure
// 集合
export const MSet = DataStructure.MSet

// Deal
export const mJoin = Deal.mJoin
export const mRenderTable = Deal.mRenderTable
export const mGetHashQueryParam = Deal.mGetHashQueryParam
export const mCamelCaseToKebabCase = Deal.mCamelCaseToKebabCase
export const mGetDomain = Deal.mGetDomain
export const mGetTrim = Deal.mGetTrim
export const mTrim = Deal.mTrim
export const mNewLine = Deal.mNewLine
export const mDeepCopyObject = Deal.mDeepCopyObject
export const mGenerateRndNum = Deal.mGenerateRndNum
export const mGenerateUniqueNum = Deal.mGenerateUniqueNum
export const mResetForm = Deal.mResetForm
export const mFloatToPercent = Deal.mFloatToPercent
export const mFloatFixed = Deal.mFloatFixed
export const mCompatibleExist = Deal.mCompatibleExist
export const mCancelBubble = Deal.mCancelBubble
export const mHasClass = Deal.mHasClass
export const mAddClass = Deal.mAddClass
export const mRemoveClass = Deal.mRemoveClass
export const mThrottle = Deal.mThrottle
export const mDebounce = Deal.mDebounce
export const mFriendlyInterval = Deal.mFriendlyInterval
export const mUpdateQueryStringParameter = Deal.mUpdateQueryStringParameter
export const mIsJsonString = Deal.mIsJsonString
export const mGetUrlParam = Deal.mGetUrlParam
export const mGetSearchQueryParam = Deal.mGetSearchQueryParam
