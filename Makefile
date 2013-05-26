
build: components lib/*.js
	@component build --dev

components: component.json
	@component install --dev

docs:
	@doxit -t Model.js -I README.md *.{md,js}

clean:
	rm -fr build components docs

test:
	rm -rf build && make build && workit .

.PHONY: clean test
