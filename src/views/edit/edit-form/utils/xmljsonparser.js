const xml2js = require('xml2js');

const xmlStringParser = xml2js.parseString;

module.exports = class xmlJsonParser {
  constructor(stub) {
    this.stub = stub;
  }

  toJSON() {
    return new Promise((resolve, reject) => {
      xmlStringParser(this.stub, (err, result) => {
        if (err) reject(err);
        resolve(result);
      });
    });
  }

  toXML() {
    const builder = new xml2js.Builder();
    return builder.buildObject(this.stub);
  }
};
