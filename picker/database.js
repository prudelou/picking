import React from 'react';
import firebase from "./firebase";

// Classe contenant les données de la table utilisateur
export class Utilisateurs extends React.Component {
    constructor() {
        super();
        var that = this;
        this.list = [];
        const itemsRef = firebase.database().ref('Utilisateur');
        itemsRef.on('value', (snapshot) => {
            let items = snapshot.val();
            for (let item in items) {
                that.list.push({
                    id: item,
                    nom: items[item].nom,
                    poidsMax: items[item].poidsmax,
                    type: items[item].type,
                });
            }
            console.log("Database Utilisateur is ready.")
        });
    }

    // Retourne l'id de l'utilisateur portant le nom "name". Retourne "Not found" si pas trouvé.
    getUserIdByName(name) {
        for (const i in this.list) {
            if (this.list[i].nom.localeCompare(name) === 0) {
                return this.list[i].id;
            }
        }
        return -1;
    }

    // Retourne l'id de l'utilisateur portant le nom "name". Retourne "Not found" si pas trouvé.
    getUserNameById(id) {
        for (var i in this.list) {
            if (this.list[i].id.localeCompare(id) === 0) {
                return this.list[i].nom;
            }
        }
        return -1;
    }

    // Return exists if username exists, -1 if not.
    usernameExists(name) {
        console.log(this.list);
        for (let i in this.list) {
            if (this.list[i].nom.localeCompare(name) === 0) {
                return 0;
            }
        }
        return -1;
    }

    // Retourne une liste d'id d'utilisateurs pouvant porter le poids "poids".
    getPoidsMaxById(id) {
        for (let i in this.list) {
            if (this.list[i].id.localeCompare(id) === 0) {
                return this.list[i].poidsMax;
            }
        }
        return 120;
    }

    // Retourne une liste d'id d'utilisateurs du type passé en paramètre
    getUserIdsByType(type) {
        var listId = [];
        for (var i in this.list) {
            if (this.list[i].type == type) {
                listId.push(this.list[i].id);
            }
        }
        return listId;
    }
}

// Classe contenant les données de la table Alertes
export class Alertes extends React.Component {
    constructor() {
        super();
        var that = this;
        this.list = [];
        const itemsRef = firebase.database().ref('Alerte');
        itemsRef.on('value', (snapshot) => {
            let items = snapshot.val();
            for (let item in items) {
                that.list.push({
                    id: item,
                    article: items[item].article,
                    date: items[item].date,
                    type: items[item].type,
                });
            }
            console.log("Database Alerte is ready.")
        });
    }

    addAlert(idArticle, type, id) {
        // Create alert
        let itemsRef = firebase.database().ref('Alerte');
        let currentDate = new Date().toString();
        let items = [{article: idArticle, date: currentDate, type: type, solved: "0"}];
        for (let item in items) {
            let newKey = itemsRef.push(items[item]).key;
            itemsRef = firebase.database().ref('AlerteUtilisateur');
            let itemsTwo = [{alerte: newKey, utilisateur: id}];
            for (let itemTwo in itemsTwo) {
                itemsRef.push(itemsTwo[itemTwo]);
            }
        }
    }
}

// Classe contenant les données de la table Alertes
export class Article extends React.Component {
    constructor() {
        super();
        var that = this;
        this.list = [];
        const itemsRef = firebase.database().ref('Article');
        itemsRef.on('value', (snapshot) => {
            let items = snapshot.val();
            for (let item in items) {
                that.list.push({
                    id: item,
                    nom: items[item].nom,
                    emplacement: items[item].emplacement,
                    poids: items[item].poids,
                    stock: items[item].stock,
                });
            }
            console.log("Database Article is ready.")
        });
    }

    // Retourne l'id de l'utilisateur portant le nom "name". Retourne "Not found" si pas trouvé.
    getArticleNameById(id) {
        for (var i in this.list) {
            if (this.list[i].id.localeCompare(id) == 0) {
                return this.list[i].nom;
            }
        }
        return "Not found";
    }

    getArticleStockById(id) {
        for (var i in this.list) {
            if (this.list[i].id.localeCompare(id) == 0) {
                return this.list[i].stock;
            }
        }
        return "Not found";
    }

    getEmplcamentIdByArticleId(id) {
        for (var i in this.list) {
            if (this.list[i].id.localeCompare(id) == 0) {
                return this.list[i].emplacement;
            }
        }
        return "Not found";
    }
}

// Classe contenant les données de la table Alertes
export class AlerteUtilisateurs extends React.Component {
    constructor() {
        super();
        var that = this;
        this.list = [];
        const itemsRef = firebase.database().ref('AlerteUtilisateur');
        itemsRef.on('value', (snapshot) => {
            let items = snapshot.val();
            for (let item in items) {
                that.list.push({
                    id: item,
                    alerte: items[item].alerte,
                    utilisateur: items[item].utilisateur,
                });
            }
            console.log("Database AlerteUtilisateur is ready.")
        });
    }

    getUserIdByAlertId(id) {
        for (var i in this.list) {
            if (this.list[i].alerte.localeCompare(id) == 0) {
                return this.list[i].utilisateur;
            }
        }
        return "Not found";
    }

}

export class Emplacements extends React.Component {
    constructor() {
        super();
        var that = this;
        this.list = [];
        const itemsRef = firebase.database().ref('Emplacement');
        itemsRef.on('value', (snapshot) => {
            let items = snapshot.val();
            for (let item in items) {
                that.list.push({
                    id: item,
                    colonne: items[item].colonne,
                    emplacement: items[item].emplacement,
                    etagere: items[item].etagere,
                    section: items[item].section,
                });
            }
            console.log("Database Emplacement is ready.")
        });
    }

    getEmplacementById(id) {
        for (var i in this.list) {
            if (this.list[i].id.localeCompare(id) == 0) {
                return this.list[i].colonne + this.list[i].emplacement + " E" + this.list[i].etagere + " S" + this.list[i].section;
            }
        }
        return "Not found";
    }

}

export class ArticleParcours extends React.Component {
    constructor() {
        super();
        var that = this;
        this.list = [];
        const itemsRef = firebase.database().ref('ArticleParcours');
        itemsRef.on('value', (snapshot) => {
            let items = snapshot.val();
            for (let item in items) {
                that.list.push({
                    id: item,
                    article: items[item].article,
                    parcours: items[item].parcours,
                });
            }
            console.log("Database ArticleParcours is ready.")
        });
    }

    // getEmplacementById(id){
    //     for (var i in this.list) {
    //         if (this.list[i].id.localeCompare(id)==0) {
    //             return this.list[i].colonne+this.list[i].emplacement+" E"+this.list[i].etagere+" S"+this.list[i].section;
    //         }
    //     }
    //     return "Not found";
    // }

}

export class Commande extends React.Component {
    constructor() {
        super();
        let that = this;
        this.list = [];
        const itemsRef = firebase.database().ref().child('ArticleCommande/').orderByChild('date_updated').once('value').then(function (snapshot) {
            let items = snapshot.val();
            console.log(snapshot);
            console.log(items);
            for (let item in items) {
                // Let's go for second table
                let refArticle = firebase.database().ref().child('Article/' + items[item].article).once('value').then(function (snapshotArticle) {
                    let itemsArticle = snapshotArticle.val();
                    // Let's go for third table
                    let refEmplacement = firebase.database().ref().child('Emplacement/' + itemsArticle['emplacement']).once('value').then(function (snapshotEmplacement) {
                        let emplacement = snapshotEmplacement.val();
                        that.list.push({
                            //Table Article
                            id: item, // ID of ArticleCommande
                            stock: itemsArticle['stock'],
                            poids: itemsArticle['poids'],
                            nom: itemsArticle['nom'],
                            // emplacement: itemsArticle['emplacement'], // ID of Emplacement

                            // Table Emplacement
                            colonne: emplacement['colonne'],
                            emplacement: emplacement['emplacement'],
                            etagere: emplacement['etagere'],
                            section: emplacement['section'],

                            // Table ArticleCommande
                            article: items[item].article, // ID of Article
                            commande: items[item].commande, // ID of Commande
                            isintoparcours: items[item].isintoparcours,
                            quantité: items[item].quantité,
                        });
                    });
                });
            }
            console.log("Database Commande is ready.");
        });
    }

    getCommandes() {
        return this.list;
    }

}

export class Parcours extends React.Component {
    constructor() {
        super();
        var that = this;
        this.list = [];
        const itemsRef = firebase.database().ref('Parcours');
        itemsRef.on('value', (snapshot) => {
            let items = snapshot.val();
            for (let item in items) {
                that.list.push({
                    id: item,
                    date: items[item].date,
                    isPicked: items[item].isPicked,
                    utilisateur: items[item].utilisateur,
                });
            }
            console.log("Database Parcours is ready.")
        });
    }

    getParcoursFor(utilisateurs, commandes, id) {
        console.log('Début de la génération du parcours');
        // On récupère le poids max de l'utilisateur
        let poidsCommande = 0;
        let poidsMax = utilisateurs.getPoidsMaxById(id);

        // On récupère toutes les commandes
        let commandList = commandes.getCommandes();

        // Calcul du parcours
        let parcours = [];
        console.log(commandList);
        for (let i = 0; i < commandList.length; i++) {
            console.log(commandList[i]);
            if (poidsCommande + (commandList[i]['poids'] * commandList[i]['quantité']) <= poidsMax && commandList[i]['isintoparcours'] !== 1) {

                if (parcours.length === 0) {
                    parcours.push(commandList[i]);
                }
                // Si l'élément actuel est le même que le précédent, additionner les quantités
                else if (parcours[parcours.length - 1]['nom'].localeCompare(commandList[i]['nom']) === 0 &&
                    parcours[parcours.length - 1]['colonne'].localeCompare(commandList[i]['colonne']) === 0 &&
                    parcours[parcours.length - 1]['emplacement'] === commandList[i]['emplacement'] &&
                    parcours[parcours.length - 1]['section'] === commandList[i]['section'] &&
                    parcours[parcours.length - 1]['etagere'] === commandList[i]['etagere']) {
                    parcours[parcours.length - 1]['quantité'] = parcours[parcours.length - 1]['quantité'] + commandList[i]['quantité'];
                }
                else {
                    parcours.push(commandList[i]);
                }

                poidsCommande += (commandList[i]['poids'] * commandList[i]['quantité']);

                // Set is into parcours in base
                const itemsRef = firebase.database().ref('ArticleCommande');
                let data = {isintoparcours: 1};
                itemsRef.child(commandList[i]['id']).update(data);
            }
        }

        // Suppression des doublons
        // let parcours_new = [];
        // for (let i = 0; i < parcours.length; i++) {
        //     if (i + 1 !== parcours.length) {
        //         // Si l'élément courant est le même que le suivant
        //         if (parcours[i]['nom'].localeCompare(parcours[i + 1]['nom']) === 0 &&
        //             parcours[i]['colonne'].localeCompare(parcours[i + 1]['colonne']) === 0 &&
        //             parcours[i]['emplacement'] === parcours[i + 1]['emplacement'] &&
        //             parcours[i]['section'] === parcours[i + 1]['section'] &&
        //             parcours[i]['etagere'] === parcours[i + 1]['etagere']) {
        //                 parcours[i]['quantité'] = parcours[i]['quantité'] + parcours[i + 1]['quantité'];
        //                 parcours = parcours.slice(i, i + 1);
        //                 // parcours_new.push(parcours[i]);
        //         }
        //     }
        // }
        // parcours = parcours_new;

        // TODO: Insert into parcours and ArticleParcours
        // let itemsRef = firebase.database().ref('Parcours');
        // for (let parcoursItem in parcours) {
        //     let newKey = itemsRef.push(parcours[parcoursItem]).key;
        //     let ref = firebase.database().ref('ArticleParcours');
        //
        //     // Insert in second base
        //     let itemsTwo = [{article: parcoursItem['article'], parcours: newKey}];
        //     for (let itemTwo in itemsTwo) {
        //         itemsRef.push(itemsTwo[itemTwo]);
        //     }
        // }

        console.log('Fin de la génération du parcours. Poids du parcours : ' + poidsCommande);
        return parcours;
    }

}

export class ArticleCommande extends React.Component {
    constructor() {
        super();
        var that = this;
        this.list = [];
        const itemsRef = firebase.database().ref('ArticleCommande');
        itemsRef.on('value', (snapshot) => {
            let items = snapshot.val();
            for (let item in items) {
                that.list.push({
                    id: item,
                    article: items[item].article,
                    commande: items[item].commande,
                    isintoparcours: items[item].isintoparcours,
                    quantité: items[item].quantité,
                });
            }
            console.log("Database ArticleCommande is ready.")
        });
    }
}

export default (Utilisateurs, Parcours, Article, Alertes, AlerteUtilisateurs, Emplacements, ArticleParcours, Commande, ArticleCommande);