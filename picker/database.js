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
    getUserIdsByPoidsMax(poids) {
        var listId = [];
        for (var i in this.list) {
            if (this.list[i].poidsMax >= poids) {
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
class AlerteUtilisateurs extends React.Component {
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

class Emplacements extends React.Component {
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

class ArticleParcours extends React.Component {
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

class Commande extends React.Component {
    constructor() {
        super();
        var that = this;
        this.list = [];
        const itemsRef = firebase.database().ref('Commande');
        itemsRef.on('value', (snapshot) => {
            let items = snapshot.val();
            for (let item in items) {
                that.list.push({
                    id: item,
                    date: items[item].date,
                });
            }
            console.log("Database Commande is ready.")
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

class Parcours extends React.Component {
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

    // getEmplacementById(id){
    //     for (var i in this.list) {
    //         if (this.list[i].id.localeCompare(id)==0) {
    //             return this.list[i].colonne+this.list[i].emplacement+" E"+this.list[i].etagere+" S"+this.list[i].section;
    //         }
    //     }
    //     return "Not found";
    // }

}

class ArticleCommande extends React.Component {
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

    // getEmplacementById(id){
    //     for (var i in this.list) {
    //         if (this.list[i].id.localeCompare(id)==0) {
    //             return this.list[i].colonne+this.list[i].emplacement+" E"+this.list[i].etagere+" S"+this.list[i].section;
    //         }
    //     }
    //     return "Not found";
    // }

}

export default (Utilisateurs, Article, Alertes, AlerteUtilisateurs, Emplacements, ArticleParcours, ArticleCommande, Commande, Parcours);