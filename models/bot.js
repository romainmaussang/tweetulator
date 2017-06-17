var log = require('./log.js');
var tweet = require('./tweet.js');

module.exports
{
    var listeBots = [];
    exports.listeBots = listeBots;
    //var listeTweets = new Array();


    // Constructeur
    function Bot (nom, probafollow, probaunfollow, probatweet, probaretweet,
                  nbhashtag, probalien, probalike, probamention,
                  probamentionned, visibilite ,probaphoto) {
        this.nom = nom;
        this.probafollow = probafollow;
        this.probaunfollow = probaunfollow;
        this.probatweet = probatweet;
        this.probaretweet =probaretweet;
        this.nbhashtagpossible = nbhashtag;
        this.probalien = probalien;
        this.probalike = probalike;
        this.probamention = probamention;
        this.probamentionned = probamentionned;
        this.visibilite = visibilite;
        this.probaphoto = probaphoto;
        this.mentionnedby = new Array();
        this.followedby = new Array();
        this.isFollowing = new Array();

    }

    exports.BotSuiveur = function(name){
        var bot = new Bot(name, 0.2, 0.05, 0.1, 0.30, 2, 0.4, 0.35, 0.8, 0.2, 0.05, 0.1 );
        listeBots.push(bot);
    };

    exports.BotLeader = function(name){
        var bot = new Bot(name, 0.05, 0.05, 0.6, 0.15, 4, 0.6, 0.15, 0.4, 0.8, 0.8, 0.2 );
        listeBots.push(bot);
    };

    /*function BotVoyageur() {
        new Bot(this, 0.8, 0.6, 0.4, 5, 0.4, 0.4, 0.4, 0.8, 0.15, 0.8 );
        //console.log(this);
    }*/


    // Ajout de méthode
        Bot.prototype = {

            getMentionnedby : function (bot) {
                this.mentionnedby().push(bot);
            },

            getFollowedby : function (bot) {
                this.followedby().push(bot);
            },

            getProbamentionned : function () {
                return this.probamentionned;
            },

            getVisibilite : function () {
              return this.visibilite;
            },

            chooseAction : function () {
              var nb = Math.random()*100;
              if(lireTweets() === false)   {
                  this.publieTweet();
              } else {
                  var tweets = lireTweets();
              }
              if(nb < 1) {

              }
            },
            lireTweets: function () {
                // Récupérer Tweets dans les logs
                var tweets = log.getTweets();
                return tweets;
            },




            publieTweet: function () {
                //on détermine le nombre de hashtags
                var nbhashtag = getRandomInt(0, this.nbhashtagpossible);
                // on détermine le nombre de mentions ainsi que les bots mentionnés
                var nbmentionned = 0;
                var testproba = Math.random();
                while (testproba < this.probamention){
                    nbmentionned++;
                    testproba = Math.random();
                }
                var botsmentionned = new Array();
                while (nbmentionned >0 ) {
                   var numbottested = getRandomInt(0, listeBots.length-1);
                   if ( Math.random() < listeBots[numbottested].getProbamentionned){
                       botsmentionned.push(listeBots[numbottested].name);
                       listeBots[numbottested].getMentionnedby(this);
                       nbmentionned--;
                   }
                }
                //on détermine si le tweet comportera une photo
                var photo = false;
                if (Math.Random < this.probaphoto){
                    photo = true;
                }
                // on détermine le nombre de liens
                var testprobalien = Math.random();
                var nblien = 0;
                while (testprobalien < this.probalien) {
                    nblien++;
                    testprobalien = Math.random();
                }

                // Ajouter un tweet
                listeTweets.push(new Tweet(this.name, nbhashtag, botsmentionned.length, photo, listeTweets.length(), nblien, false, null,  botsmentionned));
                // Ajouter un log
                var d = new Date();
                var hour = d.getHours()+"h"+d.getMinutes();
                log.ajouterLog(this.name, hour, listeTweets[listeTweets.length-1], "a tweeté" )

            },

            retweet: function () {
                // on détermine le tweet à retweet
                var hasfoundtweet = false;
                while (hasfoundtweet === false){
                    var potentialTweet = getRandomInt(0, listeTweets.length-1);
                    if (listeTweets[potentialTweet].getAuteur().contains("LEADER")){
                        if (Math.random() < 0.8){
                            hasfoundtweet = true;
                        }
                    } else {
                        if (Math.random() < 0.05){
                            hasfoundtweet = true;
                        }
                    }

                }
                var tw = potentialTweet;
                var mentions = new Array();
                listeTweets[tw].getMentionne(mentions);
                // Ajouter un tweet
                listeTweets.push(new Tweet (listeTweets[tw].getAuteur(),listeTweets[tw].getNbhashtag(),listeTweets[tw].getNbmention(), listeTweets[tw].getPhoto(), listeTweets.length() ,listeTweets[tw].getNblien(), true, listeTweets[tw].getId(),  mentions ));
                // Ajouter un log
                var d = new Date();
                var hour = d.getHours()+"h"+d.getMinutes();
                log.ajouterLog(this.name, hour, listeTweets[listeTweets.length-1], "a retweeté" )
            },
            // Fonction qui détermine si on like un tweet ou non
            likeTweet: function(tweets) {

                var tweetsLeader = new Array();
                var tweetsSuiveur = new Array();

                // On parcours les tweets pour les classer par type d'auteur
                for(var i = 0 ; i < tweets.length ; i++) {
                    // On classe les tweets par auteur (LEADER ou SUIVEUR)
                    if(tweets[i].getAuteur().contains("LEADER")) {
                        tweetsLeader.push(tweets[i]);
                    } else {
                        tweetsSuiveur.push(tweets[i]);
                    }
                }
                // On détermine le coeff de like
                var coeff = Math.round((Math.random()*100)); // donne un nombre entre 0 et 9
                var tweetToLike = 0;

                if(coeff < 1) {
                    tweetToLike = getRandomInt(0,tweetsSuiveur.length);
                    // On ajoute un like au tweet
                    tweetsSuiveur[tweetToLike].addLike(this.nom);
                } else {
                    tweetToLike = getRandomInt(0,tweetsLeader.length);
                    // On ajoute un like au tweet
                    tweetsLeader[tweetToLike].addLike(this.nom);
                }
                //TO DO ajouter log
            },

            follow : function () {
                var hasFollowed = false;
                while (hasFollowed === false){
                    var botToFollow = getRandomInt(0, listeBots.length-1);
                    if(Math.random() < listeBots.get(botToFollow).getVisibilite()){
                        var alreadyFollowed = containsObject(listeBots[botToFollow],this.isFollowing);
                        if(alreadyFollowed === false){
                            listeBots[botToFollow].getFollowedby(this);
                            this.isFollowing.push(listeBots[botToFollow]);
                            hasFollowed = true;
                            // TO DO ajouter log
                        }
                    }
                }
            },
            
            unfollow :function () {
                var botToUnfollow = getRandomInt(0, this.isFollowing.length-1);
                this.isFollowing.splice(botToUnfollow,1);
            }
        };

    Bot.prototype.constructor = Bot;

    //var bot1 = new BotLeader();
    //var bot2 = new BotSuiveur();
    //var bot3 = new BotVoyageur();
    //console.log(bot1,bot2,bot3);
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function containsObject(obj, list) {
    var i;
    for (i = 0; i < list.length; i++) {
        if (list[i] === obj) {
            return true;
        }
    }

    return false;
}