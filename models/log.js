module.exports
{
    exports.ajouterLog = ajouterLog;

    function Log(idBot, heure, contenu, type){
        this.idBot = idBot;
        this.heure = heure;
        this.contenu = contenu;
        this.type = type;
    }

    var listeLogs = Array();

    Log.prototype = {
        ajouterLog:function(botName, heure, contenu, type) {
            listeLogs.add(heure + " : " + botName + " action: " + type +" "+ contenu);
        }
    }

    Log.prototype.constructor = Log;
}