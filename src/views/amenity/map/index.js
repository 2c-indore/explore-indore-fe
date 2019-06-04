import React, { Component } from 'react';
import L from 'leaflet';
import $ from 'jquery';
import { withRouter } from 'react-router-dom';
import cloneDeep from 'lodash.clonedeep';
import 'leaflet-boundary-canvas';
import 'leaflet.markercluster';
import 'leaflet-search';
import 'leaflet-easybutton';
import * as topojson from 'topojson-client';
// import baseBoundary from '../../../static/pokhara-boundary';
import baseBoundary from '../../../static/indore-boundary';
// import boundary from '../../../static/boundary';
import {
  // amenityParameters,
  // nester,
  tagToPopup,
} from '../../../static/map-utils';
import SearchAmenity from './search-amenity';

import './styles.scss';
import './leaflet-search.scss';

// console.log(JSON.stringify(nester(amenityParameters)));


const color = '#3590f3';

const osmURL = 'https://{s}.tile.thunderforest.com/transport/{z}/{x}/{y}.png?apikey=52ce8b5b94d44030a0c6208707611a06';

class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      suggestions: [],
    };

    this.suggestions = [];

    this.addMap = this.addMap.bind(this);
    this.onEdit = this.onEdit.bind(this);
    this.onSearchSelect = this.onSearchSelect.bind(this);
    this.onUpdateDimensions = this.onUpdateDimensions.bind(this);
    // this.addMap = this.addMap.bind(this);
    // this.addMap = this.addMap.bind(this);
  }

  componentWillMount() {
    window.addEventListener('resize', this.onUpdateDimensions);
    const maxWindowHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0) - 65;
    this.setState({ height: maxWindowHeight });


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
        iconSize: [45, 45],
        // popupAnchor: [-1000, -76], // point from which the popup should open relative to the iconAnchor
        // iconAnchor: [25, 50], // point of the icon which will correspond to marker's location
      },
    });
  }


  componentDidMount() {
    this.addMap(this.props.geometries.data.boundary);
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
      this.addBaseLayer(this.props.geometries.data.boundaryWithWards);
      console.log('insideMap>>>>>>>>>>>', this.props.isLoggedIn);
      this.addPois(this.props.geometries.data.pois, this.props.isLoggedIn);
      this.addSearchControl(this.props.geometries.data.pois);
      // this.addWardBoundaries(this.props.geometries.data.boundary);
    // this.addBoundaries();
    }
  }


  componentDidUpdate(prevProps, prevState) {
    // console.log('prevProps', prevProps);
    if (this.props.geometries !== null && this.props.geometries.success === 1) {
      this.map.eachLayer((layer) => {
        if (!layer._url && (layer.name === 'markers')) {
          this.map.removeLayer(layer);
        } else if (layer.name === 'overlay') {
          this.map.removeLayer(layer);
        }
      });

      this.addBaseLayer(this.props.geometries.data.boundary);
      this.addPois(this.props.geometries.data.pois, this.props.isLoggedIn);
      if (prevProps.geometries.data.pois.features.length !== this.props.geometries.data.pois.features.length) {
        this.addSearchControl(this.props.geometries.data.pois);
      }
    }
  }

  onUpdateDimensions() {
    const maxWindowHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0) - 65;
    this.setState({ height: maxWindowHeight });
  }

  onEdit(data) {
    // console.log(this.props);
    this.props.saveEditState({ amenityData: data, type: this.props.type });


    this.props.history.push({ pathname: '/edit', state: { amenityData: data, type: this.props.type } });
  }

  onSearchSelect(coordinates, name) {
    // c(onsole.log(coordinates);

    this.clearHighlightLayers(this.map);

    // if (this.highlightLayer) {
    //   this.map.removeLayer(this.highlightLayer);
    // }

    const highlight = L.circle(L.latLng(coordinates[1], coordinates[0]), { radius: 30, fillColor: color, weight: 1 });
    this.highlightLayer = L.layerGroup([highlight]).addTo(this.map);
    this.highlightLayer.name = 'highlight';
    // }
    // this.map.setZoom(16);
    setTimeout(() => {
      this.map.flyTo(L.latLng(coordinates[1], coordinates[0]), 18);
    }, 0);
  }

  addSearchControl(data) {
    const suggestions = [];
    data.features.forEach((item) => {
      suggestions.push({ name: item.properties.tags.name, coordinates: item.geometry.coordinates });
    });

    this.setState({ suggestions });
  }


  addMap(data) {
    const { onDownload } = this.props;

    const map = L.map(this.node, {    //eslint-disable-line
      zoomSnap: 0.25,
      attributionControl: false,
      maxBounds: L.geoJson(data).getBounds().pad(0.8),
      minZoom: 9,
      // maxZoom: 14,
      // scrollWheelZoom: false,oo
      zoomControl: false,
    });
    this.map = map;


    // console.log('Map Data', data);
    this.map.fitBounds(L.geoJson(data).getBounds());


    // this.map.setZoom(11.5);

    L.tileLayer(osmURL, { opacity: 0.3 }).addTo(this.map);


    L.TileLayer.boundaryCanvas(osmURL, {
      boundary: baseBoundary,
      opacity: 0.5,
    }).addTo(map);

    L.control.scale().addTo(map);

    map.addControl(L.control.zoom({ position: 'topleft' }));

    if (this.props.geometries.data.pois.features.length > 0) {
      L.easyButton('<div class="download-icon"><i class="fas fa-download"></i></div>', () => {
        onDownload();
      }, 'Download this data').addTo(this.map);
    }

    L.control.attribution({ prefix: 'Map designed by <a href="www.kathmandulivinglabs.org" target="_blank" rel="noopener noreferrer">Kathmandu Living Labs</a> | &copy; <a href="http://osm.org/copyright" target="_blank" rel="noopener noreferrer">OpenStreetMap</a> Contributors' }).addTo(this.map); //eslint-disable-line
  }


  addBaseLayer(data) { //eslint-disable-line


    const baseLayer = L.TileLayer.boundaryCanvas(osmURL, {
      boundary: data,
    });

    baseLayer.addTo(this.map);

    baseLayer.name = 'overlay';
    this.map.fitBounds(L.geoJson(data).getBounds());

    L.geoJson(data).setStyle({
      fillOpacity: 0,
      weight: 1.3,
      dashArray: '2,5',
      color: '#333',
    }).addTo(this.map);
  }


  addPois(data, isLoggedIn) {
    // const { map } = this;
    const addIcon = (type) => { //eslint-disable-line
    // console.log('addIcon', type, mapProjectToIcon[type]);
      const icon = new L.LeafIcon({
        iconUrl: `/assets/${this.props.type}.png`,
        // iconUrl: '/assets/hospital.png',
        iconSize: [50, 50],
        // iconOffset: [0, -64],
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
    const { onEdit, map, clearHighlightLayers } = this;

    const dataLayer = L.geoJson(null, {
      style: geoJsonStyle,
      pointToLayer(feature, latlng) {
        return L.marker(latlng, { icon: addIcon(feature.properties.projectSubtitle) });
      },
      onEachFeature(feature, layer) {
        const { tags } = layer.feature.properties;
        // console.log('id', layer.feature);
        const { id } = layer.feature;
        const popupOptions = {
          className: 'custom',
          minWidth: 250,
          maxWidth: 250,
          maxHeight: 350,
          border: 'none',
          autopan: true,
        };
        const str = tagToPopup(type, tags, id, isLoggedIn);
        layer.bindPopup(str, popupOptions);
        layer.on('click', () => {
          layer.openPopup();

          const point = map.latLngToContainerPoint(layer._latlng);
          const newPoint = L.point([point.x - 10, point.y - 100]);
          const newLatLng = map.containerPointToLatLng(newPoint);


          clearHighlightLayers(map);
          //
          // const highlight = L.circle(layer._latlng, { radius: 50, fillColor: color, weight: 1 });
          // const highlightLayer = L.layerGroup([highlight]).addTo(map);
          // highlightLayer.name = 'highlight';

          map.panTo(newLatLng);
        });
        layer.on('mouseover', () => {
          layer.bindTooltip(tags.name === undefined ? '<i>(name unavailable)</i><br/><span class="leaflet-tooltip-text">Click icon for more details</span>' : `${tags.name}<br/><span class="leaflet-tooltip-text">Click icon for more details</span>`, { direction: 'top' }).openTooltip(); //eslint-disable-line
        });
        $('body').on('click', `#popup-btn-${id}`, () => { onEdit(layer.feature); });
      },
    });


    const markers = L.markerClusterGroup({
      disableClusteringAtZoom: 18,
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
    this.markers = markers;

    if (this.props.stateBeforeEdit !== undefined) {
      const { coordinates } = this.props.stateBeforeEdit.amenityData.geometry;

      const coordinatesClone = cloneDeep(coordinates);
      setTimeout(() => {
        this.map.flyTo(L.latLng(coordinatesClone[1], coordinatesClone[0]), 18);
      }, 100);

      // this.map.flyTo()
    }


    // this.setState({ suggestions: suggestionsArray });

    // const searchLayer = L.geoJson(data);
  }

  clearHighlightLayers(map) { // eslint-disable-line
    Object.keys(map._layers).forEach((maplayer, i) => {
      if (map._layers[maplayer].name === 'highlight') {
        map.removeLayer(map._layers[maplayer]);
      }
    });
  }

  render() {
    return (
      <div
      ref={node => this.node = node} //eslint-disable-line
        style={{ maxHeight: this.state.height, minHeight: this.state.height }}
      >

        {this.state.suggestions.length !== 0 && <SearchAmenity data={this.state.suggestions} onNewRequest={this.onSearchSelect} />}
      </div>
    );
  }
}

export default withRouter(Map);
