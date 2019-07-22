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
