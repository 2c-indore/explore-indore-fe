import { combineReducers } from 'redux';
import AmenityReducer from './state/amenity';
// import GoogleAnalyticsReducer from './googleAnalyticsReducer';


const rootReducer = combineReducers({
  // googleAnalytics: GoogleAnalyticsReducer,
  page: '',
  amenity: AmenityReducer,
});

export default rootReducer;
