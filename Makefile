.PHONY: all down

all:
	docker compose up --build

down:
	docker compose down --rmi all --volumes
