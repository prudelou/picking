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
    AsyncStorage,
    ActivityIndicator
} from 'react-native';
import {StackNavigator} from 'react-navigation';
import Camera from 'react-native-camera';
import t from 'tcomb-form-native';
import {
    Utilisateurs,
    Parcours,
    Commande,
    Alertes
} from './database';

const Form = t.form.Form;

// Constant fields used instead of AsyncStorage
let ID = -1;
let PICKING_LIST = [];

const LoginStruct = t.struct({
    Identifiant: t.String,
});

async function saveItem(key, value) {
    try {
        console.log("Saving " + key + " : " + value);
        await AsyncStorage.setItem(key, value);
    } catch (error) {
        console.log('Error while saving data for key : ' + key);
    }
}

async function getItem(key) {
    try {
        console.log("Retreiving " + key);
        return await AsyncStorage.getItem(key);
    } catch (error) {
        console.log('Error while saving data for key : ' + key);
    }
    return null;
}

class Login extends React.Component {
    static navigationOptions =
        {
            title: 'Picking',
            headerLeft: null
        };

    handleSubmit = () => {
        const value = this._form.getValue(); // use that ref to get the form value
        this.state.id = this.state.utilisateurs.getUserIdByName(value.Identifiant);
        if (value !== null) {
            if (this.state.id !== -1) {
                saveItem('id', this.state.id);
                ID = this.state.id;
                this.props.navigation.navigate('StartPicking');
                Keyboard.dismiss();
            }
        }
    };

    constructor(props) {
        super(props);

        this.state = {
            utilisateurs: new Utilisateurs(),
            id: -1,
        };
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.hello}>Bonjour</Text>
                <View style={styles.form}>
                    <Form
                        ref={c => this._form = c} // assign a ref
                        type={LoginStruct}
                        value={{Identifiant: 'Wesh'}}
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
        this.setState({isLoaderVisible: true}); // set loader visible
        console.log(this.state.id);

        PICKING_LIST = this.state.parcours.getParcoursFor(this.state.utilisateurs, this.state.commande, this.state.id);
        console.log(PICKING_LIST);

        this.setState({isLoaderVisible: false}); // set loader invisible

        if (PICKING_LIST.length === 0) {
            // If Tables are not loaded or nothing to be picked
            Alert.alert("Aucune commande disponible");
        }
        else {
            this.props.navigation.navigate('Picking');
        }

    };

    constructor(props) {
        super(props);

        this.state = {
            id: ID,
            isLoaderVisible: false,
            parcours: new Parcours(),
            commande: new Commande(),
            utilisateurs: new Utilisateurs()
        };
    }

    //TODO: ajouter AsyncStorage (ou react native storage) plus tard
    // Attention, componentWillMount est déprécié mais c'est le seul qui marche. Niksamère react native
    // async componentWillMount() {
    //     AsyncStorage.getItem('id').then((value) => this.setState({ id: value }), Alert.alert('c bon mdr'));
    // }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.paragraph}>Cliquez sur le bouton ci-dessous pour démarrer la préparation de
                    commandes</Text>
                <Button
                    title="Démarrer"
                    onPress={this.handleSubmit}
                    color="#56ee01"
                />
                <View style={[styles.container, styles.horizontal]}>
                    <ActivityIndicator animating={this.state.isLoaderVisible} size="large" color="#0000ff"/>
                </View>
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
    };

    setModalVisible(visible) {
        this.setState({modalVisible: visible});
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.paragraph}>{PICKING_LIST[0]['nom']}</Text>
                <Text style={styles.paragraph}>{PICKING_LIST[0]['colonne']}{PICKING_LIST[0]['emplacement']}</Text>
                <Text style={styles.paragraph}>Section {PICKING_LIST[0]['section']}</Text>
                <Text style={styles.paragraph}>Etagère {PICKING_LIST[0]['etagere']}</Text>
                <Text style={styles.paragraph}>Quantité : {PICKING_LIST[0]['quantité']}</Text>
                <View style={styles.bottomElement}>
                    <Button
                        title="Scanner"
                        onPress={this.handleSubmit}
                        color="#eee252"
                    />
                </View>

                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={this.state.modalVisible}
                    onRequestClose={() => null}
                >
                    <View style={{marginTop: 22}}>
                        <View>
                            { // On affiche le contenu du modal
                                PICKING_LIST.map((picking, key) => {
                                    return (
                                        <Text style={styles.paragraph}
                                              key={key}>{picking['nom']} : {picking['colonne']}{picking['emplacement']} S{picking['section']} E{picking['etagere']}</Text>
                                    )
                                })
                            }

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
                        color="#ee130e"
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
            },
            canScan: true,
        };

    }

    static onBarCodeRead(data) {
        console.log("Code scanné");
        if (this.state.canScan) {
            if (this.state.quantity > 1) {
                this.setState({canScan: false});
                this.setState({quantity: this.state.quantity - 1});
                Alert.alert("Produit scanné", "Code barres : " + data.data, [{
                    text: 'OK',
                    onPress: () => this.setState({canScan: true})
                },]);
            }
            else {
                PICKING_LIST = PICKING_LIST.slice(1, PICKING_LIST.length); // On vire l'élément qu'on vient de scanner
                if (PICKING_LIST.length === 0) {
                    this.props.navigation.navigate('FinishPicking');
                }
                else {
                    this.props.navigation.navigate('Picking');
                }
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
                    style={styles.preview}
                    aspect={this.state.camera.aspect}
                    captureTarget={this.state.camera.captureTarget}
                    flashMode={this.state.camera.flashMode}
                    onBarCodeRead={StartScan.onBarCodeRead.bind(this)}
                />
                <View style={[styles.overlay, styles.bottomOverlay]}>
                    <Text style={styles.bottomText}>Quantité : {PICKING_LIST[0]['quantité']}</Text>
                    <Button
                        title="Validation manuelle"
                        onPress={() => {
                            PICKING_LIST = PICKING_LIST.slice(1, PICKING_LIST.length); // On vire l'élément qu'on vient de scanner
                            if (PICKING_LIST.length === 0) {
                                this.props.navigation.navigate('FinishPicking');
                            }
                            else {
                                this.props.navigation.navigate('Picking');
                            }
                        }}
                    />
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
        alert: new Alertes(),
    };

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.paragraph}>{PICKING_LIST[0]['colonne']}{PICKING_LIST[0]['emplacement']}</Text>
                <Text style={styles.paragraph}>S{PICKING_LIST[0]['section']}</Text>
                <Text style={styles.paragraph}>E{PICKING_LIST[0]['etagere']}</Text>
                <Text style={styles.paragraph}>Quantité : {PICKING_LIST[0]['quantité']}</Text>

                <View style={{paddingTop: 20}}>
                    <Button
                        title="Signaler un stock insuffisant"
                        onPress={() => {
                            this.state.alert.addAlert(PICKING_LIST[0]['article'], "0", ID);

                            PICKING_LIST = PICKING_LIST.slice(1, PICKING_LIST.length); // On vire l'élément qu'on vient de scanner
                            if (PICKING_LIST.length === 0) {
                                this.props.navigation.navigate('FinishPicking');
                            }
                            else {
                                this.props.navigation.navigate('Picking');
                            }
                        }}
                        color="#ee130e"
                    />
                </View>
                <View style={{paddingTop: 20}}>
                    <Button
                        title="Signaler une erreur d'emplacement"
                        onPress={() => {
                            this.state.alert.addAlert(PICKING_LIST[0]['article'], "1", ID);

                            PICKING_LIST = PICKING_LIST.slice(1, PICKING_LIST.length); // On vire l'élément qu'on vient de scanner
                            if (PICKING_LIST.length === 0) {
                                this.props.navigation.navigate('FinishPicking');
                            }
                            else {
                                this.props.navigation.navigate('Picking');
                            }
                        }}
                        color="#ee130e"
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
        this.props.navigation.navigate('StartPicking');
    };

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.paragraph}>La préparation de commande est terminée. Cliquez sur le bouton ci-dessous
                    pour finaliser la commande</Text>
                <Button
                    title="Terminer"
                    onPress={this.handleSubmit}
                    color="#eee252"
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
        fontSize: 20,
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
    },
    horizontal: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10
    }
});