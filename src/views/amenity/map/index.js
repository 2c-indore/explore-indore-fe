import React, { Component } from 'react';
import L from 'leaflet';
import $ from 'jquery';
import { withRouter } from 'react-router-dom';
import 'leaflet-boundary-canvas';
import 'leaflet.markercluster';
import 'leaflet-easybutton';
import * as topojson from 'topojson-client';
import boundary from '../../../static/boundary';
import { tagToPopup } from '../../../static/map-utils';

import './styles.scss';


// console.log('nested', JSON.stringify(nester(amenityParameters)));

const color = '#3590F3';

const osmURL = 'https://{s}.tile.thunderforest.com/transport/{z}/{x}/{y}.png?apikey=52ce8b5b94d44030a0c6208707611a06';

class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };

    this.addMap = this.addMap.bind(this);
    this.onEdit = this.onEdit.bind(this);
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
    if (this.props.geometries !== null && this.props.geometries.success === 1) {
      // console.log(this.props.geometries);

      this.map.eachLayer((layer) => {
        if (!layer._url && (layer.name === 'markers')) {
          this.map.removeLayer(layer);
        } else if (layer.name === 'overlay') {
          this.map.removeLayer(layer);
        }
      });

      // console.log(this.props.geometries.data);
      this.addBaseLayer(this.props.geometries.data.boundary);
      this.addPois(this.props.geometries.data.pois);
      // this.addWardBoundaries(this.props.geometries.data.boundary);
    // this.addBoundaries();
    }
  }


  componentDidUpdate() {
    if (this.props.geometries !== null && this.props.geometries.success === 1) {
      this.map.eachLayer((layer) => {
        if (!layer._url && (layer.name === 'markers')) {
          this.map.removeLayer(layer);
        } else if (layer.name === 'overlay') {
          this.map.removeLayer(layer);
        }
      });

      this.addBaseLayer(this.props.geometries.data.boundary);
      this.addPois(this.props.geometries.data.pois);
    }
  }

  onEdit(data) {
    // console.log(this.props);

    this.props.history.push({ pathname: '/edit', state: { amenityData: data, type: this.props.type } });
  }

  addMap() {
    const { onDownload } = this.props;

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

    map.addControl(L.control.zoom({ position: 'topleft' }));
    L.easyButton('<div class="download-icon"><i class="fas fa-download"></i></div>', () => {
      onDownload();
    }, 'Download this data').addTo(map);
  }


  addBaseLayer(data) { //eslint-disable-line

    const baseLayer = L.TileLayer.boundaryCanvas(osmURL, {
      boundary: data,
      attribution: '<div class="p-1"><span style="font-size: 0.9rem">दोस्रो नगर सभाबाट पारित नयाँ परियोजनाहरूको नक्सांकन बाँकी छ |</span>' +
  ' <br /> <span>Map developed by <a target = "_blank" href="http://kathmandulivinglabs.org">' +
  'Kathmandu Living Labs</a> using <a href = "http://leafletjs.com" >Leaflet</a>' +
  ' | &copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors </span></div>',
    });

    baseLayer.addTo(this.map);


    baseLayer.name = 'overlay';
    this.map.fitBounds(L.geoJson(data).getBounds());
  }


  addPois(data) {
    const addIcon = (type) => { //eslint-disable-line
    // console.log('addIcon', type, mapProjectToIcon[type]);
      const icon = new L.LeafIcon({
        iconUrl: `/assets/${this.props.type}.png`,
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
    const { type } = this.props;
    const { onEdit } = this;

    const dataLayer = L.geoJson(null, {
      style: geoJsonStyle,
      pointToLayer(feature, latlng) {
        return L.marker(latlng, { icon: addIcon(feature.properties.projectSubtitle) });
      },
      onEachFeature(feature, layer) {
        const { tags } = layer.feature.properties;
        const id = layer.feature.id.split('/')[1];
        const popupOptions = {
          className: 'custom',
          minWidth: 250,
          maxWidth: 250,
          maxHeight: 400,
          border: 'none',
        };
        const str = tagToPopup(type, tags, id);
        layer.bindPopup(str, popupOptions);
        $('body').on('click', `#popup-btn-${id}`, () => { onEdit(layer.feature); });
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
    markers.name = 'markers';
  }

  render() {
    return (<div
      ref={node => this.node = node} //eslint-disable-line
      style={{ minHeight: '91vh' }}
    />);
  }
}

export default withRouter(Map);
