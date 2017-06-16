var log = require('log.js');
module.exports
{

    var listeTweets = new array();

    // Constructeur
    function Tweet () {
        this.auteur
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
        this.likedBy = new array()
    }

    Tweet.prototype.constructeur = Tweet;

    Tweet.prototype = {
        getTweets: function () {
            return listeTweets;
        },
        getAuteur: function() {
            return this.auteur;
        },
        addLike: function (botName) {
            this.likedBy.push(botName);
        }
    }
};