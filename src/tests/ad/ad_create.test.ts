
import {expect} from 'chai'
import tv4 from 'tv4'
import * as fs from 'fs';
const supertest = require("supertest");

const request_json = JSON.parse(fs.readFileSync('src/tests/ad/ad_create_request.json', 'utf8'));
const response_json_schema = JSON.parse(fs.readFileSync('data/schemas/ad_create_response_schema.json', 'utf8'));
const baseUrl = supertest("api.adzerk.net");
const apiEndPoint = "/v1/ad";

var response;
var body;

const call_ad_api = async function (request_body) {
    return baseUrl.post(apiEndPoint)
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json')
        .send(request_body);
}


    describe(`Create ad ${request_json.Name}`, function () {

        before(async function () {
            response = await call_ad_api(request_json);
            body = response.body;
        });

        it('status code is 200', function () {
            expect(response.status).to.equal(200);
        });

        it('schema is valid', function () {
            expect(tv4.validate(body, response_json_schema).valid).to.be.true;
        });

        it("CampaignId, FlightId, IsActive and Creative.Id are correct", function () {
            expect(body.CampaignId).to.equal(request_json.CampaignId);
            expect(body.FlightId).to.equal(request_json.FlightId);
            expect(body.IsActive).to.equal(request_json.IsActive);
            expect(body.Creative.Id).to.equal(request_json.Creative.Id);
        });
    });
