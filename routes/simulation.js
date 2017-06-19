var express = require('express');
var router = express.Router();

var bot = require('../models/bot.js');
var log = require('../models/log.js');

/* GET simulation page.*/
router.get('/', function(req, res) {
    var leader = req.query.leader,
        nbBots = req.query.select,
        nbTours  = req.query.tours;

    // On initialise les bots
    var bots = start(leader,nbBots);

    // On lance la simulation
    simulate(bots, nbTours);

    // On récupère les logs
    var logs = log.getLogs();
    // On génère la page qui affiche les actions
    res.render('simulation', { title: 'Tweetulator - Simulation' , listeBots: bots, listeLogs: logs});
});

module.exports = router;

function start(leader, nbBots) {

    // Calcul des pourcentages
    var nbLeader = parseInt((nbBots * leader)/100);
    var nbSuiveur = parseInt((nbBots * (100-leader))/100);
    var name2 = '';
    var name = '';
    console.log('nbLeader : ' + nbLeader);
    console.log('nbSuiveur: ' + nbSuiveur);

    // Initialisation bots
    var compt = 1;
    var compteur = 1;
    for (var i = 0; i < nbLeader; i++) {
        name = "BOT_Leader_"+ compt;
        //console.log(name);
        compt = compt+1;
        bot.BotLeader(name);
    }
    for (var i2 = 0; i2 < nbSuiveur; i2++) {
        name2 = "BOT_Suiveur_" + compteur;
        //console.log(name2);
        compteur = compteur + 1;
        bot.BotSuiveur(name2);
    }
    //console.log(bot.listeBots);
    return bot.listeBots;
}

function simulate(listeBots, nbTours) {
    for(var w = 0 ; w < nbTours ; w++) {
            for (var i = 0; i < listeBots.length; i++) {
                listeBots[i].chooseAction();
            }
    }
}