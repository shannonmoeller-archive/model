REPORTER := spec

build: components index.js
	@./node_modules/.bin/component build --dev

components: node_modules component.json
	@./node_modules/.bin/component install --dev

node_modules: package.json
	@npm install -d

clean:
	@rm -fr build components node_modules

test: build
	@./node_modules/.bin/mocha -R spec test/**.js

.PHONY: clean test
