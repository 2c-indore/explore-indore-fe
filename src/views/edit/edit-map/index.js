import React, { Component } from 'react';
import L from 'leaflet';


// import './styles.scss';


const osmURL = 'https://{s}.tile.thunderforest.com/transport/{z}/{x}/{y}.png?apikey=52ce8b5b94d44030a0c6208707611a06';


class EditMap extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
    this.addMap = this.addMap.bind(this);
  }

  componentWillMount() {
    L.LeafIcon = L.Icon.extend({
      options: {
        iconSize: [50, 50],
        // popupAnchor: [-1000, -76], // point from which the popup should open relative to the iconAnchor
        // iconAnchor: [25, 50], // point of the icon which will correspond to marker's location
      },
    });
  }

  componentDidMount() {
    this.addMap();
  }

  addMap() {
    const map = L.map(this.node, {    //eslint-disable-line
      zoomSnap: 0.25,
      attributionControl: false,
      scrollWheelZoom: false,
      zoomControl: false,
    });
    this.map = map;

    this.map.fitBounds(L.geoJson(this.props.data).getBounds());

    L.tileLayer(osmURL, { opacity: 1 }).addTo(this.map);
    L.control.scale().addTo(map);

    map.addControl(L.control.zoom({ position: 'topright' }));

    const addIcon = (type) => { //eslint-disable-line
    // console.log('addIcon', type, mapProjectToIcon[type]);
      const icon = new L.LeafIcon({
        iconUrl: `/assets/${this.props.type}.png`,
      });

      return icon;
    };

    L.marker([this.props.data.geometry.coordinates[1], this.props.data.geometry.coordinates[0]], { icon: addIcon(this.props.type) }).addTo(map);
  }

  render() {
    return (<div
      ref={node => this.node = node} //eslint-disable-line
      style={{ minHeight: '91vh' }}
    />);
  }
}

export default EditMap;
