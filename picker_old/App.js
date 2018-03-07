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
import PropTypes from 'prop-types';
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
    takePicture = () => {
        if (this.camera) {
            this.camera
                .capture()
                .then(data => console.log(data))
                .catch(err => console.error(err));
        }
    };
    startRecording = () => {
        if (this.camera) {
            this.camera
                .capture({mode: Camera.constants.CaptureMode.video})
                .then(data => console.log(data))
                .catch(err => console.error(err));
            this.setState({
                isRecording: true,
            });
        }
    };
    stopRecording = () => {
        if (this.camera) {
            this.camera.stopCapture();
            this.setState({
                isRecording: false,
            });
        }
    };
    switchType = () => {
        let newType;
        const {back, front} = Camera.constants.Type;

        if (this.state.camera.type === back) {
            newType = front;
        } else if (this.state.camera.type === front) {
            newType = back;
        }

        this.setState({
            camera: {
                ...this.state.camera,
                type: newType,
            },
        });
    };
    switchFlash = () => {
        let newFlashMode;
        const {auto, on, off} = Camera.constants.FlashMode;

        if (this.state.camera.flashMode === auto) {
            newFlashMode = on;
        } else if (this.state.camera.flashMode === on) {
            newFlashMode = off;
        } else if (this.state.camera.flashMode === off) {
            newFlashMode = auto;
        }

        this.setState({
            camera: {
                ...this.state.camera,
                flashMode: newFlashMode,
            },
        });
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
            },
            isRecording: false,
        };
    }

    get typeIcon() {
        let icon;
        const {back, front} = Camera.constants.Type;

        if (this.state.camera.type === back) {
            icon = require('./assets/ic_camera_rear_white.png');
        } else if (this.state.camera.type === front) {
            icon = require('./assets/ic_camera_front_white.png');
        }

        return icon;
    }

    get flashIcon() {
        let icon;
        const {auto, on, off} = Camera.constants.FlashMode;

        if (this.state.camera.flashMode === auto) {
            icon = require('./assets/ic_flash_auto_white.png');
        } else if (this.state.camera.flashMode === on) {
            icon = require('./assets/ic_flash_on_white.png');
        } else if (this.state.camera.flashMode === off) {
            icon = require('./assets/ic_flash_off_white.png');
        }

        return icon;
    }

    render() {
        return (
            <View style={styles.container}>
                <StatusBar animated hidden/>
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
                    cropToPreview={false}
                    permissionDialogTitle="Sample title"
                    permissionDialogMessage="Sample dialog message"
                />
                <View style={[styles.overlay, styles.topOverlay]}>
                    <TouchableOpacity style={styles.typeButton} onPress={this.switchType}>
                        <Image source={this.typeIcon}/>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.flashButton} onPress={this.switchFlash}>
                        <Image source={this.flashIcon}/>
                    </TouchableOpacity>
                </View>
                <View style={[styles.overlay, styles.bottomOverlay]}>
                    {(!this.state.isRecording && (
                        <TouchableOpacity style={styles.captureButton} onPress={this.takePicture}>
                            <Image source={require('./assets/ic_photo_camera_36pt.png')}/>
                        </TouchableOpacity>
                    )) ||
                    null}
                    <View style={styles.buttonsSpace}/>
                    {(!this.state.isRecording && (
                        <TouchableOpacity style={styles.captureButton} onPress={this.startRecording}>
                            <Image source={require('./assets/ic_videocam_36pt.png')}/>
                        </TouchableOpacity>
                    )) || (
                        <TouchableOpacity style={styles.captureButton} onPress={this.stopRecording}>
                            <Image source={require('./assets/ic_stop_36pt.png')}/>
                        </TouchableOpacity>
                    )}
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