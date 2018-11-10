import React from 'react';
import styled from 'styled-components';
import Webcam from 'react-webcam';

import CameraIcon from './icon-camera.svg';

const Wrapper = styled.div`
  text-align: center;
  display: grid;
  margin-top: 200px;
  padding-left: 28%;
  button {
    width: 640px;
    border-radius: unset;
    margin-top: -10px;
    background-color: #6cc551;
    margin-bottom: 10px;
    img {
      margin-left: auto;
      margin-right: auto;
    }
  }

  .containerX {
    margin-left: auto;
    margin-right: auto;
  }

  .btn-default {
    background: #ff6600;

    :hover {
      background: #cc5200;
    }
  }
`;

const capture = image => console.log(image);

class Camera extends React.Component {
  static defaultProps = {
    images: [],
  }

  setRef = (webcam) => {
    this.webcam = webcam;
  }

  render () {
    const { images, deletePicture } = this.props;

    return (
      <Wrapper>
        {/* <div className="containerX"> */}
        <Webcam
          ref={this.setRef}
          screenshotFormat="image/jpeg"
          screenshotHeight={1200}
        />
        <button
          // onClick={() => capture({ image: this.webcam.getScreenshot(), key: Date.now() })}
          onClick={() => capture(this.webcam.getScreenshot())}
          type="button"
          className="btn btn-default"
          style={{ width: '640px !important' }}
        >
          <img width="25" src={CameraIcon} alt="Camera Icon" />
        </button>
        {/* </div> */}
      </Wrapper>
    );
  }
}

export default Camera;
