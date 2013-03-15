new Unit({

	initSetup: function(){
		this.load('manifest.json', this.parseManifest);
	},

	load: function(file, callback){
		new Request({
			url: '/instruments/' + file,
			method: 'get',
			noCache: true,
			onSuccess: callback.bind(this)
		}).send();
	},

	count: 0,

	parseManifest: function(data){
		data = JSON.parse(data);
		if (!data) return null;

		var i = this.count = data.length;
		while (i--){
			if (typeof data[i] != 'string') this.parseDescriptor(data[i]);
			else this.load(data[i], this.parseDescriptor);
		}
	},

	parseDescriptor: function(data){
		if (typeof data == 'string') data = JSON.parse(data);
		if (!data) return null;
		data.name = data.name.toLowerCase();
		this.publish('descriptor add', data);
		if (--this.count <= 0) this.publish('descriptor ready');
	}

});
