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

const MODEL_ID = "face-detection";

class App extends Component {
  constructor() {
    super();
    this.state = {
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

  calculateFaceLocation = (data) => {
    const faceDetected =
      data.outputs[0].data.regions[0].region_info.bounding_box;
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

  displayFaceBox = (box) => {
    console.log(box);
    this.setState({ box });
  };

  onInputChange = (event) => {
    this.setState({ input: event.target.value });
  };

  getRequestOptions(imageUrl) {
    const PAT = "f3178ddee9774b33be0ad1d230abe9d2";
    const USER_ID = "gkyj8c6d3cgz";
    const APP_ID = "test";

    const raw = JSON.stringify({
      user_app_id: {
        user_id: USER_ID,
        app_id: APP_ID,
      },
      inputs: [
        {
          data: {
            image: {
              url: imageUrl,
            },
          },
        },
      ],
    });

    return {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: "Key " + PAT,
      },
      body: raw,
    };
  }

  onButtonSubmit = () => {
    const { input, name,user } = this.state;
    this.setState({ imageUrl: input });
    fetch(
      "https://api.clarifai.com/v2/models/" + MODEL_ID + "/outputs",
      this.getRequestOptions(input)
    )
      .then((response) => response.json())
      .then((result) => {
        if (result) {
          fetch("http://localhost:3000/image", {
            method: "post",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              id: name.id,
            }),
          }).then(response => response.json()).then(count => {
            this.setState({user: {...user, entries: count }})
          });
        }
        this.displayFaceBox(this.calculateFaceLocation(result));
      })
      .catch((error) => console.log("error", error));
  };

  onRouteChange = (route) => {
    this.setState({ route });
  };

  render() {
    const { imageUrl, box, route, user } = this.state;
    return (
      <div className="App">
        <ParticlesBg color="#FFFFFF" type="cobweb" bg={true} />
        {route === "signin" ? (
          <Signin
            onLoaduser={(data) => this.loaduser(data)}
            onRouteChange={this.onRouteChange}
          />
        ) : route === "register" ? (
          <Register
            onRouteChange={this.onRouteChange}
            onLoaduser={(data) => this.loaduser(data)}
          />
        ) : (
          <>
            <Navigation onRouteChange={this.onRouteChange} />
            <Logo />
            <Rank name={user.name} entries={user.entries} />
            <ImageLinkForm
              onInputChange={this.onInputChange}
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
