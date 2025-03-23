FROM docker.klnsdr.com/nyx-cli:1.1 as builder

WORKDIR /app

COPY . .

RUN nyx build

FROM gcr.io/distroless/java21

WORKDIR /app

COPY --from=builder /app/build/easyShopping-3.10.jar /app/app.jar

EXPOSE 8080

CMD ["app.jar"]