import shallowEqual from 'shallowequal';
import {SortArray} from "..";

function areSortArraysEqual<R>(a?: SortArray<R>, b?: SortArray<R>) {
  // Handle multipleSortColumns option
  if (typeof a === 'undefined' && typeof b === 'undefined') {
    return true;
  }

  if (!Array.isArray(a) || !Array.isArray(b) || a.length !== b.length) {
    return false;
  }

  for (let i = 0; i < a.length; ++i) {
    if (!shallowEqual(a[i], b[i])) {
      return false;
    }
  }

  return true;
}

export default areSortArraysEqual;
