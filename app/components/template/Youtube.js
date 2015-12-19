import React from 'react';

class Youtube extends React.Component {
  render() {
    const { videoID, width, height } = this.props;
    const src = `//www.youtube.com/embed/${videoID}?rel=0&amp;showinfo=0`;
    return (
      <div className="row align-center">
        <div className="small-12 large-8 columns">
          <div className="flex-video" style={{ paddingBottom: '52%' }}>
            <iframe width={width} height={height}
                    src={src} frameBorder="0" allowFullScreen></iframe>
          </div>
        </div>
      </div>
    );
  }
}

Youtube.defaultProps = {
  videoID: '',
  width: 640,
  height: 360
};

export default Youtube;
