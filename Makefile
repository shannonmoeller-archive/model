REPORTER := spec

build: components index.js
	@component build --dev

components: component.json
	@component install --dev

clean:
	@rm -fr build components node_modules

test: build
	@mocha -R spec test/**.js

.PHONY: clean test
