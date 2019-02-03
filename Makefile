.PHONY: clean migrate-db deploy

clean:
	rm -rf target

migrate-db:
	docker run --rm -v /src/db/migrations:/flyway/sql -v /src/db/conf:/flyway/conf boxfuse/flyway migrate

deploy: clean
	./scripts/deploy-api.sh