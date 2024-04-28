FROM maven:3.8.5-openjdk-17

WORKDIR /app

COPY pom.xml .

RUN mvn dependency:go-offline

COPY . .

RUN mvn clean install

EXPOSE 8080

CMD ["mvn", "spring-boot:run"]