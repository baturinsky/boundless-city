echo "%~dp0public"
start server\tiny "%~dp0public" 9001
start /max http://localhost:9001