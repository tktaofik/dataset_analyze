// import * as types from '../constants/ActionTypes';

// let initialStates = {
//     dataSets: [],
//     selectedDataSet: null,
//     selectedDataSetTable: null
// };

// export default function addDataReducer(state = initialStates, action) {
//     switch (action.type) {
//         // case types.SAVE_DATA_SETS:
//         //     return Object.assign({}, state, {
//         //         dataSets: [...state.dataSets, ...action.dataSets],
//         //     });
//         case types.UPDATE_DATA_SETS:
//             return Object.assign({}, state, {
//                 dataSets: action.dataSets,
//             });

//         case types.SWITCH_DATASET:
//             return Object.assign({}, state, {
//                 selectedDataSet: action.dataSet
//             });

//         case types.SELECT_TABLE:
//             return Object.assign({}, state, {
//                 selectedDataSetTable: action.table
//             });

//         default:
//             return state;
//     }
// }

import merge from 'lodash/merge';
import { API_DATA_REQUEST, API_DATA_SUCCESS } from '../middleware/api';

const initialState = {
  meta: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case API_DATA_SUCCESS:
      return merge(
        {},
        state,
        merge({}, action.response, { meta: { [action.endpoint]: { loading: false } } }),
      );
    case API_DATA_REQUEST:
      return merge({}, state, { meta: { [action.endpoint]: { loading: true } } });
    default:
      return state;
  }
}
