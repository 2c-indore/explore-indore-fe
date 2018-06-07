import React, { Component } from 'react';
import AutoComplete from 'material-ui/AutoComplete';

// import './styles.scss';

class SearchAmenity extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    const dataSourceConfig = {
      text: 'name',
      value: 'coordinates',
    };

    return (
      <div
        style={{
           zIndex: 1199,
          position: 'absolute',
          top: '15px',
          right: '15px',
           backgroundColor: '#fff',
           padding: '0px',
           borderRadius: '2px',
           border: '2px solid rgba(0,0,0,0.2)',
          }}
      >
        <AutoComplete
          ref={node => this.node = node} //eslint-disable-line
          style={{ marginTop: '-5px', marginBottom: '-10px' }}
          hintText="Search"
          hintStyle={{ paddingLeft: '5px' }}
          // textFieldStyle={{ paddingLeft: '5px' }}
          filter={AutoComplete.fuzzyFilter}
          // maxSearchResults={10}
          listStyle={{ width: '100%', fontSize: '0.8rem', overfolw: 'auto' }}
          menuStyle={{ fontSize: '0.8rem', maxHeight: '600px' }}
          dataSource={this.props.data}
          dataSourceConfig={dataSourceConfig}
          onNewRequest={(object, index) => {
            // do something with the chosenRequest, eg rest request
            this.props.onNewRequest(object.coordinates, object.name);
            setTimeout(() => {
                  this.node.setState({ searchText: '' });
                  this.node.focus();
              }, 700);
          }}
        /><br />
      </div>
    );
  }
}

export default SearchAmenity;
