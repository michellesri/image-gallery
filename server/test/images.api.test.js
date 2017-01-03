const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = chai.assert;
chai.use(chaiHttp);

process.env.MONGODB_URI = 'mongodb://localhost/images-test';

const connection = require('../lib/setup-mongoose');
const app = require('../lib/app');

describe('images', () => {

  before(done => {
    const drop = () => connection.db.dropDatabase(done);
    if (connection.readyState === 1) drop();
    else {
      connection.on('open', drop);
    }
  });

  const request = chai.request(app);

  const bunny = {
    title: 'Calico Bunny',
    link: 'http://f.cl.ly/items/3g3J1G0w122M360w380O/3726490195_f7cc75d377_o.jpg',
    description: 'orange, brown, and grey calico bunny'
  };

  it('/GET all', done => {
    request
			.get('/api/images')
			.then(res => {
  assert.deepEqual(res.body, []);
  done();
})
			.catch(done);
  });

  it('/POST', done => {
    request
			.post('/api/images')
			.send(bunny)
			.then(res => {
  const image = res.body;
  assert.ok(image._id);
  bunny._id = image._id;
  done();
})
			.catch(done);

  });

  it('/GET by id', done => {
    request
			.get(`/api/images/${bunny._id}`)
			.then(res => {
  const image = res.body;
  assert.deepEqual(image, bunny);
  done();
})
			.catch(done);
  });

  it('/GET all after post', done => {
    request
			.get('/api/images')
			.then(res => {
  assert.deepEqual(res.body, [ bunny ]);
  done();
})
			.catch(done);
  });


  it ('DELETE /api/images/:id', done => {
    request
      .delete(`/api/images/${bunny._id}`)
      .then(res => {
        assert.equal(res.body._id, bunny._id);
        done();
      })
      .catch(done);
  });

});
