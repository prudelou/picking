import React from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Button,
    Keyboard,
    Vibration,
    NativeModules,
    requireNativeComponent,
    PermissionsAndroid,
    Platform,
    Alert,
    TouchableOpacity,
    Dimensions,
} from 'react-native';
import {StackNavigator} from 'react-navigation';
import Camera from 'react-native-camera';
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

    constructor(props) {
        super(props);

        this.camera = null;

        this.state = {
            camera: {
                aspect: Camera.constants.Aspect.fill,
                captureTarget: Camera.constants.CaptureTarget.cameraRoll,
                type: Camera.constants.Type.back,
                orientation: Camera.constants.Orientation.auto,
                flashMode: Camera.constants.FlashMode.auto,
                barcodeFinderVisible: Camera.constants.barcodeFinderVisible,
            },
            canScan: true,
            quantity: 3
        };

    }

    static onBarCodeRead(data) {
        if (this.state.canScan) {
            this.setState({canScan: false});
            Alert.alert("Result", "Barcode: " + data.data, [{
                text: 'OK',
                onPress: () => this.setState({canScan: true})
            },]);

            if (this.state.quantity > 1) {
                this.setState({quantity: this.state.quantity - 1})
            }
            else {
                this.props.navigation.navigate('Picking');
            }
        }
    }

    render() {
        const {height, width} = Dimensions.get('window');
        const maskRowHeight = Math.round((height - 300) / 20);
        const maskColWidth = (width - 300) / 2;

        return (
            <View style={styles.container}>
                <Camera
                    ref={cam => {
                        this.camera = cam;
                    }}
                    style={styles.preview}
                    aspect={this.state.camera.aspect}
                    captureTarget={this.state.camera.captureTarget}
                    flashMode={this.state.camera.flashMode}
                    onBarCodeRead={StartScan.onBarCodeRead.bind(this)}
                />
                <View style={[styles.overlay, styles.bottomOverlay]}>
                    <Text style={styles.bottomText}>Quantité : {this.state.quantity}</Text>
                </View>
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
    preview: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    overlay: {
        position: 'absolute',
        padding: 16,
        right: 0,
        left: 0,
        alignItems: 'center',
    },
    bottomOverlay: {
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.6)',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    bottomText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 20,
    },
    // bottomElement: {
    //     flexDirection: 'row',
    //     position: 'absolute',
    //     bottom: 0
    // }
});