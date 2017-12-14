import { combineReducers } from 'redux';
import GoogleAnalyticsReducer from './googleAnalyticsReducer';


const rootReducer = combineReducers({
  googleAnalytics: GoogleAnalyticsReducer,
});

export default rootReducer;
