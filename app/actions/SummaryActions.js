'use strict';

import AppDispatcher from '../dispatcher/AppDispatcher';
import MapConstants from '../constants/MapConstants';

var SummaryActions = {

  populateProvince(province) {
    AppDispatcher.dispatch({
      actionType: MapConstants.POPULATE_PROVINCE,
      province: province
    });
  },

  setCategory(category) {
    AppDispatcher.dispatch({
      actionType: MapConstants.SELECT_CATEGORY,
      category: category
    });
  }

};

module.exports = SummaryActions;
