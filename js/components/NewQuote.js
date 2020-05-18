import React, { Component } from "react";
import { StyleSheet, Button, Modal, TextInput, View } from "react-native";

export default class newQuote extends Component {
  state = {
    content: null,
    author: null,
  };

  render() {
    const { visible, onSave } = this.props;
    const { content, author } = this.state;
    return (
      <Modal
        visible={visible}
        onRequestClose={() => {
          onSave(null, null);
          this.setState({ content: null, author: null });
        }}
        animationType="slide"
      >
        <View style={styles.container}>
          <TextInput
            placeholder="Inhalt des Zitat"
            style={[styles.input, { height: 150 }]}
            multiline={true}
            underlineColorAndroid="transparent"
            onChangeText={(text) => this.setState({ content: text })}
          />
          <TextInput
            placeholder="Name des Autors"
            style={styles.input}
            underlineColorAndroid="transparent"
            onChangeText={(text) => this.setState({ author: text })}
          />
          <Button
            title="Speichern"
            onPress={() => {
              this.setState({ content: null, author: null });
              onSave(content, author);
            }}
          />
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: 90,
  },
  input: {
    borderWidth: 1,
    borderColor: "deepskyblue",
    borderRadius: 4,
    width: "80%",
    marginBottom: 30,
    fontSize: 20,
    padding: 10,
    height: 50,
  },
});
