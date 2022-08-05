const request = require('supertest')
const app = require('./server')


describe('Mesaging API', () => {
    it('GET /all_users ---> array of users and message contents', () => {
        return request(app)
            .get('/all_users')
            .expect('Content-Type', /json/)
            .expect(200)
            .then((response) => {
                expect(response.body).toEqual(
                    expect.arrayContaining([
                        expect.objectContaining({
                            name: expect.any(String),
                            content: expect.any(String)
                        })
                    ])

                )
            })
    })

    it('GET /get_user/id ---> return specific user by ID', () => {
        return request(app)
            .get('/get_user/id')
            .expect('Content-Type', /json/)
            .expect(200)
            .then((response) => {
                expect(response.body).toEqual(
                    expect.objectContaining({
                        name: expect.any(String),
                        content: expect.any(String)
                    })
                )
            })
    })

    it('GET /get_user/id ---> turns 404 if ID doenst exist', () => {
        return request(app)
            .get('/get_user/1233352124142362352135y2gfvrvr')
            .expect(404)
    })

    it('POST /new_user ----> creates new user', () => {
        return request(app)
        .post('/new_user')
        .send({
            name: 'Donny',
            content: 'This is donnys content'
        })
        .expect('Content-Type', /json/)
        .expect(201).then((response) => {
            expect(response.body).toEqual(
                expect.objectContaining({
                    name: 'Donny',
                    content: 'This is donnys content'
                })
            )
        })
    })
})
