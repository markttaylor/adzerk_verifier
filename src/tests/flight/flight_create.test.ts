
import {expect} from 'chai'
import tv4 from 'tv4'
import * as fs from 'fs';
const supertest = require("supertest");

const request_json = JSON.parse(fs.readFileSync('src/tests/flight/flight_create_request.json', 'utf8'));
const response_json_schema = JSON.parse(fs.readFileSync('data/schemas/flight_create_response_schema.json', 'utf8'));
const baseUrl = supertest("api.adzerk.net");
const apiEndPoint = "/v1/flight";

var response;
var body;

const call_flight_api = async function (request_body) {
    return baseUrl.post(apiEndPoint)
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json')
        .send(request_body);
}


    describe(`Create flight ${request_json.Name}`, function () {

        before(async function () {
            response = await call_flight_api(request_json);
            body = response.body;
        });

        it('status code is 200', function () {
            expect(response.status).to.equal(200);
        });

        it('schema is valid', function () {
            expect(tv4.validate(body, response_json_schema)).to.be.true;
        });

        it("Name and stopShowingAdsFromFlight are correct", function () {
            expect(body.Name).to.equal(request_json.Name);
            expect(body.BehavioralTargeting.onClick.stopShowingAdsFromFlight).to.equal(request_json.BehavioralTargeting.onClick.stopShowingAdsFromFlight);
        });
    });
