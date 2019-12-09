
import {expect} from 'chai'
import tv4 from 'tv4'
import * as fs from 'fs';
const supertest = require("supertest");

const request_json = JSON.parse(fs.readFileSync('src/tests/creative/creative_create_request.json', 'utf8'));
const response_json_schema = JSON.parse(fs.readFileSync('data/schemas/creative_create_response_schema.json', 'utf8'));
const baseUrl = supertest("api.adzerk.net");
const apiEndPoint = "/v1/creative";

var response;
var body;

const call_creative_api = async function (request_body) {
    return baseUrl.post(apiEndPoint)
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json')
        .send(request_body);
}


    describe(`Create creative ${request_json.Name}`, function () {

        before(async function () {
            response = await call_creative_api(request_json);
            body = response.body;
        });

        it('status code is 200', function () {
            expect(response.status).to.equal(200);
        });

        it('schema is valid', function () {
            expect(tv4.validate(body, response_json_schema)).to.be.true;
        });

        it("Title, AdvertiserId and Id are correct", function () {
            expect(body.Title).to.equal(request_json.Title)
            expect(body.AdvertiserId).to.equal(request_json.AdvertiserId)
            expect(body.Id).is.not.empty
        });
    });
