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
                        if(this.isFollowing.isEmpty() === false){
                        this.unFollow();
                        stopLoop = true;
                        }
                    }else if(chooseStat>(this.probatweet+this.probaretweet+this.probafollow+this.probaunfollow)){
                        if(tweet.listeTweets.isEmpty() === false){
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
                console.log("1");
                while (testproba < this.probamention){
                    nbmentionned++;
                    testproba = Math.random();
                }
                console.log("2");
                var botsmentionned = [];
                console.log(nbmentionned);
                while (nbmentionned >0 ) {
                    console.log("while : " + nbmentionned);
                   var numbottested = getRandomInt(0, listeBots.length-1);
                   if ( Math.random() < listeBots[numbottested].getProbamentionned){
                       botsmentionned.push(listeBots[numbottested].name);
                       listeBots[numbottested].getMentionnedby(this);
                   }
                    nbmentionned--;
                }
                console.log("3");
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
                tweet.listeTweets.push(tweet.Tweet(this.name, nbhashtag, botsmentionned.length, photo, tweet.listeTweets.length, nblien, false, null,  botsmentionned, (d.getHours()+"h"+d.getMinutes())));
                // Ajouter un log
                var hour = d.getHours()+"h"+d.getMinutes();
                log.ajouterLog(this.name, hour, tweet.listeTweets[tweet.listeTweets.length-1], "a tweeté" )

            },

            retweet: function () {
                console.log("Retweet");
                // on détermine le tweet à retweet
                var hasfoundtweet = false;
                while (hasfoundtweet === false){
                    var potentialTweet = getRandomInt(0, tweet.listeTweets.length-1);
                    console.log(potentialTweet);
                    console.log(tweet.listeTweets);
                    if (tweet.listeTweets[potentialTweet].getAuteur().contains("LEADER")){
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
                tweet.listeTweets.push(tweet.Tweet (tweet.listeTweets[tw].getAuteur(),tweet.listeTweets[tw].getNbhashtag(),tweet.listeTweets[tw].getNbmention(), tweet.listeTweets[tw].getPhoto(), tweet.listeTweets.length() ,tweet.listeTweets[tw].getNblien(), true, tweet.listeTweets[tw].getId(),  mentions, (d.getHours()+"h"+d.getMinutes())  ));
                // Ajouter un log
                var hour = d.getHours()+"h"+d.getMinutes();
                log.ajouterLog(this.name, hour, tweet.listeTweets[tweet.listeTweets.length-1], "a retweeté" )
            },
            // Fonction qui détermine si on like un tweet ou non
            likeTweet: function(tweets) {
                console.log("LikeTweet");
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

                // Si < 1 >>> on like un Suiveur sinon on like un Leader
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
                console.log("Follow");
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

            unFollow :function () {
                console.log("Unfollow");
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