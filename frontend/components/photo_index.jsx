var React = require('react');
var PhotoStore = require('../stores/photo');
var ApiUtil = require('../util/api_util');
var Masonry = require('react-masonry-component')(React);

var masonryOptions = {
  transitionDuration: 0
};

var PhotoIndex = React.createClass({

  getInitialState: function() {
    return { photos: PhotoStore.all() }
  },

  _updateState: function() {
    this.setState({
      photos: PhotoStore.all()
    });
  },

  componentWillUnmount: function() {
    this.photoToken.remove();
  },

  componentDidMount: function() {
    this.photoToken = PhotoStore.addListener(this._updateState);
    ApiUtil.fetchPhotos();
  },

  render: function() {
    console.log("in photo index");
    var photosGrid = this.state.photos.map( function(photo) {
      return (
        <div key={photo.id}>
          <img src={photo.photo_url} />
        </div>
      );
    });

    return (
        <Masonry
          options={masonryOptions}
          disableImagesLoaded={false}>
            {photosGrid}
        </Masonry>
    );
  }
});

module.exports = PhotoIndex;
