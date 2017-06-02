var log = require('log.js');
module.exports
{

    // Constructeur
    function Tweet () {
        this.sentiment
        this.nbhashtag
        this.nbmention
        this.photo
        this.id
        this.longitude
        this.latitude
        this.nblien
        this.isretweet
        this.retweetedid
    }


    // Ajout de méthode
    Tweet.prototype = {
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

    Bot.prototype.constructeur = Bot;
};