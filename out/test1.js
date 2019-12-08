var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const supertest = require('supertest');
const expect = require('chai').expect;
const tv4 = require('tv4');
const fs = require('fs');
const test_data = JSON.parse(fs.readFileSync('./data/flight_create.json', 'utf8'));
const baseUrl = supertest("api.adzerk.net");
const apiEndPoint = "/v1/flight";
var response;
var body;
var schema = {
    "$schema": "http://json-schema.org/draft-04/schema#",
    "type": "object",
    "properties": {
        "Id": {
            "type": "integer"
        },
        "StartDateISO": {
            "type": "string"
        },
        "EndDateISO": {
            "type": "string"
        },
        "NoEndDate": {
            "type": "boolean"
        },
        "Price": {
            "type": "integer"
        },
        "Impressions": {
            "type": "integer"
        },
        "IsNoDuplicates": {
            "type": "boolean"
        },
        "IsCompanion": {
            "type": "boolean"
        },
        "Keywords": {
            "type": "string"
        },
        "Name": {
            "type": "string"
        },
        "IsFreqCap": {
            "type": "boolean"
        },
        "CampaignId": {
            "type": "integer"
        },
        "PriorityId": {
            "type": "integer"
        },
        "DeliveryStatus": {
            "type": "integer"
        },
        "IsDeleted": {
            "type": "boolean"
        },
        "IsActive": {
            "type": "boolean"
        },
        "GeoTargeting": {
            "type": "array",
            "items": [
                {
                    "type": "object",
                    "properties": {
                        "CountryCode": {
                            "type": "string"
                        },
                        "Region": {
                            "type": "string"
                        },
                        "MetroCode": {
                            "type": "integer"
                        },
                        "IsExclude": {
                            "type": "boolean"
                        }
                    },
                    "required": [
                        "CountryCode",
                        "Region",
                        "MetroCode",
                        "IsExclude"
                    ]
                }
            ]
        },
        "SiteZoneTargeting": {
            "type": "array",
            "items": [
                {
                    "type": "object",
                    "properties": {
                        "SiteId": {
                            "type": "integer"
                        },
                        "ZoneId": {
                            "type": "integer"
                        },
                        "IsExclude": {
                            "type": "boolean"
                        }
                    },
                    "required": [
                        "SiteId",
                        "ZoneId",
                        "IsExclude"
                    ]
                }
            ]
        },
        "CustomTargeting": {
            "type": "string"
        },
        "GoalType": {
            "type": "integer"
        },
        "RateType": {
            "type": "integer"
        },
        "IsECPMOptimized": {
            "type": "boolean"
        },
        "ECPMOptimizePeriod": {
            "type": "integer"
        },
        "ECPMMultiplier": {
            "type": "number"
        },
        "FloorECPM": {
            "type": "number"
        },
        "CeilingECPM": {
            "type": "number"
        },
        "DefaultECPM": {
            "type": "number"
        },
        "ECPMBurnInImpressions": {
            "type": "integer"
        },
        "EffectiveCPMOverride": {
            "type": "null"
        },
        "DatePartingStartTimeISO": {
            "type": "null"
        },
        "DatePartingEndTimeISO": {
            "type": "null"
        },
        "IsSunday": {
            "type": "boolean"
        },
        "IsMonday": {
            "type": "boolean"
        },
        "IsTuesday": {
            "type": "boolean"
        },
        "IsWednesday": {
            "type": "boolean"
        },
        "IsThursday": {
            "type": "boolean"
        },
        "IsFriday": {
            "type": "boolean"
        },
        "IsSaturday": {
            "type": "boolean"
        },
        "FreqCap": {
            "type": "integer"
        },
        "FreqCapDuration": {
            "type": "integer"
        },
        "FreqCapType": {
            "type": "integer"
        },
        "CapType": {
            "type": "integer"
        },
        "DailyCapAmount": {
            "type": "integer"
        },
        "LifetimeCapAmount": {
            "type": "integer"
        },
        "CustomFieldsJson": {
            "type": "null"
        },
        "BehavioralTargeting": {
            "type": "object",
            "properties": {
                "onClick": {
                    "type": "object",
                    "properties": {
                        "stopShowingAdsFromFlight": {
                            "type": "boolean"
                        },
                        "stopShowingAdsFromAdvertiser": {
                            "type": "boolean"
                        },
                        "storeCategoriesFromFlightAsInterest": {
                            "type": "boolean"
                        }
                    },
                    "required": [
                        "stopShowingAdsFromFlight",
                        "stopShowingAdsFromAdvertiser",
                        "storeCategoriesFromFlightAsInterest"
                    ]
                },
                "onConvert": {
                    "type": "object",
                    "properties": {
                        "stopShowingAdsFromFlight": {
                            "type": "boolean"
                        },
                        "stopShowingAdsFromAdvertiser": {
                            "type": "boolean"
                        },
                        "storeCategoriesFromFlightAsInterest": {
                            "type": "boolean"
                        }
                    },
                    "required": [
                        "stopShowingAdsFromFlight",
                        "stopShowingAdsFromAdvertiser",
                        "storeCategoriesFromFlightAsInterest"
                    ]
                }
            },
            "required": [
                "onClick",
                "onConvert"
            ]
        },
        "IsArchived": {
            "type": "null"
        },
        "IsTrackingConversions": {
            "type": "boolean"
        },
        "RequireStrictLocation": {
            "type": "boolean"
        },
        "CanPassback": {
            "type": "boolean"
        },
        "PassbackSortOrder": {
            "type": "integer"
        }
    },
    "required": [
        "Id",
        "StartDateISO",
        "EndDateISO",
        "NoEndDate",
        "Price",
        "Impressions",
        "IsNoDuplicates",
        "IsCompanion",
        "Keywords",
        "Name",
        "IsFreqCap",
        "CampaignId",
        "PriorityId",
        "DeliveryStatus",
        "IsDeleted",
        "IsActive",
        "GeoTargeting",
        "SiteZoneTargeting",
        "CustomTargeting",
        "GoalType",
        "RateType",
        "IsECPMOptimized",
        "ECPMOptimizePeriod",
        "ECPMMultiplier",
        "FloorECPM",
        "CeilingECPM",
        "DefaultECPM",
        "ECPMBurnInImpressions",
        "EffectiveCPMOverride",
        "DatePartingStartTimeISO",
        "DatePartingEndTimeISO",
        "IsSunday",
        "IsMonday",
        "IsTuesday",
        "IsWednesday",
        "IsThursday",
        "IsFriday",
        "IsSaturday",
        "FreqCap",
        "FreqCapDuration",
        "FreqCapType",
        "CapType",
        "DailyCapAmount",
        "LifetimeCapAmount",
        "CustomFieldsJson",
        "BehavioralTargeting",
        "IsArchived",
        "IsTrackingConversions",
        "RequireStrictLocation",
        "CanPassback",
        "PassbackSortOrder"
    ]
};
const call_flight_api = function (request_body) {
    return __awaiter(this, void 0, void 0, function* () {
        return baseUrl.post(apiEndPoint)
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .send(request_body);
    });
};
test_data.forEach(function (data) {
    return __awaiter(this, void 0, void 0, function* () {
        describe(`Create flight ${data.Name}`, function () {
            before(function () {
                return __awaiter(this, void 0, void 0, function* () {
                    response = yield call_flight_api(data);
                    body = response.body;
                });
            });
            it('status code is 200', function () {
                expect(response.status).to.equal(200);
            });
            it('schema is valid', function () {
                expect(tv4.validate(body, schema)).to.be.true;
            });
            it("Name and stopShowingAdsFromFlight are correct", function () {
                expect(body.Name).to.equal(data.Name);
                expect(body.BehavioralTargeting.onClick.stopShowingAdsFromFlight).to.equal(data.BehavioralTargeting.onClick.stopShowingAdsFromFlight);
            });
        });
    });
});
//# sourceMappingURL=test1.js.map