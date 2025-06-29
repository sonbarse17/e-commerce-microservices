@echo off
echo Fixing Spring Boot plugin configuration in all service pom.xml files...

for %%s in (api-gateway product-service inventory-service order-service payment-service cart-service notification-service review-service analytics-service) do (
    echo Fixing %%s...
    powershell -Command "(Get-Content 'backend\%%s\pom.xml') -replace '<plugin>\s*<groupId>org.springframework.boot</groupId>\s*<artifactId>spring-boot-maven-plugin</artifactId>\s*</plugin>', '<plugin><groupId>org.springframework.boot</groupId><artifactId>spring-boot-maven-plugin</artifactId><version>${spring-boot.version}</version><executions><execution><goals><goal>repackage</goal></goals></execution></executions></plugin>' | Set-Content 'backend\%%s\pom.xml'"
)

echo Done! All pom.xml files have been updated.
echo Run: docker-compose up -d --build