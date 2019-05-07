import React from 'react';
import { withRouter } from 'react-router-dom';
import { State } from 'react-powerplug';
import { auth } from '../firebase';
import * as routes from '../constants/routes';
import {  MDBBtn } from 'mdbreact';
import {
  Link,
  Redirect,
} from 'react-router-dom';
import Dashboard from '../Component/Dashboard/Dashboard'
import { firebase } from '../firebase';

const UnauthenticatedHomeContent = () => {
  return (
    <React.Fragment >
      <p>
        Welcome, please <Link to={routes.SIGN_IN_PATH}>sign in</Link>
      </p>
      
    </React.Fragment>
  );
};

const AuthenticatedHomeContent = ({ authUser }) => {
  return (
    <p>
      {/*Welcome back, {authUser.email}!*/}
      <Dashboard></Dashboard>
    </p>
  );
};

class Home extends React.Component {
  render() {
    return (
      <AuthContext.Consumer>
        {({ authUser }) =>
          <div className="container-fluid" style={{alignItems: "center",padding: 0}}>
            {/*<h1>Home</h1>*/}
            {!authUser && <UnauthenticatedHomeContent />}
            {authUser && <AuthenticatedHomeContent authUser={authUser} />}
          </div>}
      </AuthContext.Consumer>
    );
  }
}

class SignOut extends React.Component {
  signOut = e => {
    if (e && e.preventDefault) {
      e.preventDefault();
    }

    return auth
      .doSignOut()
      .then(response => {
        console.log('successfully signed out', response);
      })
      .catch(err => {
        console.log('failed to sign out', err);
      });
  };

  componentDidMount() {
    this.signOut();
  }

  render() {
    return <Redirect to={routes.HOME_PATH} />;
  }
}

const AuthenticatedNavigation = () => {
  return (
    <React.Fragment>
      <li>
        <Link to={routes.SIGN_OUT_PATH}>Sign Out</Link>
      </li>
    </React.Fragment>
  );
};

const UnauthenticatedNavigation = () => {
  return (
    <React.Fragment>

      <li style={{display: "none"}}>
        <Link to={routes.SIGN_IN_PATH}>Sign In</Link>
      </li>
      <li>
          <Link to={routes.HOME_PATH}>Home</Link>
        </li>
    </React.Fragment>
  );
};

const Navigation = () => {
  return (
    <AuthContext.Consumer>
      {({ authUser }) =>
        <nav style={{display: "none"}}>
         
            
            
            {!authUser && <UnauthenticatedNavigation />}
        
        </nav>}
    </AuthContext.Consumer>
  );
};

const AuthContext = React.createContext({ authUser: null });

class AuthProvider extends React.Component {
  state = {
    authUser: null,
  };

  componentDidMount() {
    firebase.auth.onAuthStateChanged(authUser => {
      authUser
        ? this.setState(() => ({ authUser }))
        : this.setState(() => ({ authUser: null }));
    });
  }

  render() {
    return (
      <AuthContext.Provider value={{ authUser: this.state.authUser }}>
        {this.props.children}
      </AuthContext.Provider>
    );
  }
}
class SignIn extends React.Component {
  handleSubmit = ({ email, password }) => {
    return auth
      .doSignInWithEmailAndPassword(email, password)
      .then(response => {
        console.log('Successful Sign In', response);
        this.props.history.push(routes.HOME_PATH);
      })
      .catch(err => {
        console.log('Failed Sign In', err);
        throw err;
      });
  };

  render() {
    return (
      <State initial={{ email: '', password: '', error: null }}>
        {({ state, setState }) => {
          const onEmailChange = e => {
            setState({ email: e.target.value });
          };
          const onPasswordChange = e => {
            setState({ password: e.target.value });
          };
          const onSubmit = e => {
            e.preventDefault();
            this.handleSubmit({
              email: state.email,
              password: state.password,
            }).catch(err => {
              setState({ error: err.message });
            });
          };

          return (
            <div className="container-fluid" style={{width: "100%"}}>
              <div className="container-fluid btn-default" style={{width: "50%",padding: "10px",borderRadius: "10px"}}>
                <h1>Sign In</h1>
                <form className="form-group" onSubmit={onSubmit}>

                  <label htmlFor="email">Email</label>
                  <input
                      className="form-control"
                      style={{width: "100%"}}
                      type="text"
                      name="email"
                      value={state.email}
                      onChange={onEmailChange}
                  />

                  <label htmlFor="password">Password</label>
                  <input
                      className="form-control"
                      type="password"
                      name="password"
                      value={state.password}
                      onChange={onPasswordChange}
                  />
                  {state.error &&
                  <p style={{ color: 'red' }}>
                    {state.error}
                  </p>}
                  <MDBBtn className="btn btn-info" type="submit" size="sm">Sign In</MDBBtn>
                </form>
              </div>

            </div>
          );
        }}
      </State>
    );
  }
}

export default withRouter(SignIn);
