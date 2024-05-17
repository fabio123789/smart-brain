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
  box: {},
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

  calculateFaceLocation = (faceDetected = {}) => {
    const image = document.getElementById("inputImage");
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: faceDetected.left_col * width,
      topRow: faceDetected.top_row * height,
      rightCol: width - faceDetected.right_col * width,
      bottomRow: height - faceDetected.bottom_row * height,
    };
  };

  onButtonSubmit = () => {
    const { input, user } = this.state;
    this.setState({ imageUrl: input });
    fetch(`${process.env.BackendUrl}imageUrl`, {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        input,
      }),
    })
      .then((response) => response.json())
      .then((result) => {
        if (result) {
          fetch(`${process.env.BackendUrl}image`, {
            method: "put",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              id: user.id,
            }),
          })
            .then((response) => response.json())
            .then((count) => {
              this.setState({ user: { ...user, entries: count } });
            })
            .catch((error) => console.log("error", error));
        }
        this.setState({ box: this.calculateFaceLocation(result) });
      })
      .catch((error) => console.log("error", error));
  };

  render() {
    const { imageUrl, box, route, user } = this.state;
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
              onInputChange={(event) => this.setState({ input: event.target.value })}
              onButtonSubmit={this.onButtonSubmit}
            />
            <FaceRecognition box={box} imageUrl={imageUrl} />
          </>
        )}
      </div>
    );
  }
}

export default App;
