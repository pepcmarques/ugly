import { SET_AUTHENTICATED, SET_UNAUTHENTICATED } from "./constants.js";

import Constants from "expo-constants";

import * as SecureStore from "expo-secure-store";

import axios from "axios";

import { saveToSecureStore } from "../services/hooks.js";

import { GET_JWT_TOKEN } from "../services/api_links";

const apiUrl = Constants.expoConfig.apiUrl;

export const checkAuthenticationState = () => (dispatch) => {
  SecureStore.getItemAsync("authToken")
    .then((storedToken) => {
      if (storedToken) {
        // Validate token here or make an API call to validate it
        // If valid, dispatch SET_AUTHENTICATED
        // TODO: SET_AUTHENTICAED should pass `data`
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
  const header = {
    accept: "application/json",
    "Content-Type": "application/x-www-form-urlencoded",
  };

  return (dispatch) => {
    const loginData = `username=${encodeURIComponent(
      username
    )}&password=${password}`;
    //console.log(loginData);

    fetch(apiUrl + GET_JWT_TOKEN, {
      method: "POST",
      headers: header,
      body: loginData,
    })
      .then((resp) => {
        //console.log(JSON.stringify(resp, null, "\t"));
        if (resp.ok) {
          return resp.json();
        } else {
          return { token_type: false };
        }
      })
      .then((data) => {
        console.log(data)
        if (data.token_type) {
          const authToken = data.access_token;
          const tokenType = data.token_type;
          console.log(authToken);
          // console.log(tokenType);
          saveToSecureStore("authToken", authToken);
          saveToSecureStore("tokenType", tokenType);
          dispatch({ type: SET_AUTHENTICATED, payload: data });
        } else {
          console.log("Authentication failed.");
          dispatch({ type: SET_UNAUTHENTICATED });
        }
      })
      .catch((error) => console.log(error));
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
