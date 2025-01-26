FROM gcr.io/distroless/java21

WORKDIR /app

COPY out/artifacts/easyShopping_jar/easyShopping.jar /app/app.jar

EXPOSE 8080

CMD ["app.jar"]