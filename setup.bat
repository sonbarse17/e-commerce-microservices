@echo off
echo Detecting server IP...

REM Try to get external IP using PowerShell
for /f %%i in ('powershell -Command "(Invoke-WebRequest -Uri 'https://ifconfig.me/ip' -UseBasicParsing).Content.Trim()"') do set SERVER_IP=%%i

if "%SERVER_IP%"=="" (
    echo Could not detect server IP, using localhost
    set SERVER_IP=localhost
)

echo Detected SERVER_IP: %SERVER_IP%

REM Update .env file
powershell -Command "(Get-Content .env) -replace 'SERVER_IP=.*', 'SERVER_IP=%SERVER_IP%' | Set-Content .env"

echo Updated .env file with SERVER_IP=%SERVER_IP%
echo Starting services...

REM Start Docker Compose
docker-compose up --build