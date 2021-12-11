cd .\webApp\nodeServer\
rmdir /s /q build
cd ..\sulClient\
call npm run build
move build ..\nodeServer\

@echo ===================
@echo build react-app success!!
@echo ===================
@timeout /t 1

cd .\webApp\nodeServer\
git add --all
git commit -m "build app for deployee"
git push

pause