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
    TouchableOpacity
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
            isRecording: false,
        };
    }

    static onBarCodeRead(data) {
        Alert.alert("Test", "Barcode: " + data);
        console.log("Barcode: " + data);
    }

    render() {
        return (
            <View style={styles.container}>
                <Camera
                    ref={cam => {
                        this.camera = cam;
                    }}
                    style={styles.preview}
                    aspect={this.state.camera.aspect}
                    captureTarget={this.state.camera.captureTarget}
                    type={this.state.camera.type}
                    flashMode={this.state.camera.flashMode}
                    onFocusChanged={() => {
                    }}
                    onZoomChanged={() => {
                    }}
                    defaultTouchToFocus
                    mirrorImage={false}
                    barcodeFinderVisible={this.state.camera.barcodeFinderVisible}
                    barcodeFinderWidth={280}
                    barcodeFinderHeight={220}
                    barcodeFinderBorderColor="red"
                    barcodeFinderBorderWidth={2}
                    onBarCodeRead={StartScan.onBarCodeRead.bind(this)}
                />
                <View style={[styles.overlay, styles.bottomOverlay]}>
                    <Button style={styles.enterBarcodeManualButton} title="Enter Barcode"/>
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
    statusBar: {
        height: 100,
        alignItems: 'center',
        justifyContent: 'center',
    },
    statusBarText: {
        fontSize: 20,
    },
    buttonText: {
        color: 'blue',
        marginBottom: 20,
        fontSize: 20
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
    topOverlay: {
        top: 0,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    bottomOverlay: {
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.4)',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    captureButton: {
        padding: 15,
        backgroundColor: 'white',
        borderRadius: 40,
    },
    typeButton: {
        padding: 5,
    },
    flashButton: {
        padding: 5,
    },
    buttonsSpace: {
        width: 10,
    }
    // bottomElement: {
    //     flexDirection: 'row',
    //     position: 'absolute',
    //     bottom: 0
    // }
});