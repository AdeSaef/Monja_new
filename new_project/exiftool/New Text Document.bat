@echo off
setlocal
if "%~1"=="" (
    echo Drag and drop video file ke file ini.
    pause
    exit /b
)

set "filename=%~n1"
set "outfile=%filename%_gps.csv"

exiftool -n -csv -ee -gps:all "%~1" > "%outfile%"
echo [✓] Metadata GPS berhasil disimpan di: %outfile%
pause
