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
        for (var i in this.list) {
            if (this.list[i].nom.localeCompare(name) == 0) {
                return this.list[i].id;
            }
        }
        return "Not found";
    }

    // Return exists if username exists, -1 if not.
    usernameExists(name) {
        for (var i in this.list) {
            if (this.list[i].nom.localeCompare(name) == 0) {
                return 0;
            }
        }
        return -1;
    }

    // Retourne une liste d'id d'utilisateurs pouvant porter le poids "poids".
    getUserIdsByPoidsMax(poids) {
        var listId = [];
        for (var i in this.list) {
            if (this.list[i].poidsMax >= poids) {
                console.log("Add " + this.list[i].nom);
                listId.push(this.list[i].id);
            }
        }
        return listId;
    }

    // Retourne une liste d'id d'utilisateurs du type passé en paramètre
    getUserIdsByType(type) {
        var listId = [];
        for (var i in this.list) {
            if (this.list[i].type == type) {
                console.log("Add " + this.list[i].nom);
                listId.push(this.list[i].id);
            }
        }
        return listId;
    }
}

// Classe contenant les données de la table Alertes
export class Alertes extends React.Component {
}

// Classe contenant les données de la table Alertes
export class Article extends React.Component {
}

export default (Utilisateurs, Article, Alertes);