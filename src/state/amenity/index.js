import axios from 'axios';

const initialState = {
  loading: true,
  type: '',
  insights: null,
  state: null,
  geometries: null,
  parameters: null,
  downloads: { success: 0 },
  stateBeforeEdit: undefined,
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

// const UPDATE_INSIGHTS_AND_MAPS = 'UPDATE_INSIGHTS_AND_MAP';


// Reducer
export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    // do reducer stuff
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
export function loadState(parameters) {
  console.log('parameters', parameters.parameters);

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
  console.log('type', type);
  return (dispatch) => {
    dispatch(isLoading());
    // axios.get(`http://192.168.10.72:5080/api/amenities/data?type=${type}`).then((response) => {
    axios.get(`http://159.65.10.210:5080/api/amenities/data?type=${type}`).then((response) => {
    // axios.get(`https://preparepokhara.org/api/v2/features?type=${type}`).then((response) => {
      console.log('data', response.data);
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
    axios.get('http://159.65.10.210:5080/api/amenities/data', { params: parameters }).then((response) => {
      dispatch(loadInsights(response.data));
      dispatch(loadGeometries(response.data));
    });
  };
}


export function downloadData(parameters) {
  return (dispatch) => {
    dispatch(loadingLinks());
    axios.get('https://preparepokhara.org/api/v2/features/download', { params: parameters }).then((response) => {
      dispatch(loadedLinks(response.data));
    });
  };
}
