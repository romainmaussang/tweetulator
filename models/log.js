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
        ajouterLog:function(botName, heure, contenu, type) {
            listeLogs.push(heure + " : " + botName + " action: " + type +" "+ contenu);
        },
        getLogs:function(){
            return listeLogs;
        }
    }

    Log.prototype.constructor = Log;
}