module.exports
{
    var listeLogs = array();

    Log.prototype = {
        ajouterLog:function(idBot, heure, contenu, type) {
            listeLogs.add(heure + " : " + "Bot n°" + idBot + " action: " + type + contenu);
        }
    }
};