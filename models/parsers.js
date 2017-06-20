//TODO mettre des trucs pour parser les logs dans les bon fichiers JSON (se servir des templates)

var log = require('./log.js');
var jsonfile = require('jsonfile');
var tweet = require('./tweet.js');

{
    exports.updateProportionTypes = function (listeTweets) {

        var file = './public/data/proportionType.json';

        // On parcours les tweets pour extraire les infos
        var normaux = 0, lien = 0, photo = 0, retweet = 0;

        for(var i = 0 ; i < listeTweets.length ; i++) {
            if(listeTweets[i].getPhoto() == true) {
                photo ++;
            }
            if(listeTweets[i].getNblien() > 0) {
                lien ++;
            }
            if(listeTweets[i].isretweet == true) {
                retweet ++;
            }
            if(listeTweets[i].getPhoto() == false && listeTweets[i].getNblien() == 0 && listeTweets[i].isretweet == false) {
                normaux++;
            }
        }

        console.log("lol" + normaux+retweet+lien+photo);
        var obj = { normaux: normaux, liens: lien, photo: photo , retweet : retweet}
        jsonfile.writeFile(file, obj, function (err) {
            console.error(err)
        });

        jsonfile.readFile(file, function (err, obj) {
            console.dir(obj)
        })
    },

    exports.updateProportionBots = function (nbBotSuiveur, nbBotLeader) {
        var file = './public/data/proportionBots.json';

        var obj = { leaders: nbBotLeader, suiveurs: nbBotSuiveur}
        jsonfile.writeFile(file, obj, function (err) {
            console.error(err)
        });

        jsonfile.readFile(file, function (err, obj) {
            console.dir(obj)
        });
    }

    exports.updateStatsGenerales = function (listeTweets,nbBotLeader,nbBotSuiveur) {
        var file = './public/data/statsGenerales.json';

        var tweets = listeTweets.length;
        var likes = 0;
        var rt = 0;
        var nbbot = nbBotLeader+nbBotSuiveur;

        for(var i = 0 ; i < listeTweets.length ; i++) {
            likes += listeTweets[i].likedBy.length;
            if(listeTweets[i].isretweet == true) {
                rt ++;
            }
        }

        var obj = {tweets:tweets, likes:likes, retweets:rt, bots:nbbot}
        jsonfile.writeFile(file, obj, function (err) {
            console.error(err)
        });

        jsonfile.readFile(file, function (err, obj) {
            console.dir(obj)
        });
    }

    exports.updateStatsBots = function () {
        var file = './public/data/statsBots.json';

        var lfreqt;
        var lmoyl;
        var lmoyrt;
        var lmoyhash;
        var sfreqt;
        var smoyl;
        var smoyrt;
        var smoyhash;

        var obj = {leader:{freqtweet:lfreqt, moylike:lmoyl, moyrt:lmoyrt, moyhash:lmoyhash},suiveur:{freqtweet:sfreqt, moylike:smoyl, moyrt:smoyrt, moyhash:smoyhash}}
        jsonfile.writeFile(file, obj, function (err) {
            console.error(err)
        });

        jsonfile.readFile(file, function (err, obj) {
            console.dir(obj)
        });
    }
}