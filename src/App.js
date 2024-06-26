import React, { Component } from "react";
import "./App.css";
import Navigation from "./components/navigation/navigation";
import Logo from "./components/logo/Logo";
import ImageLinkForm from "./components/imageLinkForm/ImageLinkForm";
import FaceRecognition from "./components/faceRecognition/FaceRecognition";
import Rank from "./components/rank/Rank";
import Signin from "./components/Signin/Signin";
import ParticlesBg from "particles-bg";
import Register from "./components/register/Register";

const defaultState = {
  input: "",
  imageUrl: "",
  boxes: [{}],
  route: "signin",
  user: {
    id: "",
    name: "",
    email: "",
    entries: 0,
    joined: "",
  },
};
class App extends Component {
  constructor() {
    super();
    this.state = defaultState;
  }

  loaduser(user) {
    this.setState({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        entries: user.entries,
        joined: user.joined,
      },
    });
  }

  calculateFaceLocation = (facesDetected = []) => {
    const newFacesDetected = [];
    const image = document.getElementById("inputImage");
    const width = Number(image.width);
    const height = Number(image.height);
    for (const faceDetected of facesDetected) {
      newFacesDetected.push({
        leftCol: faceDetected.region_info.bounding_box.left_col * width,
        topRow: faceDetected.region_info.bounding_box.top_row * height,
        rightCol: width - faceDetected.region_info.bounding_box.right_col * width,
        bottomRow: height - faceDetected.region_info.bounding_box.bottom_row * height,
      });
    }
    return newFacesDetected;
  };

  onButtonSubmit = () => {
    const { input, user } = this.state;
    this.setState({ imageUrl: input });
    fetch(`https://smartbrainapi-yurz.onrender.com/imageUrl`, {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        input,
      }),
    })
      .then((response) => response.json())
      .then((result) => {
        if (result) {
          fetch(`https://smartbrainapi-yurz.onrender.com/image`, {
            method: "put",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              id: user.id,
              entries: result.length,
            }),
          })
            .then((response) => response.json())
            .then((count) => {
              this.setState({ user: { ...user, entries: count } });
            })
            .catch((error) => console.log("error", error));
        }
        this.setState({ boxes: this.calculateFaceLocation(result) });
      })
      .catch((error) => console.log("error", error));
  };

  render() {
    const { imageUrl, boxes, route, user } = this.state;
    return (
      <div className="App">
        <ParticlesBg color="#FFFFFF" type="cobweb" bg={true} />
        {route === "signin" ? (
          <Signin
            onLoaduser={(data) => this.loaduser(data)}
            onRouteChange={(route) => this.setState({ route })}
          />
        ) : route === "register" ? (
          <Register
            onRouteChange={(route) => this.setState({ route })}
            onLoaduser={(data) => this.loaduser(data)}
          />
        ) : (
          <>
            <Navigation onRouteChange={() => this.setState(defaultState)} />
            <Logo />
            <Rank name={user.name} entries={user.entries} />
            <ImageLinkForm
              onInputChange={(event) =>
                this.setState({ input: event.target.value })
              }
              onButtonSubmit={this.onButtonSubmit}
            />
            <FaceRecognition boxes={boxes} imageUrl={imageUrl} />
          </>
        )}
      </div>
    );
  }
}

export default App;
