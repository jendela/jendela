'use strict';

import AppDispatcher from '../dispatcher/AppDispatcher';
import MapConstants from '../constants/MapConstants';

var MapActions = {

  highlightProvince(province) {
    AppDispatcher.dispatch({
      actionType: MapConstants.HIGHLIGHT_PROVINCE,
      province: province
    });
  },

  selectProvince(province) {
    AppDispatcher.dispatch({
      actionType: MapConstants.SELECT_PROVINCE,
      province: province
    });
  }

};

module.exports = MapActions;
