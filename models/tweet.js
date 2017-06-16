var log = require('log.js');
module.exports
{

    var listeTweets = new array();

    // Constructeur
    function Tweet (auteur,nbhashtag,nbmention,photo,id,nblien,isretweet,retweetedid, mentions) {
        this.auteur = auteur;
    //  this.sentiment
        this.nbhashtagpossible = nbhashtag;
        this.nbmention = nbmention;
        this.photo = photo;
        this.id = id;
    //  this.longitude
    //  this.latitude
        this.nblien = nblien;
        this.isretweet = isretweet;
        this.retweetedid = retweetedid;
        this.likedBy = new array();
        this.mentionne = new array() ;

        for (var i = 0; i< mentions.length; i++){
            this.mentionne.push(mentions.get(i));
        }
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