FROM openjdk:21-jdk-slim

WORKDIR /app

COPY out/artifacts/easyShopping_jar/easyShopping.jar /app/app.jar

EXPOSE 8080

CMD ["java", "-jar", "/app/app.jar"]
