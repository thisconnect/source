REPORTER = spec # list

all: test

test: test-node test-modules

test-node:
	@node index --socket.log-level=1 --pd.flags.nogui & echo $$! > app.pid
	@./node_modules/.bin/mocha --reporter $(REPORTER) ./test/node/* || true
	@echo 'done'
	@kill `cat app.pid`
	@rm app.pid

test-modules:
	@cd node_modules/tool/ && make
	@cd node_modules/port/ && make
	@cd node_modules/planet/ && make

test-browser:
	@cp ./node_modules/mocha/mocha.js ./test/public/mocha.js
	@cp ./node_modules/mocha/mocha.css ./test/public/mocha.css
	@./node_modules/wrapup/bin/wrup.js browser --require ./test/public.js --output ./test/public/tests.js
	@open -a Google\ Chrome ./test/public/index.html

.PHONY: test
