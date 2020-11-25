import * as React from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';

export default class SecondScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = { valx: 0 };
    // you can define N number of key value paires like JSON.
    this.t = setInterval(() => {
      this.setState({ valx: this.state.valx + 1 });
    }, 1000);
    // Simple interval fundtion which will run in every second.
    // It will increase valx
  }
  componentWillUnmount () {
    clearTimeout(this.t);
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.paragraph}>Content Loaded from Second Screen</Text>
        <Text style={styles.paragraph}>{'Timer: ' + this.state.valx}</Text>
        <Image
          style={styles.logo}
          source={{        uri:'https://raw.githubusercontent.com/AboutReact/sampleresource/master/old_logo.png',
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  paragraph: {
    margin: 24,
    marginTop: 0,
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  logo: {
    height: 50,
    width: 50,
  },
});