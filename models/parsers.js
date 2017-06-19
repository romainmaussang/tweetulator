//TODO mettre des trucs pour parser les logs dans les bon fichiers JSON (se servir des templates)

var log = require('./log.js');
var jsonfile = require('jsonfile');
var tweet = require('./tweet.js');

module.exports
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
}