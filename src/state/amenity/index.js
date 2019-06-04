import axios from 'axios';

const ROOT_URL = 'http://159.65.10.210:5080';

const initialState = {
  auth: {
    isLoggedIn: false,
  },
  loading: true,
  type: '',
  insights: null,
  state: null,
  geometries: null,
  parameters: null,
  downloads: { success: 0 },
  stateBeforeEdit: undefined,
  notif: {
    isOpen: false,
    message: '',
  },
};


// function to generate state object from parameters
export const getStateFromParameters = (parameters) => {
  const stateObject = {};
  Object.keys(parameters).forEach((item) => {
    if (parameters[item].type === 'single-select') {
      const parameterName = parameters[item].parameter_name; //eslint-disable-line
      stateObject[parameterName] = parameters[item].options[0].value;  //eslint-disable-line
    }

    if (parameters[item].type === 'range') {
      const parameterName = parameters[item].parameter_name; //eslint-disable-line
      stateObject[parameterName] = parameters[item].range;
    }

    if (parameters[item].type === 'multi-select') {
      // console.log(parameters[item]);
      const subObject = {};
      parameters[item].options.forEach((option) => {
        subObject[option.value] = false;
      });

      stateObject[parameters[item].parameter_name] = subObject;
    }
  });


  return stateObject;
};

// Actions
const LOAD_STATE = 'LOAD_STATE';
const UPDATE_TYPE = 'UPDATE_TYPE';
const LOAD_INSIGHTS = 'LOAD_INSIGHTS';
const LOAD_GEOMETRIES = 'LOAD_GEOMETRIES';
const LOADING_GEOMETRIES = 'LOADING_GEOMETRIES';
const LOAD_PARAMETERS = 'LOAD_PARAMETERS';
const IS_LOADING = 'IS_LOADING';
const HAS_LOADED = 'HAS_LOADED';
const DOWNLOAD_LINKS_GENERATED = 'DOWNLOAD_LINKS_GENERATED';
const DOWNLOAD_LINKS_GENERATING = 'DOWNLOAD_LINKS_GENERATING';
const EDIT_LOCATION = 'EDIT_LOCATION';
const RESET_EDIT_LOCATION = 'RESET_EDIT_LOCATION';
export const AUTH_USER = 'AUTH_USER';
const DEAUTH_USER = 'DEAUTH_USER';
const FETCH_USER = 'FETCH_USER'; // fetch user profile
const ADD_NOTIF = 'ADD_NOTIF'; // fetch user profile
const CLOSE_NOTIF = 'CLOSE_NOTIF'; // fetch user profile
// const UPDATE_INSIGHTS_AND_MAPS = 'UPDATE_INSIGHTS_AND_MAP';


// Reducer
export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    // do reducer stuff••
    case AUTH_USER:
      return Object.assign({}, state, { ...state, auth: { ...state.auth, isLoggedIn: true } });
    case DEAUTH_USER:
      return Object.assign({}, state, { ...state, auth: { isLoggedIn: false } });

    case FETCH_USER:

      return Object.assign({}, state, { ...state, auth: { ...state.auth, ...action.payload } });

    case ADD_NOTIF:
      return Object.assign({}, state, { ...state, notif: { isOpen: true, message: action.message } });

    case CLOSE_NOTIF:
      return Object.assign({}, state, { ...state, notif: { isOpen: false, message: '' } });

    case IS_LOADING:
      return Object.assign({}, state, { ...state, loading: true });
    case HAS_LOADED:
      return Object.assign({}, state, { ...state, loading: false });
    case UPDATE_TYPE:
      return Object.assign({}, state, { ...state, type: action.payload });
    case LOAD_STATE:
      return Object.assign({}, state, { ...state, state: action.payload });
    case LOAD_PARAMETERS:
      return Object.assign({}, state, { ...state, parameters: { success: 1, data: action.payload.parameters } });
    case LOAD_INSIGHTS:
      return Object.assign({}, state, { ...state, insights: { success: 1, data: action.payload.insights } });
    case LOADING_GEOMETRIES:
      return Object.assign({}, state, { ...state, geometries: { success: 0 } });

    case LOAD_GEOMETRIES:
      // console.log('INLOAD', action.payload);
      return Object.assign({}, state, { ...state, geometries: { success: 1, data: action.payload.geometries } });
    case DOWNLOAD_LINKS_GENERATING:
      return Object.assign({}, state, { ...state, downloads: { success: 0 } });
    case DOWNLOAD_LINKS_GENERATED:
      return Object.assign({}, state, { ...state, downloads: { success: 1, data: { csvlink: action.payload.csvlink, geojsonlink: action.payload.geojsonlink } } });
    case EDIT_LOCATION:
      return Object.assign({}, state, { ...state, stateBeforeEdit: action.payload });
    case RESET_EDIT_LOCATION:
      return Object.assign({}, state, { ...state, stateBeforeEdit: undefined });
    default: return state;
  }
}


// Action Creators
export function fetchUser(history) {
  return (dispatch) => {
    // const token = localStorage.getItem('token');
    axios.get(`${ROOT_URL}/api/users/profile`, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }).then((response) => {
      dispatch({
        type: FETCH_USER,
        payload: response.data.data,
      });
    }).catch((error) => {
      // silent
    });
  };
}

export function editData(id, data) {
  return (dispatch) => {
    // const token = localStorage.getItem('token');
    axios.put(`${ROOT_URL}/api/amenities/update/${id}`, data, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }).then((response) => {
      console.log(response);
    }).catch((error) => {
      // silent
    });
  };
}


export function addNotif(message) {
  return (dispatch) => {
    // const token = localStorage.getItem('token');
    dispatch({
      type: ADD_NOTIF,
      message,
    });
  };
}

export function closeNotif() {
  return (dispatch) => {
    // const token = localStorage.getItem('token');
    dispatch({
      type: CLOSE_NOTIF,
    });
  };
}


export function authenticateUser(user, history) {
  return (dispatch) => {
    axios.post(`${ROOT_URL}/api/users/authenticate`, user).then((response) => {
      // console.log(response);

      if (response.data.success === 1) {
        localStorage.setItem('token', response.data.token);
        history.go(-1);
        dispatch(fetchUser());
        dispatch({ type: AUTH_USER });
        dispatch(addNotif(response.data.message));

        setTimeout(() => {
          dispatch(closeNotif());
        }, 100);
      } else {
        dispatch(addNotif(response.data.message));
      }
      // localStorage.setItem('role', response.data.role);
    }).catch((error) => {
      dispatch(addNotif('There was an error'));
      // Silent
    });
  };
}

export function addNewUser(user, history) {
  return (dispatch) => {
    axios.post(`${ROOT_URL}/api/admin/users/create`, user, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }).then((response) => {
      console.log(response);

      if (response.data.success === 1) {
        localStorage.setItem('token', response.data.token);
        history.go(-1);
        dispatch(addNotif(response.data.message));

        // dispatch(fetchUser());
        // dispatch({ type: AUTH_USER });
      } else {
        dispatch(addNotif(response.data.message));
      }
      // localStorage.setItem('role', response.data.role);
    }).catch((error) => {
      dispatch(addNotif('There was an error. Try again.'));

      // Silent
    });
  };
}

export function deauthenticateUser() {
  return (dispatch) => {
    localStorage.removeItem('token');
    dispatch(addNotif('You have logged out successfully.'));

    dispatch({ type: DEAUTH_USER });
  };
}


export function loadState(parameters) {
  // console.log('parameters', parameters.parameters);

  // const parameterObject = {};
  // parameters.filters.forEach((item, i) => {
  //   parameterObject[i] = item;
  // });

  return {
    type: LOAD_STATE,
    payload: getStateFromParameters(parameters.parameters),
  };
}


export function saveEditState(editState) {
  return {
    type: EDIT_LOCATION,
    payload: editState,
  };
}

export function removeEditState() {
  return {
    type: RESET_EDIT_LOCATION,
  };
}

export function loadParameters(parameters) {
  return {
    type: LOAD_PARAMETERS,
    payload: parameters,
  };
}

export function loadInsights(parameters) {
  return {
    type: LOAD_INSIGHTS,
    payload: parameters,
  };
}
export function loadGeometries(parameters) {
  return {
    type: LOAD_GEOMETRIES,
    payload: parameters,
  };
}

export function updateState(newState) {
  return {
    type: LOAD_STATE,
    payload: newState,
  };
}

export function updateType(newState) {
  return {
    type: UPDATE_TYPE,
    payload: newState,
  };
}

export function isLoading() {
  return {
    type: IS_LOADING,
  };
}

export function hasLoaded() {
  return {
    type: HAS_LOADED,
  };
}

export function initializeView(type) {
  // console.log('type', type);
  return (dispatch) => {
    dispatch(isLoading());
    // axios.get(`http://192.168.10.72:5080/api/amenities/data?type=${type}`).then((response) => {
    axios.get(`${ROOT_URL}/api/amenities/data?type=${type}`).then((response) => {
    // axios.get(`https://preparepokhara.org/api/v2/features?type=${type}`).then((response) => {
      // console.log('data', response.data);
      dispatch(updateType(type));
      dispatch(loadState(response.data));
      dispatch(loadParameters(response.data));
      dispatch(loadInsights(response.data));
      dispatch(loadGeometries(response.data));
      dispatch(hasLoaded());
      setTimeout(() => {
      }, 100);
    });
  };
}


export function loadedLinks(payload) {
  return {
    type: DOWNLOAD_LINKS_GENERATED,
    payload,
  };
}

export function loadingLinks() {
  return {
    type: DOWNLOAD_LINKS_GENERATING,
  };
}

export function loadingGeometries() {
  return {
    type: LOADING_GEOMETRIES,
  };
}


export function updateView(parameters) {
  return (dispatch) => {
    dispatch(loadingGeometries());
    // axios.get('https://preparepokhara.org/api/v2/features', { params: parameters }).then((response) => {
    axios.get(`${ROOT_URL}/api/amenities/data`, { params: parameters }).then((response) => {
      dispatch(loadInsights(response.data));
      dispatch(loadGeometries(response.data));
    });
  };
}


export function downloadData(parameters) {
  return (dispatch) => {
    dispatch(loadingLinks());
    axios.get(`${ROOT_URL}/api/amenities/download`, { params: parameters }).then((response) => {
      dispatch(loadedLinks(response.data));
    });
  };
}
