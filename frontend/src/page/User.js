import React, { useState, useEffect } from 'react';
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import { gapi } from 'gapi-script';
import './User.css';

function User() {
  const clientId = "468322357690-ekj2vfndj1afuu1ggjepuosd85696a3g.apps.googleusercontent.com";
  const [profile, setProfile] = useState(null); // Use useState with proper capitalization

  useEffect(() => {
    const initClient = () => {
      gapi.load("auth2", () => {
        gapi.auth2.init({
          clientId: clientId,
        });
      });
    };
    gapi.load("client:auth2", initClient);
  }, []);

  const onSuccess = (res) => {
    setProfile(res.profileObj);
    console.log('success', res);
  };

  const onFailure = (res) => {
    console.log('failed', res);
  };

  const logOut = () => {
    setProfile(null);
  };

  return (
    <div className='login-out'>
      {profile ? (
        <div className='boxblock'>
          <img src={profile.imageUrl} alt="user image" style={{borderRadius:"360px"}}/>
          <h3>User Logged in</h3>
          <p>Name: {profile.name}</p>
          <p>Email: {profile.email}</p>
          <br />
          <br />
          <GoogleLogout clientId={clientId} buttonText="Log out" onLogoutSuccess={logOut} />
        </div>
      ) : (
        <GoogleLogin
          clientId={clientId}
          buttonText="Sign in with Google"
          onSuccess={onSuccess}
          onFailure={onFailure}
          cookiePolicy={'single_host_origin'}
          isSignedIn={true}
        />
      )}
    </div>
  );
}

export default User;
