/**
 * Copyright (c) 2015 Jendela
 */

var Province = Parse.Object.extend("Province");
var City = Parse.Object.extend("City");
var Review = Parse.Object.extend("Review");
var Statistic = Parse.Object.extend("Statistic");
var Service = Parse.Object.extend("Service");
var CityServiceDetail = Parse.Object.extend("CityServiceDetail");

/**
 * Hook after saving Review.
 *
 * Updating values in Kota and Province based on the saved Review. The following fields are updated:
 * * total_biaya
 * * total_rating
 */
Parse.Cloud.afterSave(Review, function (request) {

    var review = request.object;
    var city = review.get("city");
    var service = review.get("service");

    var cityQuery = new Parse.Query(City);
    cityQuery.get(city.id, {
        success: function (cityDb) {

            // update total for all time
            cityDb.increment("total_review");
            cityDb.increment("total_fee", request.object.get("fee"));
            cityDb.increment("total_rating", request.object.get("rating"));
            cityDb.save();
            var propinsiQuery = new Parse.Query(Province);
            propinsiQuery.get(cityDb.get("province").id, {
                success: function (prop) {
                    prop.increment("total_review");
                    prop.increment("total_fee", request.object.get("fee"));
                    prop.increment("total_rating", request.object.get("rating"));
                    prop.save();
                },
                error: function (error) {
                    console.error("Got an error " + error.code + " : " + error.message);
                }
            });

            var date = new Date();

            // update total for each city and service
            var cityServiceDetail = new Parse.Query("CityServiceDetail");
            cityServiceDetail.equalTo("city", cityDb);
            cityServiceDetail.equalTo("service", {
                "__type": "Pointer",
                "className": "Service",
                "objectId": service.id
            });
            cityServiceDetail.equalTo("month", date.getMonth());
            cityServiceDetail.equalTo("year", date.getFullYear());
            cityServiceDetail.find().then(function (props) {

                var prop = undefined;
                if (props.length == 0) {
                    prop = new CityServiceDetail();
                    prop.set("month", date.getMonth());
                    prop.set("year", date.getFullYear());
                    prop.set("city", cityDb);
                    prop.set("service", {
                        "__type": "Pointer",
                        "className": "Service",
                        "objectId": service.id
                    });
                }
                else
                    prop = props[0];

                prop.increment("total_review");
                prop.increment("total_fee", request.object.get("fee")?request.object.get("fee"):0);
                prop.increment("total_rating", request.object.get("rating")?request.object.get("rating"):0);
                prop.increment("total_duration", request.object.get("duration")?request.object.get("duration"):0);
                prop.save();
            });
        },
        error: function (error) {
            console.error("Got an error " + error.code + " : " + error.message);
        }
    });
});

/**
 * A schedullable job to produce a Statistic
 *
 * Calling this job will removes all existing statistic data
 *
 */
Parse.Cloud.job("Statistic", function (request, status) {

    var statQuery = new Parse.Query(Statistic);
    statQuery.find().then(function (list) {
        Parse.Object.destroyAll(list);
    }).then(function () {
        statisticTotalFeeCity(request, status).then(function () {
            statisticTotalFeeProvince(request, status).then(function () {
                statisticAvgFeeCity(request, status).then(function () {
                    statisticAvgFeeProvince(request, status).then(function () {
                        status.success("Statistic Generated");
                    });
                    ;
                });
            });
        });
    });
});

// Utility functions
function statisticTotalFeeCity(request, status) {
    return statisticTotal(status, City, "total_fee", "Top 10 Total Biaya per Kota", "Total Biaya", "Kota");
}

function statisticTotalFeeProvince(request, status) {
    return statisticTotal(status, Province, "total_fee", "Top 10 Total Biaya per Province", "Total Biaya", "Propinsi");
}

function statisticAvgFeeCity(request, status) {
    return statisticAverage(status, City, "total_fee", "Top 10 Rata Biaya per Kota", "Rata-rata Biaya", "Kota");
}

function statisticAvgFeeProvince(request, status) {
    return statisticAverage(status, Province, "total_fee", "Top 10 Rata Biaya per Province", "Rata-rata Biaya", "Propinsi");
}

function statisticTotal(status, parseClass, field, title, category, level) {
    // Kota
    var cityQuery = new Parse.Query(parseClass);
    return cityQuery.descending(field).limit(10).find().then(function (cities) {
        var jsonData = cities.map(function (city) {
            return {
                "name": city.get("name"),
                "value": city.get(field)
            };
        });
        var statistic = new Statistic();
        statistic.set("title", title);
        statistic.set("data", jsonData);
        statistic.set("level", level);
        statistic.set("category", category);
        statistic.save();
    }, function (error) {
        console.error("Got an error " + error.code + " : " + error.message);
        status.error("Statistic failed to be generated");
    });
}

function statisticAverage(status, parseClass, field, title, category, level) {
    // Kota
    var cityQuery = new Parse.Query(parseClass);
    return cityQuery.limit(1000).find().then(function (citys) {
        var jsonData = citys.map(function (city) {
            if (city.get("total_review") != undefined && !city.get("total_review") == 0) {
                var avg = Math.round(city.get(field) * 100.0 / city.get("total_review")) / 100;
                city.set("value", avg);
            }
            else
                city.set("value", 0);
            return city;
        }).sort(function (a, b) {
            if (a.get("value") > b.get("value")) {
                return -1;
            }
            if (a.get("value") < b.get("value")) {
                return 1;
            }
            // a must be equal to b
            return 0;
        }).slice(0, 10).map(function (city) {
            return {
                "name": city.get("name"),
                "value": city.get(field)
            };
        });
        var statistic = new Statistic();
        statistic.set("title", title);
        statistic.set("data", jsonData);
        statistic.set("level", level);
        statistic.set("category", category);
        statistic.save();
    }, function (error) {
        console.error("Got an error " + error.code + " : " + error.message);
        status.error("Statistic failed to be generated");
    });
}
