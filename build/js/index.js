"use strict";
let Case1 = document.getElementById('case1');
let Case2 = document.getElementById('case2');
let Case3 = document.getElementById('case3');
let Case4 = document.getElementById('case4');
let Case5 = document.getElementById('case5');
let Case6 = document.getElementById('case6');
let Case7 = document.getElementById('case7');
let Case8 = document.getElementById('case8');
let Case9 = document.getElementById('case9');
let BtnReplay = document.getElementById('Replay');
let Joueur = document.getElementById('Joueur');
const tab = [];
tab.push(Case1, Case2, Case3, Case4, Case5, Case6, Case7, Case8, Case9);
let SwitchPlayer = true;
const square = [
    [tab[0], tab[1], tab[2]],
    [tab[3], tab[4], tab[5]],
    [tab[6], tab[7], tab[8]],
    [tab[0], tab[3], tab[6]],
    [tab[1], tab[4], tab[7]],
    [tab[2], tab[5], tab[8]],
    [tab[0], tab[4], tab[8]],
    [tab[6], tab[4], tab[2]],
];
tab.map((element) => {
    element.addEventListener('click', () => {
        /* Empeche de remplir les cases vides aprés
            la victoire d'un des joueurs
        */
        const ImpossibleToClickAfterAWin = tab.some(element => element.style.backgroundColor === "rgba(30, 215, 8, 0.5)");
        if (element.firstChild === null && !ImpossibleToClickAfterAWin) {
            element.innerHTML = `${SwitchPlayer ? `<img alt="cercle" src="./image/cercle.png">`
                : `<img alt="croix" src="./image/croix.png">`}`;
            SwitchPlayer = !SwitchPlayer;
            Joueur.innerHTML = `${SwitchPlayer ? `<p>Joueur 1 à vous de JOUEZ !</p>
                                  <img alt="cercle" src="./image/cercle.png">`
                : `<p>Joueur 2 à vous de JOUEZ !</p> 
                                    <img alt="croix" src="./image/croix.png">`}`;
            const AnyWinner = square.every(element => PlayerWinOrNot(element, SwitchPlayer) === false);
            const FullCase = tab.every(element => element.firstChild !== null);
            if (FullCase && AnyWinner) {
                let DisplayContainer = document.createElement('div');
                let DisplayMessage = document.createElement('div');
                let SecondeDiv = document.createElement('div');
                let BTNValidate = document.createElement('button');
                let AlertMessage = document.createElement('h4');
                AlertMessage.id = "Modaltitle";
                AlertMessage.textContent = "Aucun des joueurs n'a remporter la partie.";
                SecondeDiv.id = "Shadow";
                DisplayContainer.id = "DisplayContainer";
                DisplayMessage.id = "DisplayMessage";
                BTNValidate.id = "ModalButton";
                BTNValidate.textContent = "OK";
                BTNValidate.onclick = function () {
                    document.body.removeChild(document.getElementById('Shadow'));
                    document.body.removeChild(document.getElementById('DisplayContainer'));
                };
                DisplayMessage.prepend(AlertMessage);
                DisplayMessage.append(BTNValidate);
                DisplayContainer.append(DisplayMessage);
                document.body.append(DisplayContainer, SecondeDiv);
            }
        } //else{return null}
    });
});
BtnReplay.addEventListener('click', () => {
    tab.map((element) => {
        element.innerHTML = "";
        element.style.backgroundColor = "white";
    });
});
function PlayerWinOrNot(tableau, vainqueur) {
    const ValeurDeReference = getValue(tableau[0]);
    if (ValeurDeReference === undefined) {
        //console.log("Case pas encore Cocher"); 
        return false;
    }
    for (let i = 1; i < tableau.length; i++) {
        const ValeurCourante = getValue(tableau[i]);
        if (ValeurDeReference !== ValeurCourante) {
            //console.log("Les valeurs ne sont pas toutes égales");
            return false;
        }
    }
    //console.log("Toutes les valeurs sont égales");
    tableau.map((element) => {
        element.style.backgroundColor = "rgba(30, 215, 8, 0.5)";
        element.style.borderRadius = "3px";
    });
    let DisplayContainer = document.createElement('div');
    let DisplayMessage = document.createElement('div');
    let SecondeDiv = document.createElement('div');
    let BTNValidate = document.createElement('button');
    let AlertMessage = document.createElement('h4');
    AlertMessage.id = "Modaltitle";
    AlertMessage.innerHTML = `${!vainqueur ? 'Le joueur 1 a remporter la partie !' : 'Le joueur 2 a remporter la partie !'}`;
    SecondeDiv.id = "Shadow";
    DisplayContainer.id = "DisplayContainer";
    DisplayMessage.id = "DisplayMessage";
    BTNValidate.id = "ModalButton";
    BTNValidate.textContent = "OK";
    BTNValidate.onclick = function () {
        document.body.removeChild(document.getElementById('Shadow'));
        document.body.removeChild(document.getElementById('DisplayContainer'));
    };
    DisplayMessage.prepend(AlertMessage);
    DisplayMessage.append(BTNValidate);
    DisplayContainer.append(DisplayMessage);
    document.body.append(DisplayContainer, SecondeDiv);
}
function getValue(element) {
    const X = element === null || element === void 0 ? void 0 : element.childNodes;
    console.log("X", X);
    if (X === null) {
        return X;
    }
    else {
        const imageElement = X[0];
        let result = imageElement === null || imageElement === void 0 ? void 0 : imageElement.alt;
        return result;
    }
}
