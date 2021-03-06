
import {expect} from 'chai'
import tv4 from 'tv4'
import * as fs from 'fs';
const supertest = require("supertest");

const request_json = JSON.parse(fs.readFileSync('src/tests/campaign/campaign_create_request.json', 'utf8'));
const response_json_schema = JSON.parse(fs.readFileSync('data/schemas/campaign_create_response_schema.json', 'utf8'));
const baseUrl = supertest("api.adzerk.net");
const apiEndPoint = "/v1/campaign";

var response;
var body;

const call_campaign_api = async (request_body) => {
    return baseUrl.post(apiEndPoint)
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json')
        .set('X-Adzerk-ApiKey', '9C296A91AD6F4A4C23AB719A5B2057F9E08A')
        .send(request_body);
}

    describe(`Create campaign ${request_json.Name}`,  () => {

        before(async () => {
            response = await call_campaign_api(request_json);
            body = response.body;
        });

        it('status code is 200', () => {
            expect(response.status).to.equal(200);
        });

        it('schema is valid', () => {
            expect(tv4.validate(body, response_json_schema)).to.be.true;
        });

        it("Name and stopShowingAdsFromFlight are correct", () => {
            expect(body.Name).to.equal(request_json.Name)
            expect(body.AdvertiserId).to.equal(request_json.AdvertiserId)
            expect(body.Id).is.not.empty
        });
    });
