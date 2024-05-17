import React from "react";

class Signin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      signinEmail: "",
      signinPassword: "",
      error: {
        email: "",
        password: "",
      },
    };
  }

  onSubmitSignIn() {
    const { signinEmail, signinPassword, error } = this.state;
    let hasError = false;
    if (
      signinEmail.length < 1 ||
      !/^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i.test(
        signinEmail
      )
    ) {
      error.email = "Please put a valid email";
      hasError = true;
    }
    if (signinPassword.length < 1) {
      error.password = "Please put a valid password";
      hasError = true;
    }
    if (hasError) {
      return this.setState({ error });
    }
    fetch(`${process.env.BackendUrl}/signin`, {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: signinEmail,
        password: signinPassword,
      }),
    })
      .then((response) => response.json())
      .then((user) => {
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
              <legend className="f1 fw6 ph0 mh0 center">Sign In</legend>
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="email-address">
                  Email
                </label>
                <input
                  className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="email"
                  name="email-address"
                  id="email-address"
                  onChange={(event) =>
                    this.setState({ signinEmail: event.target.value })
                  }
                />
                <label className="db red fw6 lh-copy f6">{error.email}</label>
              </div>
              <div className="mv3">
                <label className="db fw6 lh-copy f6" htmlFor="password">
                  Password
                </label>
                <input
                  className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="password"
                  name="password"
                  id="password"
                  onChange={(event) =>
                    this.setState({ signinPassword: event.target.value })
                  }
                />
                <label className="db red fw6 lh-copy f6">
                  {error.password}
                </label>
              </div>
            </fieldset>
            <div className="">
              <input
                onClick={() => this.onSubmitSignIn()}
                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                type="submit"
                value="Sign in"
              />
            </div>
            <div className="lh-copy mt3 pointer">
              <p
                onClick={() => onRouteChange("register")}
                className="f6 link dim black db"
              >
                Register
              </p>
            </div>
          </div>
        </main>
      </article>
    );
  }
}

export default Signin;
