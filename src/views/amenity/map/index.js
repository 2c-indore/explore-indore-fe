import React, { Component } from 'react';
import L from 'leaflet';
import 'leaflet-boundary-canvas';
import 'leaflet.markercluster';
import * as topojson from 'topojson-client';
import boundary from './boundary';

import './styles.scss';

const color = '#3590F3';

const osmURL = 'https://{s}.tile.thunderforest.com/transport/{z}/{x}/{y}.png?apikey=52ce8b5b94d44030a0c6208707611a06';
// const osmURL = 'https://api.mapbox.com/styles/v1/arkoblog/cjh0bqsmw00172rrsbt7caf2e/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiYXJrb2Jsb2ciLCJhIjoiY2pmZ2RsNGpqNDE1OTJxazdrNzVxNnl2ZSJ9.Qj1ryjt2_OWUmlTKlcEmtA'; //eslint-disable-line

class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };

    this.addMap = this.addMap.bind(this);
    // this.addMap = this.addMap.bind(this);
    // this.addMap = this.addMap.bind(this);
  }

  componentWillMount() {
    L.TopoJSON = L.GeoJSON.extend({
      addData(jsonData) {
        if (jsonData.type === 'Topology') {
          for (const key in jsonData.objects) { //eslint-disable-line
            const geojson = topojson.feature(jsonData, jsonData.objects[key]);
            L.GeoJSON.prototype.addData.call(this, geojson);
          }
        } else {
          L.GeoJSON.prototype.addData.call(this, jsonData);
        }
      },
    });

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

  componentDidUpdate() {
    if (this.props.geometries !== null && this.props.geometries.success === 1) {
      // console.log(this.props.geometries);

      if (this.markers && this.baseLayer) {
        this.map.eachLayer((layer) => {
          if (!layer._url) {
            this.map.removeLayer(layer);
          }
        });
      }
      // console.log(this.props.geometries.data);
      this.addBaseLayer(this.props.geometries.data.boundary);
      this.addPois(this.props.geometries.data.pois);
      // this.addWardBoundaries(this.props.geometries.data.boundary);
    // this.addBoundaries();
    }
  }

  addMap() {
    const map = L.map(this.node, {    //eslint-disable-line
      zoomSnap: 0.25,
      attributionControl: false,
      scrollWheelZoom: false,
      zoomControl: false,
    });
    this.map = map;

    this.map.fitBounds(L.geoJson(boundary).getBounds());

    L.tileLayer(osmURL, { opacity: 0.3 }).addTo(this.map);
    L.control.scale().addTo(map);

    map.addControl(L.control.zoom({ position: 'topright' }));
  }


  addBaseLayer(data) { //eslint-disable-line
    const baseLayer = L.TileLayer.boundaryCanvas(osmURL, {
      boundary,
      attribution: '<div class="p-1"><span style="font-size: 0.9rem">दोस्रो नगर सभाबाट पारित नयाँ परियोजनाहरूको नक्सांकन बाँकी छ |</span>' +
  ' <br /> <span>Map developed by <a target = "_blank" href="http://kathmandulivinglabs.org">' +
  'Kathmandu Living Labs</a> using <a href = "http://leafletjs.com" >Leaflet</a>' +
  ' | &copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors </span></div>',
    });

    baseLayer.addTo(this.map);
    this.baseLayer = baseLayer;
  }


  addPois(data) {
    const addIcon = (type) => { //eslint-disable-line
    // console.log('addIcon', type, mapProjectToIcon[type]);
      const icon = new L.LeafIcon({
        iconUrl: '/assets/hospital.png',
      });

      return icon;
    };

    const geoJsonStyle = {
      color: '#888',
      weight: 1,
      opacity: 0.65,
      // fillColor: '#fff',
    };

    // const wardboundary = topojson.feature(data, data.objects.pokhara_boundary);

    const dataLayer = L.geoJson(null, {
      style: geoJsonStyle,
      pointToLayer(feature, latlng) {
        return L.marker(latlng, { icon: addIcon(feature.properties.projectSubtitle) });
      },
    });


    const markers = L.markerClusterGroup({
      // disableClusteringAtZoom: 16,
      // maxClusterRadius: 70,
      // spiderfyDistanceMultiplier: 3,
      // spiderfyOnMaxZoom: true,
      polygonOptions: {
        fillColor: color,
        color,
        fillOpacity: 0.4,
        weight: 1.5,
      },
    });
    dataLayer.addData(data);
    markers.addLayer(dataLayer);
    this.map.addLayer(markers);

    this.markers = markers;
  }

  clearLayers() {
    this.markers.clearLayers();
  }

  render() {
    return (<div
      ref={node => this.node = node} //eslint-disable-line
      style={{ minHeight: '91vh' }}
    />);
  }
}

export default Map;