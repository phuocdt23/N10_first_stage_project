// Declaration and Initialization Library
const chai = require('chai');
const chaiHttp = require('chai-http');
const { StatusCodes } = require('http-status-codes');

// const db = require('../config/db.connection');

const app = require('../index'); // what we need to test (notice that: turn off your server)
chai.should(); // return what? do what?
chai.use(chaiHttp); // do what? return what?
const dataTest = {
    registerSuccess: {
        email: "user1@gmail.com",
        username: "admin4",
        name: "admin4",
        password: "123123",
    },
    changePassword: {
        newPassword:"123456"
    }
}
describe('test auth route /auth',() => {
    let tokenEmailConfirmation;
    let accessToken;
    describe('register ', () => {
        it('POST /auth/register', done => {
            chai
                .request(app)
                .post('/auth/register')
                .send(dataTest.registerSuccess)
                .end((err, res) => {
                    tokenEmailConfirmation = res.body.token;
                    res.should.have.status(StatusCodes.CREATED);
                    res.body.should.have.property('message').eql("You need to check your email to confirm your account!");
                    res.body.should.have.property('token');
                    done();
                });
        });
    });
    describe('confirmation !', () => {
        it('GET /auth/confirmation/:id', done => {
            chai
                .request(app)
                .get('/auth/confirmation/' + tokenEmailConfirmation)
                .send()
                .end((err, res) => {
                    res.should.have.status(StatusCodes.OK);
                    res.body.should.have.property('message').eql('confirmation successfully!!!!!');
                    done();
                });
        });
    });
    describe('login with email !', () => {
        it('POST /auth/login', done => {
            chai
                .request(app)
                .post('/auth/login')
                .send(
                    {
                        email: dataTest.registerSuccess.email,
                        password: dataTest.registerSuccess.password
                    }
                )
                .end((err, res) => {
                    res.should.have.status(StatusCodes.OK);
                    res.body.should.have.keys('id', 'name', 'username', 'email', 'status', 'accessToken');
                    done();
                });
        });
    });
    describe('login with username !', () => {
        it('POST /auth/login', done => {
            chai
                .request(app)
                .post('/auth/login')
                .send(
                    {
                        username: dataTest.registerSuccess.username,
                        password: dataTest.registerSuccess.password
                    }
                )
                .end((err, res) => {
                    res.should.have.status(StatusCodes.OK);
                    res.body.should.have.keys('id', 'name', 'username', 'email', 'status', 'accessToken');
                    done();
                });
        });
    });
    describe('change password !', () => {
        it('POST /auth/change-password', done => {
            chai
                .request(app)
                .post('/auth/change-password')
                .send(
                    {
                        username: dataTest.registerSuccess.username,
                        password: dataTest.registerSuccess.password,
                        newPassword: dataTest.changePassword.newPassword
                    }
                )
                .end((err, res) => {
                    res.should.have.status(StatusCodes.OK);
                    res.body.should.have.property('message').eql('successfully change password!');
                    done();
                });
        });
    });
    describe('forget password !', () => {
        it('POST /auth/forgot-password', done => {
            chai
                .request(app)
                .post('/auth/forgot-password')
                .send(
                    {
                        email: dataTest.registerSuccess.email
                    }
                )
                .end((err, res) => {
                    forgotPasswordToken = res.body.token;
                    console.log(forgotPasswordToken);
                    res.should.have.status(StatusCodes.OK);
                    res.body.should.have.property('message').eql('please check your email to reset your password');
                    done();
                });
        });
    });
})



    
