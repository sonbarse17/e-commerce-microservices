FROM maven:3.9.6-eclipse-temurin-17-alpine AS build

WORKDIR /app
COPY pom.xml ./pom.xml
COPY user-service/pom.xml ./user-service/pom.xml
COPY user-service/src ./user-service/src
WORKDIR /app/user-service
RUN mvn clean package -DskipTests

FROM openjdk:17-jdk-slim
WORKDIR /app
COPY --from=build /app/user-service/target/*.jar app.jar
EXPOSE 8081
CMD ["java", "-jar", "app.jar"]