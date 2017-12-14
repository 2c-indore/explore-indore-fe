// import axios from 'axios';

// export const ROOT_URL = 'http://139.59.121.135:8000/odp/api';

export const ActionTypes = {
  REGISTER_EVENT_GA: 'REGISTER_EVENT_GA',
};


export function registerEventGA(category, action, label) {
  return (dispatch) => {
    dispatch({ type: ActionTypes.REGISTER_EVENT_GA, payload: { category, action, label } });
  };
}
