import React, { Component } from "react"; //native basiert auf react
import {
  Alert,
  AsyncStorage,
  StyleSheet,
  View,
  SafeAreaView,
  Button,
  Platform,
  Text,
} from "react-native"; // {} weil mehreres importiert wird
// APIs und Komponenten und eigene Komponenten
import Firebase from "./js/Firebase";
import Quote from "./js/components/Quote";
import NewQuote from "./js/components/NewQuote";

// Bugfix für "Can't find variable: atob":
import { decode, encode } from "base-64";
if (!global.btoa) {
  global.btoa = encode;
}
if (!global.atob) {
  global.atob = decode;
}

// Bugfix für YellowBox "Setting a timer ..."
import { YellowBox } from "react-native";
import _ from "lodash";

YellowBox.ignoreWarnings(["Setting a timer"]);
const _console = _.clone(console);
console.warn = (message) => {
  if (message.indexOf("Setting a timer") <= -1) {
    _console.warn(message);
  }
};

function StyledButton(props) {
  let button = null;
  if (props.visible)
    button = (
      <View style={props.style}>
        <Button title={props.title} onPress={props.onPress} />
      </View>
    );
  return button;
}

//Deklaration einer Komponente
export default class App extends Component {
  state = {
    index: 0,
    showNewQuoteScreen: false,
    quotes: [],
  };

  _retrieveData = async () => {
    let quotes = [];
    let query = await Firebase.db.collection("quotes").get();
    query.forEach((quote) => {
      quotes.push({
        id: quote.id,
        text: quote.data().text,
        author: quote.data().author,
      });
    });
    this.setState({ quotes, isLoading: false });
  };
  /*  let value = await AsyncStorage.getItem("QUOTES");
    if (value !== null) {
      value = JSON.parse(value);
      this.setState({ quote: value });
    } */

  /*  
  _storeData(quotes) {
    AsyncStorage.setItem("QUOTES", JSON.stringify(quotes)); //json.stringity macht aus array string
  } */

  _saveQuoteToDB = async (text, author, quotes) => {
    docRef = await Firebase.db.collection("quotes").add({ text, author });
    quotes[quotes.length - 1].id = docRef.id;
  };

  _removeQuoteFromDB(id) {
    Firebase.db.collection("quotes").doc(id).delete();
  }

  _addQuote = (text, author) => {
    //Pfeilfunktion damit this immer auf App zeigt auch nachdem als prop übergeben
    let { quotes } = this.state;
    if (text !== null && author !== null) {
      quotes.push({ text: text, author: author });
      this._saveQuoteToDB(text, author, quotes);
    }
    this.setState({
      index: quotes.length - 1,
      showNewQuoteScreen: false,
      quotes,
    });
  };

  _displayNextQuote() {
    let { index, quotes } = this.state;
    let nextIndex = index + 1;
    if (nextIndex === quotes.length) {
      nextIndex = 0;
    }
    this.setState({ index: nextIndex });
  }

  _displayPrevQuote() {
    let { index, quotes } = this.state;
    let prevIndex = index - 1;
    if (prevIndex === -1) {
      prevIndex = quotes.length - 1;
    }
    this.setState({ index: prevIndex });
  }

  _deleteButton() {
    Alert.alert("sicher?", "Willst Du das Zität löschen?", [
      { text: "Ja", style: "destructive", onPress: () => this._deleteQuote() },
      { text: "Nein", style: "cancel" },
    ]);
  }

  _deleteQuote() {
    let { index, quotes } = this.state;
    this._removeQuoteFromDB(quotes[index].id);
    quotes.splice(index, 1);
    this.setState({ index: 0, quotes });
  }

  componentDidMount() {
    Firebase.init();
    this._retrieveData();
  }

  render() {
    let { index, quotes } = this.state;
    const quote = quotes[index];
    let content = (
      <Text style={{ fontSize: 20 }}>Leider kein Zitat vorhanden</Text>
    );
    if (quote) {
      content = <Quote text={quote.text} author={quote.author} />;
    }
    return (
      <SafeAreaView style={styles.container}>
        <StyledButton
          style={styles.deleteButton}
          visible={quotes.length >= 1}
          title="Löschen"
          onPress={() => this._deleteButton()}
        />
        <StyledButton
          style={styles.newButton}
          visible={true}
          title="Neu"
          onPress={() => this.setState({ showNewQuoteScreen: true })}
        />
        <NewQuote
          visible={this.state.showNewQuoteScreen}
          onSave={this._addQuote}
        />
        {content}
        <StyledButton
          style={styles.nextButton}
          visible={quotes.length >= 2}
          title="Nächstes Zitat"
          onPress={() => this._displayNextQuote()}
        />
        <StyledButton
          style={styles.prevButton}
          visible={quotes.length >= 2}
          title="Vorheriges Zitat"
          onPress={() => this._displayPrevQuote()}
        />
      </SafeAreaView>
    );
  }
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "lightgrey",
  },
  newButton: {
    position: "absolute",
    top: 50,
    right: 30,
  },
  deleteButton: {
    position: "absolute",
    top: 50,
    left: 30,
  },
  prevButton: {
    position: "absolute",
    bottom: Platform.OS === "ios" ? 50 : 10,
    left: 30,
  },
  nextButton: {
    position: "absolute",
    bottom: Platform.OS === "ios" ? 50 : 10,
    right: 30,
  },
});
