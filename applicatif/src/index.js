import React from 'react';
import ReactDOM from 'react-dom';
import Materialize from 'materialize-css';
import firebase from './firebase.js';
import './index.css';

// ========================= Class Utilisateur mng ===========================
// Classe contenant les données de la table utilisateur
class Utilisateurs {

    constructor(){
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
    getUserIdByName(name){
        for (var i in this.list) {
            if (this.list[i].nom.localeCompare(name)==0) {
                return this.list[i].id;
            }
        }
        return "Not found";
    }

    // Retourne l'id de l'utilisateur portant le nom "name". Retourne "Not found" si pas trouvé.
    getUserNameById(id){
        for (var i in this.list) {
            if (this.list[i].id.localeCompare(id)==0) {
                return this.list[i].nom;
            }
        }
        return "Not found";
    }

    // Return exists if username exists, -1 if not.
    usernameExists(name){
        for (var i in this.list) {
            if (this.list[i].nom.localeCompare(name)==0) {
                return 0;
            }
        }
        return -1;
    }

    // Retourne une liste d'id d'utilisateurs pouvant porter le poids "poids".
    getUserIdsByPoidsMax(poids){
        var listId = [];
        for (var i in this.list) {
            if (this.list[i].poidsMax >= poids) {
                listId.push(this.list[i].id);
            }
        }
        return listId;
    }

    // Retourne une liste d'id d'utilisateurs du type passé en paramètre
    getUserIdsByType(type){
        var listId = [];
        for (var i in this.list) {
            if (this.list[i].type == type) {
                listId.push(this.list[i].id);
            }
        }
        return listId;
    }

}
// ==========================================================================



// ========================= Class Alerte mng ==========================
// Classe contenant les données de la table Alertes
class Alertes {
    constructor(){
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
// ==========================================================================



// ========================= Class Article mng ==========================
// Classe contenant les données de la table Alertes
class Articles {
    constructor(){
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
    getArticleNameById(id){
        for (var i in this.list) {
            if (this.list[i].id.localeCompare(id)==0) {
                return this.list[i].nom;
            }
        }
        return "Not found";
    }

    getArticleStockById(id){
        for (var i in this.list) {
            if (this.list[i].id.localeCompare(id)==0) {
                return this.list[i].stock;
            }
        }
        return "Not found";
    }

    getEmplcamentIdByArticleId(id){
        for (var i in this.list) {
            if (this.list[i].id.localeCompare(id)==0) {
                return this.list[i].emplacement;
            }
        }
        return "Not found";
    }
}
// ==========================================================================



// ====================== Class AlerteUtilisateur mng =======================
// Classe contenant les données de la table Alertes
class AlerteUtilisateurs {
    constructor(){
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

    getUserIdByAlertId(id){
            for (var i in this.list) {
                if (this.list[i].alerte.localeCompare(id)==0) {
                return this.list[i].utilisateur;
            }
        }
        return "Not found";
    }

}
// ==========================================================================



// ========================= Class Emplacement mng ==========================
// Classe contenant les données de la table Emplacement
class Emplacements {
    constructor(){
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

    getEmplacementById(id){
        for (var i in this.list) {
            if (this.list[i].id.localeCompare(id)==0) {
                return this.list[i].colonne+this.list[i].emplacement+" E"+this.list[i].etagere+" S"+this.list[i].section;
            }
        }
        return "Not found";
    }

}
// ==========================================================================

// ========================= JS Declaration =================================
var username; // Username of current user connected
// ==========================================================================



// ========================= UI Declaration =================================

// UI of login page
const login = (
    <div>
        <div class="row">
            <div class="col s12 center-align">
                <h1>Bienvenue</h1>
            </div>
        </div>
        <div class="row">
            <div class="col s12 center-align">
                <h5>Saisissez votre identifiant pour continuer</h5>
            </div>
        </div>
            {/*<form onSubmit={}>*/}
            <div class="row">
                <div class="col s4 offset-s4 center-align">
                        <div class="input-field ">
                            <input id="identifiant" type="text"  class="validate"/>
                            <label for="identifiant">Identifiant</label>
                        </div>
                </div>
            </div>
            <div class="row">
                <div class="col s12 center-align">
                    <button class="waves-effect waves-light btn-large" type="submit" id="connect" onClick={connection}>Se connecter</button>
                </div>
            </div>

            {/*<div class="row">*/}
                {/*<div class="col s12 center-align">*/}
                    {/*<button class="waves-effect waves-light btn-large" type="submit" id="generateDb" onClick={generateDB}>GenerateDB</button>*/}
                {/*</div>*/}
            {/*</div>*/}
        {/*</form>*/}

    </div>
);

// ==========================================================================



// ============================ Functions ===================================

function connection() {
    if (utilisateurs.usernameExists(document.getElementById("identifiant").value)==0){
        username = document.getElementById("identifiant").value;
        Materialize.toast("Bonjour " + username, 1000)

        var rows = [];
        for (var i in alertes.list) {
            if (alertes.list[i].type == 1) {
                rows.push(  <tr>
                                <td>{articles.getArticleNameById(alertes.list[i].article)}</td>
                                <td>{emplacements.getEmplacementById(articles.getEmplcamentIdByArticleId(alertes.list[i].article))}</td>
                                <td>{articles.getArticleStockById(alertes.list[i].article)}</td>
                                <td>{utilisateurs.getUserNameById(alerteUtilisateurs.getUserIdByAlertId(alertes.list[i].id))}</td>
                                <td>{alertes.list[i].date}</td>
                            </tr>)
            }
        }

        var stockfaible = [];
        for (var i in alertes.list) {
            if (alertes.list[i].type == 0) {
                stockfaible.push(  <tr>
                                        <td>{articles.getArticleNameById(alertes.list[i].article)}</td>
                                        <td>{emplacements.getEmplacementById(articles.getEmplcamentIdByArticleId(alertes.list[i].article))}</td>
                                        <td>{articles.getArticleStockById(alertes.list[i].article)}</td>
                                        <td>{utilisateurs.getUserNameById(alerteUtilisateurs.getUserIdByAlertId(alertes.list[i].id))}</td>
                                        <td>{alertes.list[i].date}</td>
                                    </tr>)
            }
        }

        // UI of supervision page
        const supervision = (
            <div>
                <nav>
                    <div class="nav-wrapper">
                        <a class="brand-logo">{username}</a>
                        <ul id="nav-mobile" class="right hide-on-med-and-down">
                            <li><a href="index.html">Déconnexion</a></li>
                        </ul>
                    </div>
                </nav>
                <div class="row">
                    <div class="col offset-s3">
                        <h4>Alertes de stocks faibles</h4>
                    </div>
                </div>

                <div class="row">
                    <div class="col s6 offset-s3 center-align">
                        <table class="highlight">
                            <thead>
                            <tr>
                                <th>Article</th>
                                <th>Emplacement</th>
                                <th>Stock</th>
                                <th>Rapporteur</th>
                                <th>Date</th>
                            </tr>
                            </thead>
                            <tbody>
                                {stockfaible}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div class="row">
                    <div class="col offset-s3">
                        <h4>Alertes d'emplacements erronés</h4>
                    </div>
                </div>

                <div class="row">
                    <div class="col s6 offset-s3 center-align">
                        <table class="highlight">
                            <thead>
                            <tr>
                                <th>Article</th>
                                <th>Emplacement</th>
                                <th>Stock</th>
                                <th>Rapporteur</th>
                                <th>Date</th>
                            </tr>
                            </thead>
                            <tbody>
                                {rows}
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
        );

        ReactDOM.render(supervision, document.getElementById('root'));
    }
    else{
        Materialize.toast("Le nom d'utilisateur n'existe pas.", 1000)
        console.log("Le nom d'utilisatuer n'existe pas.")
    }
}



// Generate DataBase, launch when button "generateDb" is click.
function generateDB(){
    // // Create users
    // var itemsRef = firebase.database().ref('Utilisateur');
    // var items = [       {nom: "Alexandre Dupont",         type:0, poidsmax:120},
    //                     {nom: "Didier Lafonte",           type:1, poidsmax:90},
    //                     {nom: "Alexandra Dugland",        type:1, poidsmax:1234},
    //                     {nom: "Michel Delpech",           type:1, poidsmax:120},
    //                     {nom: "Geaorges Linares",         type:1, poidsmax:90},
    //                     {nom: "Didier Lafonte",           type:1, poidsmax:23}
    //             ];
    // for (var item in items){
    //     itemsRef.push(items[item]);
    // }
    //
    // // Create emplacement
    // itemsRef = firebase.database().ref('Emplacement');
    // items = [       {colonne: "A",    emplacement:0, section:2, etagere:2},
    //                 {colonne: "A",    emplacement:1, section:4, etagere:2},
    //                 {colonne: "B",    emplacement:1, section:1, etagere:2},
    //                 {colonne: "S",    emplacement:1, section:5, etagere:2},
    //                 {colonne: "E",    emplacement:1, section:1, etagere:2},
    //                 {colonne: "E",    emplacement:1, section:2, etagere:2}
    //         ];
    // for (var item in items){
    //     itemsRef.push(items[item]);
    // }
    //
    // // Create article
    // itemsRef = firebase.database().ref('Article');
    // items = [       {nom: "Twix",       emplacement:"-L7458X6sqOG1Eg_JSeA", stock:2, poids:2},
    //                 {nom: "Snickers",   emplacement:"-L7458X74ir5hea7g5D6", stock:4, poids:2},
    //                 {nom: "Mars",       emplacement:"-L7458X74ir5hea7g5D7", stock:1, poids:2},
    //                 {nom: "Duplot",     emplacement:"-L7458X74ir5hea7g5D8", stock:5, poids:2},
    //                 {nom: "Kinder",     emplacement:"-L7458X74ir5hea7g5D9", stock:1, poids:2},
    //                 {nom: "Bounty",     emplacement:"-L7458X8K9im4Zx9W_71", stock:2, poids:2}
    // ];
    // for (var item in items){
    //     itemsRef.push(items[item]);
    // }
    //
    // //Create parcours
    // itemsRef = firebase.database().ref('Parcours');
    // items = [       {date: "12/03/2018",       isPicked:0},
    //                 {date: "12/03/2018",       isPicked:0},
    //                 {date: "12/03/2018",       isPicked:0},
    //                 {date: "12/03/2018",       isPicked:0},
    //                 {date: "12/03/2018",       isPicked:1},
    //                 {date: "12/03/2018",       isPicked:1}
    //         ];
    // for (var item in items){
    //     itemsRef.push(items[item]);
    // }
    //
    // //Create articleParcours
    // itemsRef = firebase.database().ref('ArticleParcours');
    // items = [       {article: "-L745mFyja4lK0e0Srw6",       parcours:"-L748Qt6ZlOS98nu3lrN"},
    //                 {article: "-L745mG0uZrb55Oy5FEE",       parcours:"-L748Qt8W8nB65pE7o_1"},
    //                 {article: "-L745mG1wUMB2PaF7ygE",       parcours:"-L748Qt8W8nB65pE7o_2"},
    //                 {article: "-L745mG1wUMB2PaF7ygF",       parcours:"-L748Qt9zw4TuEz1xms2"},
    //                 {article: "-L745mG1wUMB2PaF7ygG",       parcours:"-L748QtAgLnCgq0b1m7c"},
    //                 {article: "-L745mG1wUMB2PaF7ygH",       parcours:"-L748QtAgLnCgq0b1m7d"}
    //         ];
    // for (var item in items){
    //     itemsRef.push(items[item]);
    // }
    //
    // //Create commande
    // itemsRef = firebase.database().ref('Commande');
    // items = [       {date: "12/03/2018"},
    //                 {date: "13/03/2018"},
    //                 {date: "14/03/2018"},
    //                 {date: "15/03/2018"},
    //                 {date: "16/03/2018"},
    //                 {date: "17/03/2018"}
    //         ];
    // for (var item in items){
    //     itemsRef.push(items[item]);
    // }
    //
    // //Create ArticleCommande
    // itemsRef = firebase.database().ref('ArticleCommande');
    // items = [       {article: "-L745mFyja4lK0e0Srw6", commande: "-L74B-MH8dSPYcahJCim", isintoparcours:0, quantité:1},
    //                 {article: "-L745mG0uZrb55Oy5FEE", commande: "-L74B-MK68RfiaFLzDwX", isintoparcours:0, quantité:1},
    //                 {article: "-L745mG1wUMB2PaF7ygE", commande: "-L74B-MK68RfiaFLzDwY", isintoparcours:0, quantité:1},
    //                 {article: "-L745mG1wUMB2PaF7ygF", commande: "-L74B-MK68RfiaFLzDwZ", isintoparcours:0, quantité:1},
    //                 {article: "-L745mG1wUMB2PaF7ygG", commande: "-L74B-MK68RfiaFLzDw_", isintoparcours:0, quantité:1},
    //                 {article: "-L745mG1wUMB2PaF7ygH", commande: "-L74B-MK68RfiaFLzDwa", isintoparcours:1, quantité:1},
    // ];
    // for (var item in items){
    //     itemsRef.push(items[item]);
    // }
    //
    // //Create Alerte
    // itemsRef = firebase.database().ref('Alerte');
    // items = [       {date: "12/03/2018", type:0, article:"-L745mFyja4lK0e0Srw6\n"},
    //                 {date: "13/03/2018", type:0, article:"-L745mG0uZrb55Oy5FEE"},
    //                 {date: "14/03/2018", type:0, article:"-L745mG1wUMB2PaF7ygE"},
    //                 {date: "15/03/2018", type:1, article:"-L745mG1wUMB2PaF7ygF"},
    //                 {date: "16/03/2018", type:1, article:"-L745mG1wUMB2PaF7ygG"},
    //                 {date: "17/03/2018", type:0, article:"-L745mG1wUMB2PaF7ygH"}
    //             ];
    //
    // for (var item in items){
    //     itemsRef.push(items[item]);
    // }
    //
    // // Create AlerteUtilisateur
    // itemsRef = firebase.database().ref('AlerteUtilisateur');
    // items = [       {alerte: "-L78WsrkWpBJbBDcXBhX", utilisateur:"-L7458X0XAfX5xUYFLX6"},
    //                 {alerte: "-L78WsrnoirvjOpVTXwS", utilisateur:"-L7458X3wAAJ4Y21Ef_G"},
    //                 {alerte: "-L78WsrnoirvjOpVTXwT", utilisateur:"-L7458X5HHVqtZ4btVSM"},
    //                 {alerte: "-L78WsrnoirvjOpVTXwU", utilisateur:"-L7458X5HHVqtZ4btVSN"},
    //                 {alerte: "-L78WsrokMhvP1kGM-Fz", utilisateur:"-L7458X5HHVqtZ4btVSO"},
    //                 {alerte: "-L78WsrokMhvP1kGM-G-", utilisateur:"-L7458X5HHVqtZ4btVSP"}
    //             ];
    //
    // for (var item in items){
    //     itemsRef.push(items[item]);
    // }

}
// ==========================================================================



// =========================== Run at start =================================
// Generate login page
var utilisateurs = new Utilisateurs();
var alertes = new Alertes();
var articles = new Articles();
var alerteUtilisateurs = new AlerteUtilisateurs();
var emplacements = new Emplacements();

ReactDOM.render(login, document.getElementById('root'));
// ==========================================================================
