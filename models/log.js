module.exports
{
    function Log(idBot, heure, contenu, type){
        this.idBot = idBot;
        this.heure = heure;
        this.contenu = contenu;
        this.type = type;
    }

    var listeLogs = Array();
    exports.listeLogs = listeLogs;


    exports.ajouterLog = function(botName, heure, contenu, type) {
        listeLogs.push(heure + " : " + botName + " action: " + type +" "+ contenu);
    }

    Log.prototype = {
        getLogs:function(){
            return listeLogs;
        }
    }

    Log.prototype.constructor = Log;
}