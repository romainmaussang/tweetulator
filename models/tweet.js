var log = require('./log.js');
var bot = require ('./bot.js');
module.exports
{

    var listeTweets = new Array();
    exports.listeTweets = listeTweets;


    // Constructeur
    function Tweet (auteur,nbhashtag,nbmention,photo,id,nblien,isretweet,retweetedid, mentions, tweetDate) {
        this.auteur = auteur;
        this.nbhashtag= nbhashtag;
        this.nbmention = nbmention;
        this.photo = photo;
        this.id = id;
        this.nblien = nblien;
        this.isretweet = isretweet;
        this.retweetedid = retweetedid;
        this.tweetDate = tweetDate;
        this.likedBy = [];
        this.mentionne = [] ;

        for (var i = 0; i< mentions.length; i++){
            this.mentionne.push(mentions[i]);
        }
    }


    Tweet.prototype.constructeur = Tweet;
    exports.Tweet = Tweet;

    exports.getTweets = function() {
        return listeTweets;
    }

    Tweet.prototype = {
        getAuteur: function() {
            return this.auteur;
        },
        addLike: function (botName) {
            this.likedBy.push(botName);
        },
        getNbhashtag: function () {
            return this.nbhashtag;
        },
        getNbmention: function () {
            return this.nbmention;
        },
        getPhoto: function () {
            return this.photo;
        },
        getId: function () {
            return this.id;
        },
        getNblien : function () {
            return this.nblien;
        },
        getMentionne : function (arrayOfMentions) {
            for (var i = 0; i<this.mentionne.length;i++){
                arrayOfMentions.push(this.mentionne[i]);
            }
        }
    }
};