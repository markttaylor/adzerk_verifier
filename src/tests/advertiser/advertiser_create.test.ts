import {expect} from 'chai'
import AJV from "ajv";
import * as fs from 'fs';
import json = Mocha.reporters.json;

const supertest = require("supertest");

const request_json = JSON.parse(fs.readFileSync('src/tests/advertiser/advertiser_create_request.json', 'utf8'));
const delete_request_json = JSON.parse(fs.readFileSync('src/tests/advertiser/advertiser_delete_request.json', 'utf8'));
const create_response_schema = JSON.parse(fs.readFileSync('data/schemas/advertiser_create_response_schema.json', 'utf8'));
const update_response_schema = JSON.parse(fs.readFileSync('data/schemas/advertiser_update_response_schema.json', 'utf8'));
const read_response_schema = JSON.parse(fs.readFileSync('data/schemas/advertiser_read_response_schema.json', 'utf8'));
const search_response_schema = JSON.parse(fs.readFileSync('data/schemas/advertiser_search_response_schema.json', 'utf8'));
const baseUrl = supertest("api.adzerk.net");
const apiEndPoint = "/v1/advertiser";

let response
let body
let advertiserId: number
let newTitle: string

const ajv = new AJV()

const createAdvertiser = async (request_body) => {
    return baseUrl.post(apiEndPoint)
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json')
        .set('X-Adzerk-ApiKey', '9C296A91AD6F4A4C23AB719A5B2057F9E08A')
        .send(request_body);
}

const updateAdvertiser = async (id: number, request_body) => {
    return baseUrl.put(apiEndPoint + "/" + id)
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json')
        .set('X-Adzerk-ApiKey', '9C296A91AD6F4A4C23AB719A5B2057F9E08A')
        .send(request_body);
}

const getAdvertiser = async (id: number) => {
    return baseUrl.get(apiEndPoint + "/" + id)
        .set('Content-Type', 'application/json')
        .set('X-Adzerk-ApiKey', '9C296A91AD6F4A4C23AB719A5B2057F9E08A')
        .send();
}

const searchForAdvertiser = async (criteria: string) => {
    console.log(criteria)
    return baseUrl.post(apiEndPoint + "/search?" + criteria)
        .set('Content-Type', 'application/json')
        .set('X-Adzerk-ApiKey', '9C296A91AD6F4A4C23AB719A5B2057F9E08A')
        .send();
}

describe(`Create advertiser with title ${request_json.Title}`, () => {

    before(async () => {
        response = await createAdvertiser(request_json);
        body = response.body;
        advertiserId = body.Id
    });

    it('status code is 200', () => {
        expect(response.status).to.equal(200);
    });

    it('response matches schema', () => {
        const valid = ajv.validate(body, create_response_schema);
        expect(ajv.validate(body, create_response_schema)).to.be.true;
        // const errorText =
        //     ajv.errorsText() && ajv.errorsText().toLowerCase() !== "no errors"
        //         ? ajv.errorsText()
        //         : "";
    })

    it("Title, IsActive and Id are correct", () => {
        expect(body.Title).to.equal(request_json.Title)
        expect(body.IsActive).to.equal(request_json.IsActive)
        expect(body.Id).to.be.a('number')
    });
});

describe("Update advertiser", () => {
    before(async () => {
        newTitle = request_json.Title + "-modified"
        request_json.Title = newTitle
        request_json.Id = advertiserId
        response = await updateAdvertiser(advertiserId, request_json);
        body = response.body;
    });

    it('status code is 200', () => {
        expect(response.status).to.equal(200);
    });

    it('response matches schema', () => {
        expect(ajv.validate(body, update_response_schema)).to.be.true;
    });

    it("New title, IsActive, PartnerId, IsDeleted and Id are correct", () => {
        expect(body.Title).to.equal(request_json.Title)
        expect(body.IsActive).is.true
        expect(body.PartnerId).is.null
        expect(body.IsDeleted).is.false
        expect(body.Id).is.equal(advertiserId)
    });
});

describe("Read advertiser", () => {
    before(async () => {
        response = await getAdvertiser(advertiserId);
        body = response.body;
    });

    it('status code is 200', () => {
        expect(response.status).to.equal(200);
    });

    it('response matches schema', () => {
        expect(ajv.validate(body, read_response_schema)).to.be.true;
    });

    it("Title, IsActive, PartnerId, IsDeleted and Id are correct", () => {
        expect(body.Title).to.equal(newTitle)
        expect(body.IsActive).is.true
        expect(body.PartnerId).is.null
        expect(body.IsDeleted).is.false
        expect(body.Id).is.equal(advertiserId)
    });
});

describe("Search for advertiser", () => {
    before(async () => {
        response = await searchForAdvertiser("advertiserName=Salad%20Days-modified")
        body = response.body
        console.log(JSON.stringify(body))
    });

    it('status code is 200', () => {
        expect(response.status).to.equal(200);
    });

    it('response matches schema', () => {
        expect(ajv.validate(body, search_response_schema)).to.be.true;
    });

    it("Title, IsActive, PartnerId, IsDeleted and Id are correct", () => {
        console.log(body)
        expect(body.PageNumber).to.equal(1)
        expect(body.Items[0].IsActive).is.true
        expect(body.Items[0].PartnerId).is.null
        expect(body.Items[0].Title).is.equal(newTitle)
        expect(body.Items[0].Id).is.equal(advertiserId)
    });
});


describe("Delete advertiser", () => {
    before(async () => {
        delete_request_json.Title = newTitle
        delete_request_json.Id = advertiserId
        response = await updateAdvertiser(advertiserId, delete_request_json);
        body = response.body;
    });

    it('status code is 200', () => {
        expect(response.status).to.equal(200);
    });

    it('response matches schema', () => {
        expect(ajv.validate(body, update_response_schema)).to.be.true;
    });

    it("New title, IsActive, PartnerId, IsDeleted and Id are correct", () => {
        console.log(JSON.stringify(body))
        expect(body.Title).to.equal(request_json.Title)
        expect(body.IsActive).is.true
        expect(body.PartnerId).is.null
        expect(body.IsDeleted).is.true
        expect(body.Id).is.equal(advertiserId)
    });
})