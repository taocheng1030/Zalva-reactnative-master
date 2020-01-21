import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { AppLoading, Asset, Font } from "expo";
import RootRouter from "./src/router";

function cacheImages(images) {
  return images.map((image) => {
    if (typeof image === "string") {
      return Image.prefetch(image);
    }
    return Asset.fromModule(image).downloadAsync();
  });
}

function cacheFonts(fonts) {
  return fonts.map((font) => Font.loadAsync(font));
}

class App extends Component {
  state = { appIsReady: false };

  componentWillMount() {
    console.ignoredYellowBox = [
      "Warning: View.propTypes",
      "Warning: BackAndroid",
    ];
    if (__DEV__) {
    }
  }

  loadAssets = async () => {
        
    const fontAssets = cacheFonts([
        { 'Roboto': require('native-base/Fonts/Roboto.ttf') },
        { 'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf') },
        { 'AvenirBook': require('./assets/fonts/AvenirBook.ttf') },
        { 'AvenirHeavy': require('./assets/fonts/AvenirHeavy.ttf') },
        { 'AvenirBlack': require('./assets/fonts/AvenirBlack.ttf') },
        { 'AvenirMediumOblique': require('./assets/fonts/AvenirMediumOblique.ttf') },
        { 'icomoon': require('./assets/fonts/icomoon.ttf') },
    ]);

    const imageAssets = cacheImages([
    ]);

    await Promise.all([
      ...fontAssets,
      //...imageAssets
    ]);
  };

  render() {
    if (!this.state.appIsReady) {
      return (
        <AppLoading
          startAsync={this.loadAssets}
          onFinish={() => this.setState({ appIsReady: true })}
          onError={console.warn}
        />
      );
    }

    return (
      <RootRouter />
    );
  }
}

export default App;