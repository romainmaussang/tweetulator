var log = require('./log.js');
var tweet = require('./tweet.js');

module.exports
{
    var listeBots = [];
    exports.listeBots = listeBots;

    // Constructeur
    function Bot (nom, probafollow, probaunfollow, probatweet, probaretweet,
                  nbhashtag, probalien, probalike, probamention,
                  probamentionned, visibilite ,probaphoto) {
        this.nom = nom;
        this.probafollow = probafollow;
        this.probaunfollow = probaunfollow;
        this.probatweet = probatweet;
        this.probaretweet = probaretweet;
        this.nbhashtagpossible = nbhashtag;
        this.probalien = probalien;
        this.probalike = probalike;
        this.probamention = probamention;
        this.probamentionned = probamentionned;
        this.visibilite = visibilite;
        this.probaphoto = probaphoto;
        this.mentionnedby = [];
        this.followedby = [];
        this.isFollowing = [];

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

            getNom : function () {
              return this.nom;
            },

            getmentionnedby : function (bot) {
                this.mentionnedby.push(bot);
            },

            getfollowedby : function (bot) {
                this.followedby.push(bot);
            },

            getprobamentionned : function () {
                return this.probamentionned;
            },

            getvisibilite : function () {
              return this.visibilite;
            },
            // fonction à appeler à chaque boucle de notre programme
            chooseAction : function () {
                console.log("Choose Action");
                var chooseStat = Math.random();
                console.log(chooseStat);
                var stopLoop = false;
                while (stopLoop === false){
                    if (chooseStat < this.probatweet){
                        this.publieTweet();
                        stopLoop = true;
                    } else if(chooseStat > this.probatweet && chooseStat <(this.probatweet+this.probaretweet)){
                        if(tweet.listeTweets.length > 0){
                        this.retweet();
                        stopLoop = true;
                        }
                    }else if(chooseStat>(this.probatweet+this.probaretweet) && chooseStat <(this.probatweet+this.probaretweet+this.probafollow)) {
                        this.follow();
                    }else if(chooseStat>(this.probatweet+this.probaretweet+this.probafollow) && chooseStat < (this.probatweet+this.probaretweet+this.probafollow+this.probaunfollow)){
                        if(this.isFollowing.length > 0){
                        this.unFollow();
                        stopLoop = true;
                        }
                    }else if(chooseStat>(this.probatweet+this.probaretweet+this.probafollow+this.probaunfollow)){
                        if(tweet.listeTweets.length > 0){
                            this.likeTweet(tweet.listeTweets);
                            stopLoop = true;
                        }
                    }
                    chooseStat = Math.random();
                }
            },

            //TODO cette fonction. Je ne sais pas son utilité mais il y a une bonne raison pour qu'elle soit là
            lireTweets: function () {
                // Récupérer Tweets dans les logs
                var tweets = log.getTweets();
                return tweets;
            },
            //TODO
            publieTweet: function () {
                console.log("PublieTweet");
                //on détermine le nombre de hashtags
                var nbhashtag = getRandomInt(0, this.nbhashtagpossible);
                // on détermine le nombre de mentions ainsi que les bots mentionnés
                var nbmentionned = 0;
                var testproba = Math.random();
                while (testproba < this.probamention){
                    nbmentionned++;
                    testproba = Math.random();
                }
                var botsmentionned = [];
                while (nbmentionned >0 ) {
                   var numbottested = getRandomInt(0, listeBots.length-1);
                  if ( Math.random() < listeBots[numbottested].getprobamentionned()){
                       botsmentionned.push(listeBots[numbottested].getNom());
                       listeBots[numbottested].getmentionnedby(this);
                       nbmentionned--;
                   }

                }
                //on détermine si le tweet comportera une photo
                var photo = false;
                if (Math.random() < this.probaphoto){
                    photo = true;
                }
                // on détermine le nombre de liens
                var testprobalien = Math.random();
                var nblien = 0;
                while (testprobalien < this.probalien) {
                    nblien++;
                    testprobalien = Math.random();
                }
                console.log("Ajout du log");
                // Ajouter un tweet
                var d = new Date();
                // c'est ici que ça merde Romain
                // On créé le tweet et on l'a à la liste des tweets
                var tweetToAdd = new tweet.Tweet(this.nom,nbhashtag,botsmentionned.length, photo, tweet.listeTweets.length, nblien, false, -1, botsmentionned, (d.getHours()+"h"+d.getMinutes()));
                console.log(tweetToAdd);

                if("undefined" != typeof tweetToAdd ) {
                    console.log("is defined : " + tweetToAdd);
                    tweet.listeTweets.push(tweetToAdd);
                }

                // Ajouter un log
                var hour = d.getHours()+"h"+d.getMinutes();
                log.ajouterLog(this.nom, hour, "le tweet n°" + tweet.listeTweets[tweet.listeTweets.length-1].getId(), "a tweeté" )

            },

            retweet: function () {
                console.log("Retweet");
                // on détermine le tweet à retweet
                var hasfoundtweet = false;
                while (hasfoundtweet === false){
                    var potentialTweet = getRandomInt(0, (tweet.getTweets().length)-2);

                    if (tweet.listeTweets[potentialTweet].getAuteur().search("Leader")){
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
                var mentions = [];
                tweet.listeTweets[tw].getMentionne(mentions);
                // Ajouter un tweet
                var d = new Date();

                // On créé le tweet
                var tweetToAdd = new tweet.Tweet(tweet.listeTweets[tw].getAuteur(),
                                                    tweet.listeTweets[tw].getNbhashtag(),
                                                    tweet.listeTweets[tw].getNbmention(),
                                                    tweet.listeTweets[tw].getPhoto(),
                                                    tweet.listeTweets.length,
                                                    tweet.listeTweets[tw].getNblien(),
                                                    true,
                                                    tweet.listeTweets[tw].getId(),
                                                    mentions,
                                                    (d.getHours()+"h"+d.getMinutes()));

                // On vérifie que le tweet a été créé
                if("undefined" != typeof tweetToAdd ) {
                    console.log("is defined : " + tweetToAdd);
                    tweet.listeTweets.push(tweetToAdd);
                }
                // Ajouter un log
                var hour = d.getHours()+"h"+d.getMinutes();
                log.ajouterLog(this.nom, hour, "le tweet n°" + tweet.listeTweets[tweet.listeTweets.length-1].getId(), "a retweeté" )
            },

            // Fonction qui détermine si on like un tweet ou non
            likeTweet: function() {

                var tweetToLike = getRandomInt(0,(tweet.listeTweets.length-1));
                var liked = false;
                while (liked === false){
                    if(tweet.listeTweets[tweetToLike].getAuteur().search("Leader")){
                        if(Math.random() < 0.8){
                            tweet.listeTweets[tweetToLike].addLike(this.nom);
                            liked = true;
                        }
                    } else {
                        if(Math.random()<0.2){
                            tweet.listeTweets[tweetToLike].addLike(this.nom);
                            liked = true;
                        }
                    }
                    var d = new Date();
                    var hour = d.getHours()+"h"+d.getMinutes();
                    log.ajouterLog(this.nom, hour, "le tweet n°" + tweet.listeTweets[tweet.listeTweets.length-1].getId(), "a like" );
                }

            },


            follow : function () {
                console.log("Follow");
                var hasFollowed = false;
                while (hasFollowed === false){
                    var botToFollow = getRandomInt(0, listeBots.length-1);
                    if(Math.random() < listeBots[botToFollow].getvisibilite()){
                        var alreadyFollowed = containsObject(listeBots[botToFollow],this.isFollowing);
                        if(alreadyFollowed === false){
                            listeBots[botToFollow].getfollowedby(this);
                            this.isFollowing.push(listeBots[botToFollow]);
                            hasFollowed = true;
                            // TO DO ajouter log
                            var d = new Date();
                            var hour = d.getHours()+"h"+d.getMinutes();
                            log.ajouterLog(this.nom, hour, this.isFollowing[this.isFollowing.length-1].getNom(), "a follow" )
                        }
                    }
                }
            },

            unFollow :function () {
                console.log("Unfollow");
                var botToUnfollow = getRandomInt(0, this.isFollowing.length-1);
                var botunfollowed = this.isFollowing[botToUnfollow];
                this.isFollowing.splice(botToUnfollow,1);
                var d = new Date();
                var hour = d.getHours()+"h"+d.getMinutes();
                log.ajouterLog(this.nom, hour, botunfollowed.getNom(), "a unfollow" )
            }
        };

    Bot.prototype.constructor = Bot;
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