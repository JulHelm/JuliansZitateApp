import React from "react";
import { StyleSheet, Text, View } from "react-native";

//Da kein state im spiel ist nimmt man eine funktion
export default function Quote(props) {
  const { text, author } = props;
  //quasi wie const text = this.props.text;
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{text}</Text>
      <Text style={styles.author}>&mdash; {author}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    borderRadius: 10,
    elevation: 4,
    padding: 20,
    margin: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 0.75,
    },
    shadowOpacity: 0.25,
    shadowRadius: 2,
  },
  text: {
    fontSize: 30,
    marginBottom: 15,
    textAlign: "center",
  },
  author: {
    fontSize: 20,
    textAlign: "right",
  },
});

/* 
export default class Quote extends Component {
  render() {
    const { text, author } = this.props;
    //quasi wie const text = this.props.text;
    return (
      <Fragment>
        <Text>{text}</Text>
        <Text>-- {author}</Text>
      </Fragment>
    );
  }
}
 */
