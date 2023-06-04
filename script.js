// Création d'un objet qui gardera à jour les scores durant la partie.
const scoreTotal = {ordinateurScore: 0, joueurScore: 0}

// Cette fonction génère aléatoirement un chiffre entre 0 et la taill du tableau(3)
// On retourne ensuite l'index du tableau avec le chiffre aléatoire pour avoir le choix de l'ordi
function recupChoixOrdi() {
    const choix = ['Pierre', 'Feuille', 'Ciseau']
    const choixOrdinateur = Math.floor(Math.random() * choix.length)
    return choix[choixOrdinateur]
}

// Fonction qui va dénir le score en fonction des choix (victoire, défaite, égalité).
function recupResultat(choixJoueur, choixOrdinateur) {
let score;
  if (choixJoueur == choixOrdinateur){
    score = 0
  } else if (choixJoueur == 'Pierre' && choixOrdinateur == 'Ciseau'){
    score = 1
  } else if (choixJoueur == 'Feuille' && choixOrdinateur == 'Pierre'){
    score = 1
  } else if (choixJoueur == 'Ciseau' && choixOrdinateur == 'Feuille'){
    score = 1
  } else {
    score = -1
  }
return score
}

// Cette fonction va directement affecter le DOM et afficher le résultat du match à chaque fois
// qu'on appellera la fonction.
function afficherResultat(score, choixJoueur, choixOrdinateur) {
// récupération de tout les éléments du html grâce à l'id
  const resultDiv = document.getElementById('result')
  const handsDiv = document.getElementById('hands')
  const playScoreDiv = document.getElementById('joueur-score')
  const computerScoreDiv = document.getElementById('computer-score')

  if (score == -1){
    resultDiv.innerText = 'Tu as perdu!'
  } else if (score == 0){
    resultDiv.innerText = 'Match nul...'
  } else {
    resultDiv.innerText = 'Tu as gagné!'
  }

  // Cette ligne permet d'afficher à l'écran le choix du joueur et de l'ordinateur
  handsDiv.innerText = `🤠 ${choixJoueur} vs 🤖 ${choixOrdinateur}`

  // Les deux lignes qui suivent, permette d'afficher le score du joueur et de l'ordinateur.
  playScoreDiv.innerText = `Ton score: ${scoreTotal['joueurScore']}`
  computerScoreDiv.innerText = `Ordinateur score: ${scoreTotal['ordinateurScore']}`
}

// Cette fonction va prendre en paramètre le choix du joueur, elle va aussi appeler la méthode 
// recupChoixOrdi(), recupResultat() et afficherResultat(). En plus elle va incrémenter ou décrémenter en fonction 
// de qui gagne et qui perd.
function onClickRPS(choixJoueur) {
  const choixOrdinateur = recupChoixOrdi()
  const score = recupResultat(choixJoueur, choixOrdinateur)
  
  // Cette ligne permet de récupérer l'objet scoreTotal, plus précisément le score du joueur
  // cette ligne va mettre à jour l'objet
  scoreTotal['joueurScore']+= score
  scoreTotal['ordinateurScore']-= score

  // Cette ligne permet de faire appel à la fonction afficherResultat avec en paramètre 
  // Les éléments necessaire pour afficher si le joueur à gagné ou perdu
  afficherResultat(score, choixJoueur, choixOrdinateur)
}

// C'est cette fonction qui va permettre de renvoyer une action quand on clique sur les boutons
function playGame() {
  // Utilisation d'un querySelectorAll pour récupérer l'ensemble des boutons avec la classe ".rpsButton"
  const rpsButtons = document.querySelectorAll('.rpsButton')

  // On loop dans la list de bouton en ajoutant à chacun la valeur du bouton quand on cliquera dessus
  rpsButtons.forEach(rpsButton => {
    rpsButton.onclick = () => onClickRPS(rpsButton.value)
  })
 
  const endGameButton = document.getElementById('endGameButton')
  endGameButton.onclick = () => endGame(scoreTotal)
}

// fonction qui reset la partie
function endGame(scoreTotal) {
  scoreTotal['joueurScore'] = 0
  scoreTotal['ordinateurScore'] = 0
  const resultDiv = document.getElementById('result')
  const handsDiv = document.getElementById('hands')
  const playScoreDiv = document.getElementById('joueur-score')

  resultDiv.innerText = ''
  handsDiv.innerText = ''
  playScoreDiv.innerText = ''
}

playGame()