# EdocFlow

Electronic Document Management system &#9983;<br/>
Running app through `docker` & `docker-compose`<br/>

At first, set `JWT_SECRET_KEY` in [application.properties](/server/src/main/resources/application.properties) file <br/>
and be careful on using right `host` name for docker (also in [application.properties](/server/src/main/resources/application.properties)) 

#### Use `docker-compose` command
```shell
docker-compose up
```
#### If you changed something, use `--build`
```shell
docker-compose up --build
```

### TECHNOLOGY STACK USED: 
- Spring/Java
- React/JS
- MongoDB
- Docker

### SECURED WITH
- Spring-Security
- JWT