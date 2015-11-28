'use strict'

import { EventEmitter} from 'events'
import assign from 'react/lib/Object.assign'
import AppDispatcher from '../dispatcher/AppDispatcher'
import MapConstants from '../constants/MapConstants'

const CHANGE_EVENT = "change"

var _highlighted = ''

const MapStore = assign(EventEmitter.prototype, {

  emitChange() {
    this.emit(CHANGE_EVENT)
  },

  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback)
  },

  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback)
  },

  highlightProvince(province) {
    _highlighted = province
  },

  highlightedProvince() {
    return _highlighted
  },

  isProvinceHighlighted(province) {
    return _highlighted === province
  }

})

AppDispatcher.register((action) => {
  switch (action.actionType) {
    case MapConstants.HIGHLIGHT_PROVINCE:
      MapStore.highlightProvince(action.province)
      break;

    default:
      // nothingness
  }

  MapStore.emitChange()
  
  return true
})


module.exports = MapStore
