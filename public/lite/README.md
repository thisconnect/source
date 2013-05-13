Satellite
=========

Setup
-----

	git submodule update --init --recursive


Run (python)
------------

	python -m SimpleHTTPServer 8004

Browse to [//localhost:8004](http://localhost:8004/)



Build MooTools
--------------

	./support/mootools-core/Packager/packager register ./support/mootools-core
	./support/mootools-core/Packager/packager build Core/Class.Extras Core/DOMReady Core/Element.Delegation Core/Element.Dimensions Core/Request Core/Fx.Tween Core/Fx.Morph Core/Fx.Transitions More/Drag/Slider -blocks 1.2compat 1.3compat ltFF4 IE ltIE8 ltIE9 '!ES5' '!ES5-bind' CommonJS > support/mootools.js
	uglifyjs support/mootools.js > support/mootools-min.js
