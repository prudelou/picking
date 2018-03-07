import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';


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
        <form>
            <div class="row">
                <div class="col s4 offset-s4 center-align">
                        <div class="input-field ">
                            <input id="identifiant" type="text" class="validate"/>
                            <label for="identifiant">Identifiant</label>
                        </div>
                </div>
            </div>
            <div class="row">
                <div class="col s12 center-align">
                    <button class="waves-effect waves-light btn-large" type="submit" id="connect" onClick={connection}>Se connecter</button>
                </div>
            </div>
        </form>

    </div>
);

const supervision = (
    <div>
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
                            <th>Stock</th>
                            <th>Rapporteur</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                toto
                            </td>
                            <td>
                                tata
                            </td>
                            <td>
                                tutu
                            </td>
                            <td>
                                trotro
                            </td>
                        </tr>
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
                        <th>Stock</th>
                        <th>Rapporteur</th>
                        <th>Date</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>
                            toto
                        </td>
                        <td>
                            tata
                        </td>
                        <td>
                            tutu
                        </td>
                        <td>
                            trotro
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>

    </div>
);



function connection() {
    ReactDOM.render(supervision, document.getElementById('root'));
}


ReactDOM.render(login, document.getElementById('root'));