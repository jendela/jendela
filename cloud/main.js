/*
 Indonesian variable names is dedicated to people who gets annoyed with this kind of naming. Get over it!
 */

var Propinsi = Parse.Object.extend("Propinsi");
var Kota = Parse.Object.extend("Kota");
var Ulasan = Parse.Object.extend("Ulasan");
var Statistik = Parse.Object.extend("Statistik");
var Layanan = Parse.Object.extend("Layanan");

Parse.Cloud.afterSave(Ulasan, function (request) {
    var kotaQuery = new Parse.Query(Kota);
    kotaQuery.get(request.object.get("kota").id, {
        success: function (kota) {
            console.log(request.object.get("biaya"));
            kota.increment("total_ulasan");
            kota.increment("total_biaya", request.object.get("biaya"));
            kota.increment("total_rating", request.object.get("rating"));
            kota.save();

            var propinsiQuery = new Parse.Query(Propinsi);
            propinsiQuery.get(kota.get("propinsi").id, {
                success: function (prop) {
                    prop.increment("total_ulasan");
                    prop.increment("total_biaya", request.object.get("biaya"));
                    prop.increment("total_rating", request.object.get("rating"));
                    prop.save();
                },
                error: function (error) {
                    console.error("Got an error " + error.code + " : " + error.message);
                }
            });
        },
        error: function (error) {
            console.error("Got an error " + error.code + " : " + error.message);
        }
    });
});

Parse.Cloud.job("HistoriBulanan", function (request, status) {

});

Parse.Cloud.job("HistoriTahunan", function (request, status) {

});