FROM maven:3.9.6-eclipse-temurin-17-alpine AS build 
 
WORKDIR /app 
COPY pom.xml ./pom.xml 
COPY cart-service/pom.xml ./cart-service/pom.xml 
COPY cart-service/src ./cart-service/src 
WORKDIR /app/cart-service 
RUN mvn clean package -DskipTests && rm -rf ~/.m2/repository 
 
FROM eclipse-temurin:17-jre-alpine 
RUN addgroup -g 1001 -S appgroup && adduser -u 1001 -S appuser -G appgroup 
WORKDIR /app 
COPY --from=build /app/cart-service/target/*.jar app.jar 
USER appuser 
EXPOSE 8086 
ENTRYPOINT ["java", "-XX:+UseContainerSupport", "-XX:MaxRAMPercentage=75.0", "-jar", "app.jar"] 
