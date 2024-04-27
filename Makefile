run-client:
	docker run -d -p 3000:3000 --rm --name client react-client:v1.0
stop-client:
	docker stop client
run-server:
	docker run -d -p 8080:8080 --rm --name server spring-server:v1.0
stop-server:
	docker stop server
