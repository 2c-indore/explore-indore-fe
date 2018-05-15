import axios from 'axios';

export const a = 'a';

export function submitData(data) {
  return (dispatch) => {
    axios.post('http://preparepokhara.org/api/v2/features', { params: data }).then((response) => {
      // dispatch(loadState(response.data));
      // dispatch(loadInsights(response.data));
      // dispatch(loadGeometries(response.data));
      // dispatch(hasLoaded());
    });
  };
}
