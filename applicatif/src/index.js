import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';


const element = (
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
                <button class="waves-effect waves-light btn-large" type="submit" name="action">Se connecter
                </button>
            </div>
        </div>
    </div>
);

ReactDOM.render(element, document.getElementById('root'));
