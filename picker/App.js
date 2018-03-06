import React from 'react';
import {AppRegistry, StyleSheet, Text, View, Button, Keyboard} from 'react-native';
import {StackNavigator} from 'react-navigation';
import BarcodeScanner from 'react-native-barcodescanner';

import t from 'tcomb-form-native'; // 0.6.9

const Form = t.form.Form;

const LoginStruct = t.struct({
    Identifiant: t.String,
});

class Login extends React.Component {
    static navigationOptions =
        {
            title: 'Picking',
            headerLeft: null
        };

    handleSubmit = () => {
        const value = this._form.getValue(); // use that ref to get the form value
        console.log('value: ', value);
        if (value !== null) {
            this.props.navigation.navigate('StartPicking');
            Keyboard.dismiss();
        }
    };

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.hello}>Bonjour</Text>
                <View style={styles.form}>
                    <Form
                        ref={c => this._form = c} // assign a ref
                        type={LoginStruct}
                        value={{Identifiant: 'WESH'}}
                    />
                    <Button
                        title="Se connecter"
                        onPress={this.handleSubmit}
                    />
                </View>
            </View>
        );
    }
}

class StartPicking extends React.Component {
    static navigationOptions =
        {
            title: 'Démarrer',
            headerLeft: null
        };

    handleSubmit = () => {
        this.props.navigation.navigate('Picking');
    };

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.paragraph}>Cliquez sur le bouton ci-dessous pour démarrer la préparation de
                    commandes</Text>
                <Button
                    title="Démarrer"
                    onPress={this.handleSubmit}
                />
            </View>
        );
    }
}

class Picking extends React.Component {
    static navigationOptions =
        {
            title: 'Récupération d\'article',
            headerLeft: null
        };

    handleSubmit = () => {
        this.props.navigation.navigate('StartScan');
    };

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.paragraph}>A122</Text>
                <Text style={styles.paragraph}>S4</Text>
                <Text style={styles.paragraph}>E3</Text>
                <Button
                    // style={styles.bottomElement}
                    title="Scanner"
                    onPress={this.handleSubmit}
                />
            </View>
        );
    }
}

class StartScan extends React.Component {
    static navigationOptions =
        {
            title: 'Scanner l\'article',
            headerLeft: null
        };

    handleSubmit = () => {
        this.props.navigation.navigate('Picking');
    };

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.paragraph}>A122</Text>
                <Text style={styles.paragraph}>S4</Text>
                <Text style={styles.paragraph}>E3</Text>
                <Button
                    // style={styles.bottomElement}
                    title="Scanner"
                    onPress={this.handleSubmit}
                />
            </View>
        );
    }
}

export default Project = StackNavigator(
    {
        Login: {screen: Login},
        StartPicking: {screen: StartPicking},
        Picking: {screen: Picking},
        StartScan: {screen: StartScan}
    });

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#ffffff',
    },
    form: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 50,
    },
    hello: {
        fontSize: 40,
        fontWeight: 'bold',
        textAlignVertical: 'center',
        textAlign: "center"
    },
    paragraph: {
        paddingBottom: 30,
        fontSize: 30,
        textAlignVertical: 'center',
        textAlign: "center"
    },
    // bottomElement: {
    //     flexDirection: 'row',
    //     position: 'absolute',
    //     bottom: 0
    // }
});