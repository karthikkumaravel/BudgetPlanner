
var connect = require('../');

var fixtures = __dirname + '/fixtures';

var app = connect();
app.use(connect.compress());
app.use(connect.static(fixtures));

describe('connect.compress()', function(){
  it('should gzip files', function(done){
    app.request()
    .get('/todo.txt')
    .set('Accept-Encoding', 'gzip')
    .end(function(res){
      res.body.should.not.equal('- groceries');
      done();
    });
  })

  it('should set Content-Encoding', function(done){
    app.request()
    .get('/todo.txt')
    .set('Accept-Encoding', 'gzip')
    .expect('Content-Encoding', 'gzip', done);
  })

  it('should support HEAD', function(done){
    app.request()
    .head('/todo.txt')
    .set('Accept-Encoding', 'gzip')
    .expect('', done);
  })

  it('should support conditional GETs', function(done){
    app.request()
    .get('/todo.txt')
    .set('Accept-Encoding', 'gzip')
    .end(function(res){
      var date = res.headers['last-modified'];
      app.request()
      .get('/todo.txt')
      .set('Accept-Encoding', 'gzip')
      .set('If-Modified-Since', date)
      .expect(304, done);
    });
  })

  it('should set Vary', function(done){
    app.request()
    .get('/todo.txt')
    .set('Accept-Encoding', 'gzip')
    .expect('Vary', 'Accept-Encoding', done);
  })

  it('should set Vary at all times', function(done){
    app.request()
    .get('/todo.txt')
    .expect('Vary', 'Accept-Encoding', done);
  })

  it('should transfer chunked', function(done){
    app.request()
    .get('/todo.txt')
    .set('Accept-Encoding', 'gzip')
    .expect('Transfer-Encoding', 'chunked', done);
  })

  it('should remove Content-Length for chunked', function(done){
    app.request()
    .get('/todo.txt')
    .set('Accept-Encoding', 'gzip')
    .end(function(res){
      res.headers.should.not.have.property('content-length');
      done()
    });
  })

})