/**
 * Copyright (c) 2015 Jendela
 */

var Propinsi = Parse.Object.extend("Propinsi");
var Kota = Parse.Object.extend("Kota");
var Ulasan = Parse.Object.extend("Ulasan");
var Statistik = Parse.Object.extend("Statistik");
var Layanan = Parse.Object.extend("Layanan");

/**
 * Hook after saving Ulasan.
 *
 * Updating values in Kota and Propinsi based on the saved Ulasan. The following fields are updated:
 * * total_biaya
 * * total_rating
 */
Parse.Cloud.afterSave(Ulasan, function (request) {
    var kotaQuery = new Parse.Query(Kota);
    kotaQuery.get(request.object.get("kota").id, {
        success: function (kota) {
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

/**
 * A schedullable job to produce a Statistik
 *
 * Calling this job will removes all existing statistik data
 *
 * Currently it procudes the following information:
 * * Top 10 Total Biaya per Propinsi
 * * Top 10 Total Biaya per Kota
 * * Top 10 Rata Biaya per Propinsi
 * * Top 10 Rata Biaya per Kota
 */
Parse.Cloud.job("Statistik", function (request, status) {

    var statQuery = new Parse.Query(Statistik);
    statQuery.find().then(function(list){
        Parse.Object.destroyAll(list);
    }).then(function() {
        statistikTotalBiayaKota(request, status).then(function () {
            statistikTotalBiayaPropinsi(request, status).then(function () {
                statistikRataBiayaKota(request, status).then(function () {
                    statistikRataBiayaPropinsi(request, status).then(function () {
                        status.success("Statistik Generated");
                    });
                    ;
                });
            });
        });
    });
});

// Utility functions

function statistikTotalBiayaKota(request, status) {
    return statistikTotal(request, status, Kota, "total_biaya", "Top 10 Total Biaya per Kota");
}

function statistikTotalBiayaPropinsi(request, status) {
    return statistikTotal(request, status, Propinsi, "total_biaya", "Top 10 Total Biaya per Propinsi");
}

function statistikRataBiayaKota(request, status) {
    return statistikTotal(request, status, Kota, "total_biaya", "Top 10 Rata Biaya per Kota");
}

function statistikRataBiayaPropinsi(request, status) {
    return statistikTotal(request, status, Propinsi, "total_biaya", "Top 10 Rata Biaya per Propinsi");
}

function statistikTotal(request, status, parseClass, field, title) {
    // Kota
    var kotaQuery = new Parse.Query(parseClass);
    return kotaQuery.descending(field).limit(10).find().then(function (kotas) {
        var jsonData = kotas.map(function (kota) {
            return {
                "name": kota.get("name"),
                "nilai": kota.get(field)
            };
        });
        var statistik = new Statistik();
        statistik.set("judul", title);
        statistik.set("data", jsonData);
        statistik.save();
    }, function (error) {
        console.error("Got an error " + error.code + " : " + error.message);
        status.error("Statistik failed to be generated");
    });
}

function statistikRata(request, status, parseClass, field, title) {
    // Kota
    var kotaQuery = new Parse.Query(parseClass);
    return kotaQuery.find().then(function (kotas) {
        var jsonData = kotas.map(function (kota) {
            if (kota.get("total_ulasan") != undefined && !kota.get("total_ulasan") == 0) {
                var avg = Math.round(kota.get(field) * 100.0 / kota.get("total_ulasan")) / 100;
                kota.set("nilai", avg);
            }
            else
                kota.set("nilai", 0);
            return kota;
        }).sort(function (a, b) {
            if (a.get("nilai") > b.get("nilai")) {
                return 1;
            }
            if (a.get("nilai") < b.get("nilai")) {
                return -1;
            }
            // a must be equal to b
            return 0;
        }).slice(0, 10).map(function (kota) {
            return {
                "name": kota.get("name"),
                "nilai": kota.get(field)
            };
        });
        var statistik = new Statistik();
        statistik.set("judul", title);
        statistik.set("data", jsonData);
        statistik.save();
    }, function (error) {
        console.error("Got an error " + error.code + " : " + error.message);
        status.error("Statistik failed to be generated");
    });
}