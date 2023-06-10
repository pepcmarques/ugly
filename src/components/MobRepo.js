import React, { useState, useEffect } from "react";
import {
  ActivityIndicator,
  Button,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { connect } from "react-redux";
import { useSelector, useDispatch } from "react-redux";

import { getFromSecureStore } from "../services/hooks.js";

import SignIn from "../screens/SignIn";
import SignOut from "../screens/SignOut";
import { checkAuthenticationState } from "../store/actions";

import { Link, Redirect } from "expo-router";

const MobileRepository = (props) => {
  const isAuthenticated = useSelector((state) => state.isAuthenticated);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuthenticationState());
  }, [dispatch]);

  if (isAuthenticated) {
    // Render the main app
    // TODO: Create main APP
   return <SignOut />;
    //return <Redirect href="/home" />;
  } else {
    // Render the authentication screens
    return <SignIn />;
  }
};

const mapStateToProps = (state) => {
  return {
    authToken: state.setAuthToken,
  };
};

export default connect(mapStateToProps, { checkAuthenticationState })(
  MobileRepository
);
