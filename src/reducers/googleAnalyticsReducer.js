import ReactGA from 'react-ga';
import { ActionTypes } from '../actions';

ReactGA.initialize('UA-88774648-4');


const initialState = {
};

const googelAnalyticsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.REGISTER_EVENT_GA:
      console.log('regevent', action.payload.action);
      ReactGA.event(action.payload);

      return state;
    default:
      return state;
  }
};

export default googelAnalyticsReducer;
