import { expect, request, app } from '../setup';

describe('User Routes', () => {
    it('should create a new user', async () => {
        const response = await request(app)
            .post('/add-user')
            .field('name', 'John')
            .field('last_name', 'Doe')
            .field('email', 'john.doe@example.com')
            .field('password', 'password123')
            .attach('profilePicture', 'test/files/test.jpg'); // Asegúrate de tener una imagen de prueba en test/files/

        expect(response.status).to.equal(201);
        expect(response.body).to.have.property('status', 'success');
        expect(response.body.data).to.include({
            name: 'John',
            last_name: 'Doe',
            email: 'john.doe@example.com'
        });
    });

    it('should list all users', async () => {
        const response = await request(app)
            .get('/users')
            .send();

        expect(response.status).to.equal(200);
        expect(response.body).to.be.an('array');
    });
});
