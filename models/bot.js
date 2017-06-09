//var log = require('log.js');
module.exports
{

    // Constructeur
    function Bot (probavoyager, probatweet, probaretweet, nbhashtag, probalien, probalike, probamention, probaselfmention, visibilite,probaphoto) {
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

    function BotSuiveur() {
        Bot.call(this, 0.2, 0.2, 0.8, 1, 0.4, 0.8, 0.8, 0.2, 0.05, 0.1 );
        console.log(this);
    }
    BotSuiveur.prototype = Object.create(Bot.prototype);
    BotSuiveur.prototype.constructor = BotSuiveur;


    function BotLeader() {
        Bot.call(this, 0.2, 0.8, 0.4, 2, 0.6, 0.4, 0.4, 0.8, 0.8, 0.2 );
        console.log(this);
    }
    BotLeader.prototype = Object.create(Bot.prototype);
    BotLeader.prototype.constructor = BotLeader;


    function BotVoyageur() {
        Bot.call(this, 0.8, 0.6, 0.4, 5, 0.4, 0.4, 0.4, 0.8, 0.15, 0.8 );
        console.log(this);
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

    var bot1 = new BotLeader();
    var bot2 = new BotSuiveur();
    var bot3 = new BotVoyageur();
//bite
    console.log(bot1,bot2,bot3);
}