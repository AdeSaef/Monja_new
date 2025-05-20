@echo off
title FastAPI Auto Setup & Run
cd /d %~dp0
setlocal

:: Periksa apakah Python sudah terinstal
echo Checking for Python installation...
where python >nul 2>nul
if %errorlevel% neq 0 (
    echo Python is not installed. Downloading and installing...
    powershell -Command "& {Invoke-WebRequest -Uri 'https://www.python.org/ftp/python/3.12.1/python-3.12.1-amd64.exe' -OutFile 'python_installer.exe'}"
    start /wait python_installer.exe /quiet InstallAllUsers=1 PrependPath=1
    del python_installer.exe
)

:: Verifikasi kembali Python setelah instalasi
where python >nul 2>nul
if %errorlevel% neq 0 (
    echo Python installation failed. Exiting...
    pause
    exit /b
)

:: Pastikan pip sudah terupdate
echo Updating pip...
python -m ensurepip
python -m pip install --upgrade pip

:: Periksa apakah virtual environment sudah ada
if not exist venv (
    echo Creating virtual environment...
    python -m venv venv
)

:: Aktifkan virtual environment
echo Activating virtual environment...
call venv\Scripts\activate

:: Periksa apakah requirements.txt ada
if exist requirements.txt (
    echo Installing dependencies...
    pip install -r requirements.txt
) else (
    echo No requirements.txt found, skipping installation...
)

:: Jalankan server FastAPI
echo Running FastAPI server...
uvicorn main:app --host 0.0.0.0 --port 8000 --reload

:: Biarkan terminal tetap terbuka setelah selesai
pause
