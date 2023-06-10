import { SET_AUTHENTICATED, SET_UNAUTHENTICATED } from "./constants.js";

import Constants from "expo-constants";

import * as SecureStore from "expo-secure-store";

import axios from "axios";

import { saveToSecureStore } from "../services/hooks.js";

const apiUrl = Constants.expoConfig.apiUrl;

export const checkAuthenticationState = () => (dispatch) => {
  SecureStore.getItemAsync("authToken")
    .then((storedToken) => {
      if (storedToken) {
        // Validate token here or make an API call to validate it
        // If valid, dispatch SET_AUTHENTICATED
        dispatch({ type: SET_AUTHENTICATED });
        // If not valid, dispatch SET_UNAUTHENTICATED
      } else {
        dispatch({ type: SET_UNAUTHENTICATED });
      }
    })
    .catch((error) => {
      console.log("Error occurred while checking authentication state:", error);
    });
};

export const signin = (username, password) => {
  //console.log(`${username} & ${password} & ${apiUrl}/authn/login`);
  return (dispatch) => {
    const loginData = `user=${encodeURIComponent(username)}&password=${password}`;
    //console.log(loginData);

    fetch(apiUrl + "/authn/login", {
      method: "POST",
      body: loginData,
    })
      .then((resp) => {
        //console.log(JSON.stringify(resp, null, "\t"));
        const dspaceXSRFToken = resp.headers.map["dspace-xsrf-token"];
        //const dspaceXSRFCookie = resp.headers.map["set-cookie"];
        //const xsrfCookieRegex =
        //  /DSPACE-XSRF-COOKIE\=([0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12})/;
        //const xsrfCookieMatch = dspaceXSRFCookie.match(xsrfCookieRegex);
        // It seems both values are always equal, so I will return just one.
        return dspaceXSRFToken;
      })
      .then((token) => {
        const newHeader = {
          "X-XSRF-TOKEN": token,
          //"Cookie": "DSPACE-XSRF-COOKIE=" + token,
        };

        fetch(apiUrl + "/authn/login", {
          method: "POST",
          headers: newHeader,
          body: loginData,
        })
          .then((response) => {
            //console.log(JSON.stringify(response, null, "\t"));
            return response;
          })
          .then((data) => {
            //console.log(JSON.stringify(data, null, "\t"));
            if (data.ok) {
              const authToken = data.headers.map.authorization;
              console.log(authToken);
              saveToSecureStore("authToken", authToken);
              dispatch({ type: SET_AUTHENTICATED, payload: data });
            } else {
              console.log("Authentication failed.");
              dispatch({ type: SET_UNAUTHENTICATED });
            }
          })
          .catch((error) => console.log(error));
      });
  };
};

export const signout = (token) => {
  return (dispatch) => {
    const data = {
      "rest-dspace-token": token,
    };

    const headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
    };

    fetch(apiUrl + "/logout", {
      method: "POST",
      headers: headers,
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          console.log("NOT SIGNED IN");
        }
      })
      .then((data) => {
        console.log("RESPONSE DATA");
        console.log(data);
        if (data.success) {
          saveToSecureStore("authToken", data.authToken);
          dispatch({ type: SET_AUTHENTICATED, payload: data });
        } else {
          console.log("NOT SIGNED IN");
          dispatch({ type: SET_UNAUTHENTICATED });
        }
      })
      .catch((error) => console.log(error));
    // Clear token from secure storage and dispatch SET_UNAUTHENTICATED
    SecureStore.deleteItemAsync("authToken")
      .then(() => {
        dispatch({ type: SET_UNAUTHENTICATED });
      })
      .catch((error) => {
        console.log("Error occurred while logging out:", error);
      });
  };
};
