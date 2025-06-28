FROM maven:3.9.6-eclipse-temurin-17-alpine AS build

WORKDIR /app
COPY pom.xml ./pom.xml
COPY analytics-service/pom.xml ./analytics-service/pom.xml
COPY analytics-service/src ./analytics-service/src
WORKDIR /app/analytics-service
RUN mvn clean package -DskipTests && rm -rf ~/.m2/repository

FROM eclipse-temurin:17-jre-alpine
RUN addgroup -g 1001 -S appgroup && adduser -u 1001 -S appuser -G appgroup
WORKDIR /app
COPY --from=build /app/analytics-service/target/*.jar app.jar
USER appuser
EXPOSE 8089
ENTRYPOINT ["java", "-XX:+UseContainerSupport", "-XX:MaxRAMPercentage=75.0", "-jar", "app.jar"]