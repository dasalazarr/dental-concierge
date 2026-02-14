.PHONY: bootstrap dev lint test build release

bootstrap:
	./scripts/bootstrap.sh

dev:
	./scripts/dev.sh

lint:
	./scripts/lint.sh

test:
	./scripts/test.sh

build:
	pnpm -r build

release:
	./scripts/release.sh
