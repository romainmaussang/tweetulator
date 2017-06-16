module.exports
{

    function Log(idBot, heure, contenu, type){
        this.idBot = idBot;
        this.heure = heure;
        this.contenu = contenu;
        this.type = type;
    }

    var listeLogs = Array();

    Log.prototype = {
        ajouterLog:function(idBot, heure, contenu, type) {
            listeLogs.add(heure + " : " + "Bot n°" + idBot + " action: " + type + contenu);
        }
    }

    Log.prototype.constructor = Log;
}