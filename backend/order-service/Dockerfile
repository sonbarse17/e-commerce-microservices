FROM maven:3.9.6-eclipse-temurin-17-alpine AS build

WORKDIR /app
COPY pom.xml ./pom.xml
COPY order-service/pom.xml ./order-service/pom.xml
COPY order-service/src ./order-service/src
WORKDIR /app/order-service
RUN mvn clean package -DskipTests && rm -rf ~/.m2/repository

FROM eclipse-temurin:17-jre-alpine
RUN addgroup -g 1001 -S appgroup && adduser -u 1001 -S appuser -G appgroup
WORKDIR /app
COPY --from=build /app/order-service/target/*.jar app.jar
USER appuser
EXPOSE 8084
ENTRYPOINT ["java", "-XX:+UseContainerSupport", "-XX:MaxRAMPercentage=75.0", "-jar", "app.jar"]