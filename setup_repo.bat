@echo off
echo Inicializando repositorio Git...
git init
echo Configurando .gitignore...
(
    echo node_modules/
    echo .next/
    echo .env
    echo .DS_Store
    echo dist/
    echo build/
    echo .vscode/
) > .gitignore
echo Agregando archivos al area de preparacion...
git add .
echo Realizando el primer commit...
git commit -m "Initial commit for Vibe Coding Portfolio"
echo Renombrando rama principal a main...
git branch -M main
echo.
echo ========================================================
echo   ¡Repositorio local listo!
echo ========================================================
echo.
echo Paso final: Conecta tu repositorio de GitHub.
echo.
echo 1. Ve a tu repositorio nuevo en GitHub.
echo 2. Copia el comando que empieza con: git remote add origin...
echo 3. Pegalo aqui abajo y dale Enter.
echo 4. Luego ejecuta: git push -u origin main
echo.
pause
