import axios from 'axios';

const initialState = {
  loading: true,
  type: '',
  insights: null,
  state: null,
  geometries: null,
  parameters: null,
};


// function to generate state object from parameters
const getStateFromParameters = (parameters) => {
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
const LOAD_PARAMETERS = 'LOAD_PARAMETERS';
const IS_LOADING = 'IS_LOADING';
const HAS_LOADED = 'HAS_LOADED';
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
    case LOAD_GEOMETRIES:
      return Object.assign({}, state, { ...state, geometries: { success: 1, data: action.payload.geometries } });
    default: return state;
  }
}

// Action Creators
export function loadState(parameters) {
  return {
    type: LOAD_STATE,
    payload: getStateFromParameters(parameters.parameters),
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
  return (dispatch) => {
    dispatch(isLoading());
    axios.get(`http://preparepokhara.org/api/v2/features?type=${type}`).then((response) => {
      // console.log(response.data);
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


export function updateView(parameters) {
  return (dispatch) => {
    axios.get('http://preparepokhara.org/api/v2/features', { params: parameters }).then((response) => {
      // dispatch(loadState(response.data));
      dispatch(loadInsights(response.data));
      dispatch(loadGeometries(response.data));
      // dispatch(hasLoaded());
    });
  };
}
