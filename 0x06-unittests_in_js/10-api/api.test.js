const request = require("request");
const {describe, it} = require("mocha");
const expect = require("chai").expect;

describe("Index page", function() {
    const options = {
	url: "http://localhost:7865/",
	method: "GET"
    }
    it("check correct status code", function(done) {
	request(options, function(err, res, body) {
	    expect(res.statusCode).to.equal(200);
	    done();
	});
    });
    it("check correct content", function(done) {
	request(options, function(err, res, body) {
	    expect(body).to.equal("Welcome to the payment system");
	    done();
	});
    });
});

describe("Cart page", function() {
    it("check correct status code for correct url", function(done) {
	request.get("http://localhost:7865/cart/12", function(err, res, body) {
	    expect(res.statusCode).to.equal(200);
	    done();
	});
    });
    it("check correct content for correct url", function(done) {
	request.get("http://localhost:7865/cart/12", function(err, res, body) {
	    expect(body).to.equal("Payment methods for cart 12");
	    done();
	});
    });
    it("check correct status code for incorrect url", function(done) {
	request.get("http://localhost:7865/cart/kim", function(err, res, body) {
	    expect(res.statusCode).to.equal(404);
	    done();
	});
    });
});

describe("Available_payments page", function() {
    it("check correct status for correct url", function() {
	request.get("http://localhost:7865/available_payments", (err, res, body) => {
	    if (err) {
		expect(res.statusCode).to.not.equal(200);
	    } else {
		expect(res.statusCode).to.equal(200);
	    }
	});
    });
    it("check correct body content for correct url", function() {
	const option = {json: true};
	const payLoad = {
	    payment_methods: {
		credit_cards: true,
		paypal: false

