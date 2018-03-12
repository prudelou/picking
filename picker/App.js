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
    Platform,
    Alert,
    TouchableOpacity,
    Dimensions,
    Modal,
} from 'react-native';
import {StackNavigator} from 'react-navigation';
import Camera from 'react-native-camera';
import t from 'tcomb-form-native';
import {Utilisateurs, Article, Alertes} from './database';

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
        const utilisateurs = new Utilisateurs();
        Alert.alert(utilisateurs.usernameExists() + " " + value);
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

//TODO: Lorsque la liste des articles est complétée, aller automatiquement sur l'écran FinishPicking
class Picking extends React.Component {
    static navigationOptions =
        {
            title: 'Récupération d\'article',
            headerLeft: null
        };

    handleSubmit = () => {
        this.props.navigation.navigate('StartScan');
    };

    state = {
        modalVisible: false,
        quantity: 3
    };

    setModalVisible(visible) {
        this.setState({modalVisible: visible});
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.paragraph}>A122</Text>
                <Text style={styles.paragraph}>S4</Text>
                <Text style={styles.paragraph}>E3</Text>
                <Text style={styles.paragraph}>Quantité : {this.state.quantity}</Text>
                <View style={styles.bottomElement}>
                    <Button
                        title="Scanner"
                        onPress={this.handleSubmit}
                    />
                </View>

                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={this.state.modalVisible}
                    onRequestClose={null}
                >
                    <View style={{marginTop: 22}}>
                        <View>
                            <Text style={styles.paragraph}>A122 S3 E4</Text>
                            <Text style={styles.paragraph}>A122 S3 E4</Text>
                            <Text style={styles.paragraph}>A122 S3 E4</Text>
                            <Text style={styles.paragraph}>A122 S3 E4</Text>
                            <Text style={styles.paragraph}>A122 S3 E4</Text>
                            <Text style={styles.paragraph}>A122 S3 E4</Text>

                            <Button
                                title="Fermer"
                                onPress={() => {
                                    this.setModalVisible(!this.state.modalVisible);
                                }}
                            />
                        </View>
                    </View>
                </Modal>

                <View style={{paddingTop: 20}}>
                    <Button
                        title="Afficher la liste des articles"
                        onPress={() => {
                            this.setModalVisible(true);
                        }}
                    />
                </View>
                <View style={{paddingTop: 20}}>
                    <Button
                        title="Signaler une anomalie"
                        onPress={() => {
                            this.props.navigation.navigate('Report');
                        }}
                    />
                </View>
            </View>
        );
    }
}

class StartScan extends React.Component {
    static navigationOptions =
        {
            title: 'Scanner l\'article'
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
            if (this.state.quantity > 1) {
                this.setState({canScan: false});
                this.setState({quantity: this.state.quantity - 1});
                Alert.alert("Result", "Barcode: " + data.data, [{
                    text: 'OK',
                    onPress: () => this.setState({canScan: true})
                },]);
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

class Report extends React.Component {
    static navigationOptions =
        {
            title: 'Signaler une anomalie'
        };

    state = {
        quantity: 3
    };

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.paragraph}>A122</Text>
                <Text style={styles.paragraph}>S4</Text>
                <Text style={styles.paragraph}>E3</Text>
                <Text style={styles.paragraph}>Quantité : {this.state.quantity}</Text>

                <View style={{paddingTop: 20}}>
                    <Button
                        title="Signaler un stock faible"
                        onPress={() => {
                            this.props.navigation.navigate('Picking');
                            //TODO: ajouter l'envoi d'alerte
                        }}
                    />
                </View>
                <View style={{paddingTop: 20}}>
                    <Button
                        title="Signaler une erreur d'emplacement"
                        onPress={() => {
                            this.props.navigation.navigate('Picking');
                            //TODO: ajouter l'envoi d'alerte
                        }}
                    />
                </View>
            </View>
        );
    }
}

class FinishPicking extends React.Component {
    static navigationOptions =
        {
            title: 'Terminer',
            headerLeft: null
        };

    handleSubmit = () => {
        this.props.navigation.navigate('Picking');
    };

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.paragraph}>La préparation de commande est terminée. Cliquez sur le bouton ci-dessous
                    pour finaliser la commande</Text>
                <Button
                    title="Terminer"
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
        StartScan: {screen: StartScan},
        Report: {screen: Report},
        FinishPicking: {screen: FinishPicking}
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
    bottomElement: {
        flexDirection: 'row',
        position: 'absolute',
        padding: 16,
        bottom: 0,
        left: 0,
        right: 0,
        alignItems: 'center',
        justifyContent: 'center',
    }
});