REPORTER = spec # list

all: test

test: test-node test-browser

test-node:
	@node index.js --pd.flags.nogui & echo $$! > app.pid
	@./node_modules/.bin/mocha --reporter $(REPORTER) ./test/node/* || true
	@echo 'done'
	@kill `cat app.pid`
	@rm app.pid

test-browser:
	@cp ./node_modules/mocha/mocha.js ./test/public/mocha.js
	@cp ./node_modules/mocha/mocha.css ./test/public/mocha.css
	@./node_modules/wrapup/bin/wrup.js --require ./test/browser.js --output ./test/public/tests.js
#	@open -a Google\ Chrome ./test/browser/index.html

test-modules:
	@cd node_modules/port/ && make
	@cd node_modules/planet/ && make

.PHONY: test
