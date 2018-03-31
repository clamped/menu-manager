.PHONY: clean deploy-api

clean:
	rm -rf api/target

deploy-api: clean
	./api/deploy-api.sh