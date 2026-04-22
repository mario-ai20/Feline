@echo off
setlocal

cd /d "%~dp0"
start "Feline Dev Server" cmd /k "npm run dev"

powershell -NoProfile -ExecutionPolicy Bypass -Command ^
  "for ($i = 0; $i -lt 60; $i++) { ^
     try { ^
       $response = Invoke-WebRequest 'http://127.0.0.1:3000' -UseBasicParsing -TimeoutSec 1; ^
       if ($response.StatusCode -ge 200) { break } ^
     } catch { Start-Sleep -Seconds 1 } ^
   }; ^
   Start-Process 'http://localhost:3000'"

endlocal
