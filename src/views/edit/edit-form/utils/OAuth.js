const osmAuth = require('osm-auth');
const XmlJsonParser = require('./xmljsonparser');

const osmAPIServer = {

  dev: {
    url: 'https://master.apis.dev.openstreetmap.org',
    secret: '7JWJ7VX8aSo4pIaQrwoamZ4I2p5dMCTZRbtEGmuS',
    key: 'DE7kW4Be3wDvvRyuG4pMslzQUiBZxYKLioRvD04j',
  },

  live: {
    url: 'https://www.openstreetmap.org',
    secret: 'uQgAwuulO4TYpi6Dz53zX3eAypxXikg6K7980E9s',
    key: 'Il7VH5O3UYeW1twJuvogfZPUjH6jYAUhjynTNfPw',
  },
};

const currentEnvironment = osmAPIServer.live;

const osmAuthConfig = {
  oauth_consumer_key: currentEnvironment.key,
  oauth_secret: currentEnvironment.secret,
  auto: true,
  url: currentEnvironment.url,
};


module.exports = class OsmAuth {
  constructor() {
    this.auth = osmAuth(osmAuthConfig);
  }

  xhr(options, cb) {
    return new Promise((resolve, reject) => {
      this.auth.xhr(options, (err, response) => {
        if (err) reject(err);

        if (!response) {
          throw 'No response!';
        }
        const xmlText = new XMLSerializer().serializeToString(response);

        const parser = new XmlJsonParser(xmlText);

        parser.toJSON()
          .then((parsedjson) => {
            resolve(parsedjson);
          })
          .catch((error) => {
            reject(error);
          });
      });
    });
  }

  isLoggedIn() {
    return this.auth.authenticated();
  }

  getFeature(type, id) {
    const options = {
      method: 'GET',
      path: `/api/0.6/${type}/${id}`,
    };

    return new Promise((resolve, reject) => {
      this.xhr(options)
        .then((res) => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  login() {
    const options = {
      method: 'GET',
      path: '/api/0.6/user/details',
    };

    return new Promise((resolve, reject) => {
      this.xhr(options)
        .then((res) => {
          resolve(res);
        }, (err) => {
          reject(err);
        })
        .catch((err)=>{
          reject(err);
        });
    });
  }

  logout() {
    this.auth.logout();
  }

  cleanseData(parsedData, featureType) {
    const deleteProps = ['changeset', 'timestamp', 'uid', 'user'];

    deleteProps.forEach((prop) => {
      delete parsedData.osm[featureType][0].$[prop];
    });

    return parsedData;
  }

  createChangeset(appliedChanges, changeSetComment) {
    const comment = changeSetComment ? `${changeSetComment} #preparepokharawebapp #2CPokhara` : ' #preparepokharawebapp #2CPokhara';
    const xml = `<osm>\
                   <changeset>\
                     <tag k="created_by" v="API 0.6"/>\
                     <tag k="comment" v="${comment}"/>\
                   </changeset>\
                </osm>`;
    const options = {
      method: 'PUT',
      path: '/api/0.6/changeset/create',
      content: xml,
      options: {
        header: {
          'Content-Type': 'text/xml',
        },

      },
    };

    return new Promise((resolve, reject) => {
      this.auth.xhr(options, (err, response) => {
        if (err) reject(err);
        resolve({
          changeset: response,
          appliedChanges,
        });
      });
    });
  }


  applyChanges(changesParameter, response, featureType) {
    const changes = JSON.parse(JSON.stringify(changesParameter));
    const removeTagsAtIndex = [];
    response.osm[featureType][0].tag.forEach((eachtag, index) => {
      if (changes[eachtag.$.k]) {
        eachtag.$.v = changes[eachtag.$.k];
        delete changes[eachtag.$.k];
      } else {
        removeTagsAtIndex.push(index);
      }
    });

    removeTagsAtIndex.forEach((index) => {
      response.osm[featureType][0].tag.splice(index, 1);
    });

    if (Object.keys(changes).length) {
      for (const change in changes) {
        response.osm[featureType][0].tag.push({
          $: {
            k: change,
            v: changes[change],
          },
        });
      }
    }
    return response;
  }

  applyChangeset(changeset, response, featureType) {
    response.osm[featureType][0].$.changeset = changeset;
    const parser = new XmlJsonParser(response);
    return parser.toXML();
  }


  applyEdit(xml, type, id) {
    const options = {
      method: 'PUT',
      path: `/api/0.6/${type}/${id}`,
      content: xml,
      options: {
        header: {
          'Content-Type': 'text/xml',
        },

      },
    };

    return new Promise((resolve, reject) => {
      this.auth.xhr(options, (err, response) => {
        if (err) reject(err);
        resolve(response);
      });
    });
  }
};
