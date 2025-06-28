FROM maven:3.9.6-eclipse-temurin-17-alpine AS build 
 
WORKDIR /app 
COPY pom.xml ./pom.xml 
COPY cart-service/pom.xml ./cart-service/pom.xml 
COPY cart-service/src ./cart-service/src 
WORKDIR /app/cart-service 
RUN mvn clean package -DskipTests 
 
FROM openjdk:17-jdk-slim 
WORKDIR /app 
COPY --from=build /app/cart-service/target/*.jar app.jar 
EXPOSE 8086 
ENTRYPOINT ["java", "-jar", "app.jar"] 
