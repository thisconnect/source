var expect = require('expect.js'),
	io = require('socket.io-client');

var socket = io.connect('//:8004', {
	resource: 'io'
});

describe('Socket.IO', function(){

	describe('#connect()', function(){

		it('should connect to Socket.IO', function(done){
			socket
			.on('connect', function(){
				done();
			});
		});

		it('should fail to connect to Socket.IO', function(done){

			io.connect('//localhost:80673', {
				'force new connection': true
			})
			.on('error', function(error){
				expect(error).to.be.a('string');
				done();
			});
	
		});

	});

	describe('#namespace', function(){

		it('should connect to service', function(done){

			io.connect('//:8004/system')
			.on('connect', function(){

				this.emit('get', function(data){
					expect(data).to.be.an('object');
					done();
				});

			});

		});

		it('should connect to state', function(done){

			io.connect('//:8004/state')
			.on('connect', function(){

				this.emit('get', function(data){
					expect(data).to.be.an('object');
					done();
				});

			});

		});

	});

});
