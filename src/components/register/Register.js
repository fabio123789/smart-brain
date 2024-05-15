import React from "react";

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      name: "",
      error: {
        email: "",
        name: "",
        password: "",
      },
    };
  }

  onSubmitRegister() {
    const { email, password, name, error } = this.state;
    let hasError = false;
    if (name.length < 1) {
      error.name = "Please put a valid name";
      hasError = true;
    }
    if (
      email.length < 1 ||
      /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i.test(
        email
      )
    ) {
      error.email = "Please put a valid email";
      hasError = true;
    }
    if (password.length < 1) {
      error.password = "Please put a valid password";
      hasError = true;
    }
    if (hasError) {
      return this.setState({ error });
    }
    fetch("http://localhost:3000/register", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        password,
        name,
      }),
    })
      .then((response) => response.json())
      .then((user) => {
        console.log(user);
        if (user?.id) {
          this.props.onLoaduser(user);
          this.props.onRouteChange("home");
        }
      });
  }

  render() {
    const { error } = this.state;
    const { onRouteChange } = this.props;
    return (
      <article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
        <main className="pa4 black-80">
          <div className="measure">
            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
              <legend className="f1 fw6 ph0 mh0 center">Register</legend>
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="name">
                  Name
                </label>
                <input
                  onChange={(event) =>
                    this.setState({ name: event.target.value })
                  }
                  className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="text"
                  name="name"
                  id="name"
                />
                <label className="db red fw6 lh-copy f6">{error.name}</label>
              </div>
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="email-address">
                  Email
                </label>
                <input
                  onChange={(event) =>
                    this.setState({ email: event.target.value })
                  }
                  className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="email"
                  name="email-address"
                  id="email-address"
                />
                <label className="db red fw6 lh-copy f6">{error.email}</label>
              </div>
              <div className="mv3">
                <label className="db fw6 lh-copy f6" htmlFor="password">
                  Password
                </label>
                <input
                  onChange={(event) =>
                    this.setState({ password: event.target.value })
                  }
                  className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="password"
                  name="password"
                  id="password"
                />
                <label className="db red fw6 lh-copy f6">{error.password}</label>
              </div>
            </fieldset>
            <div className="">
              <input
                onClick={() => this.onSubmitRegister()}
                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                type="submit"
                value="Register"
              />
            </div>
            <div className="lh-copy mt3 pointer">
              <p
                onClick={() => onRouteChange("signin")}
                className="f6 link dim black db"
              >
                Sign In
              </p>
            </div>
          </div>
        </main>
      </article>
    );
  }
}

export default Register;
