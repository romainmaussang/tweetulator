//var log = require('log.js');
module.exports
{
    var listeBots = [];
    exports.listeBots = listeBots;

    // Constructeur
    function Bot (nom, probavoyager, probatweet, probaretweet, nbhashtag, probalien, probalike, probamention, probaselfmention, visibilite,probaphoto) {
        this.nom = nom;
        this.probavoyager = probavoyager;
        this.probatweet = probatweet;
        this.probaretweet =probaretweet;
        this.nbhashtag = nbhashtag;
        this.probalien = probalien;
        this.probalike = probalike;
        this.probamention = probamention;
        this.probaselfmention = probaselfmention;
        this.visibilite = visibilite;
        this.probaphoto = probaphoto;
    }

    exports.BotSuiveur = function(name){
        Bot.call(this, name, 0.2, 0.2, 0.8, 1, 0.4, 0.8, 0.8, 0.2, 0.05, 0.1 );
        listeBots.push(this);
        //console.log(this);
    };


    exports.BotLeader = function(name){
        Bot.call(this, name, 0.2, 0.8, 0.4, 2, 0.6, 0.4, 0.4, 0.8, 0.8, 0.2 );
        listeBots.push(this);
        //console.log(this);
    };


    function BotVoyageur() {
        Bot.call(this, 0.8, 0.6, 0.4, 5, 0.4, 0.4, 0.4, 0.8, 0.15, 0.8 );
        //console.log(this);
    }
    BotVoyageur.prototype = Object.create(Bot.prototype);
    BotVoyageur.prototype.constructor = BotVoyageur;


    // Ajout de méthode
        Bot.prototype = {
            lireTweets: function () {
                // Récupérer Tweets dans les logs
            },

            publieTweet: function () {
                // Ajouter un tweet

                // Ajouter un log
            },

            retweet: function () {
                // Ajouter un tweet

                // Ajouter un log
            }
        };

    Bot.prototype.constructor = Bot;

    //var bot1 = new BotLeader();
    //var bot2 = new BotSuiveur();
    //var bot3 = new BotVoyageur();
    //console.log(bot1,bot2,bot3);
}