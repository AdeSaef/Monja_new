from fastapi import FastAPI, File, UploadFile, Form, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import os
import math
import shutil
from datetime import datetime
from moviepy.editor import VideoFileClip
from ftplib import FTP
import pymongo
import subprocess
import re
import xml.etree.ElementTree as ET
import csv
from typing import List
import logging
import pandas as pd
from dateutil import parser


# Constants and config
UPLOAD_FOLDER = "output_coba"
DATA_FOLDER = "data"
OUTPUT_CSV = "output.csv"
FILTERED_CSV = "filtered.csv" 
FTP_SERVER = 'ftp5.pptik.id'
FTP_PORT = 2121
FTP_USER = 'monitoring'
FTP_PASS = 'Tpm0ni23!n6'
FTP_TARGET_FOLDER = '/road_coba/test_upload'

EXIFTOOL_PATH = 'exiftool/exiftool.exe'
FFMPEG_CMD = os.path.join('ffmpeg-2025-05-07-git-1b643e3f65-essentials_build', 'bin', 'ffmpeg.exe')
FORMAT_FILE = "gpx.fmt"
distance_threshold = 0.025 

MONGO_CLIENT = pymongo.MongoClient("mongodb://monitoring:dbm0ni32!6@nosql.smartsystem.id:27017/monitoring")
DB = MONGO_CLIENT["monitoring"]
COLLECTION = DB["Test_2025"]
# COLLECTION = DB["finalreports"]
FINDCOLLECTION = DB["Kegiatan_survey"]

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

os.makedirs(UPLOAD_FOLDER, exist_ok=True)
logging.basicConfig(level=logging.INFO)

# Extract GPS metadata using exiftool
def extract_and_process_gpx(media_file):
    try:
        command = [EXIFTOOL_PATH, '-p', FORMAT_FILE, '-ee3', media_file]
        result = subprocess.run(command, capture_output=True, text=True, check=True)

        with open(OUTPUT_CSV, mode='w', newline='') as file:
            writer = csv.writer(file)
            writer.writerow(['lat', 'lon', 'ele', 'time', 'timestamp'])

            trkpt_pattern = re.compile(r'<trkpt[^>]*>.*?</trkpt>', re.DOTALL)
            for match in trkpt_pattern.findall(result.stdout):
                root = ET.fromstring(match)
                latitude = root.get('lat')
                longitude = root.get('lon')
                elevation = root.findtext('ele', default='N/A')
                time = root.findtext('time', default='N/A')
                desc_text = root.findtext('desc', default='')
                timestamp_match = re.search(r'Timestamp:\s*([\d.]+)', desc_text)
                timestamp = timestamp_match.group(1) if timestamp_match else 'N/A'

                writer.writerow([latitude, longitude, elevation,time, timestamp])

        print(f"GPS data extracted to {OUTPUT_CSV}")
    except Exception as e:
        print(f"Error extracting GPS data: {e}")

# Prepare MongoDB schema
def prepare_data(lat, lon, frame_filename, video_ext, uploader):
    print("name:", video_ext)
    document = FINDCOLLECTION.find_one({"namafiles": video_ext})
    if document:
        data = {
            "namafile": frame_filename,
            "coordinate": [lat, lon],
            "guid_survey": document["guid_survey"],
            "original_file_video": video_ext,
            "surveyor": document["surveyor"],
            "uploader": uploader,
            "kamera": document["kamera"],
            "rute": document["rute"],
            "guid_rute": document["guid_rute"],
            "tanggal_survey": document["tanggal_survey"],
            "tanggal_upload": datetime.now().strftime("%d-%m-%Y %H:%M:%S"),
            "createdAt": datetime.now().strftime("%d-%m-%Y %H:%M:%S"),
            "kilometer": 0.0,
            "station": 0,
            "status_ai": "PROCESSED",
            "status_jalan": "B",
            "FORM_SURVEY": {
                "SURFACE_HARDNESS": {
                    "ORDER": "Baik/Rapat",
                    "CONDITION": "Baik/tdk. Ada",
                    "DECREASE": "Tidak ada",
                    "PATCHES": "Tidak ada"
                },
                "CRACKS": {
                    "TYPE": "Tidak ada",
                    "WIDE": "Tidak ada",
                    "LARGE": "Tidak ada"
                },
                "OTHER_DAMAGE": {
                    "HOLE_NUMBER": "Tidak ada",
                    "HOLE_SIZE": "Tidak ada",
                    "EX_WHEEL": "Tidak ada",
                    "LEFT_DAMAGE_EDGE": "Tidak ada",
                    "RIGHT_DAMAGE_EDGE": "Tidak ada"
                },
                "SHOULDER_CHANNEL_SIDE": {
                    "LEFT_SHOULDER_CONDITION": "Tidak ada",
                    "RIGHT_SHOULDER_CONDITION": "Tidak ada",
                    "LEFT_SHOULDER_SURFACE": "Rata dgn. Permukaan jalan",
                    "RIGHT_SHOULDER_SURFACE": "Rata dgn. Permukaan jalan",
                    "LEFT_CHANNEL_SIDE_CONDITION": "Tidak ada",
                    "RIGHT_CHANNEL_SIDE_CONDITION": "Tidak ada",
                    "DAMAGE_SLOPE_LEFT": "Tidak ada",
                    "DAMAGE_SLOPE_RIGHT": "Tidak ada",
                    "SIDEWALK_LEFT": "Tidak ada",
                    "SIDEWALK_RIGHT": "Tidak ada"
                },
                "CEK_STATUS_ENTRY": True,
                "Status_jalan": "B",
                "SDI_Calculation": {
                    "RETAK_LUAS": 0,
                    "RETAK_LEBAR": 0,
                    "JUMLAH_LUBANG": 0,
                    "BEKAS_RODA": 0
                },
                "NILAI_SDI": 0,
                "Data_Angka": [2, 3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3, 3, 1, 1, 1],
                "PANJANG_KONDISI": {"BAIK": 25, "SEDANG": 0, "RUSAK_RINGAN": 0, "RUSAK_BERAT": 0},
                "KEMANTAPAN": {"MANTAP": 25, "TIDAK_MANTAP": 0},
                "JENIS_PENANGANAN": "Pemeliharaan Rutin",
                "IRI": 1
            },
            "downloadable": True
        }
        COLLECTION.insert_one(data)
        return data
    return None

# Upload image to FTP
def upload_to_ftp(local_file, ftp_path):
    try:
        with FTP(timeout=300) as ftp:
            ftp.connect(FTP_SERVER, FTP_PORT)
            ftp.login(FTP_USER, FTP_PASS)
            ftp.set_pasv(True)
            ftp.cwd(FTP_TARGET_FOLDER)
            with open(local_file, 'rb') as file:
                ftp.storbinary(f"STOR {ftp_path}", file)
        print(f"Uploaded {local_file} to FTP as {ftp_path}")
    except Exception as e:
        print(f"FTP upload failed: {e}")

# # Main video frame processing (frame per n detik)
# def process_frames(video_path, video_name, video_ext, uploader, frame_interval):
#     try:
#         extract_and_process_gpx(video_path)
#         gps_data = pd.read_csv(OUTPUT_CSV)
#         video_clip = VideoFileClip(video_path)

#         for index, t in enumerate(range(0, int(video_clip.duration), frame_interval)):
#             if index >= len(gps_data):
#                 break
#             frame_time = t
#             lat = gps_data.loc[index, 'lat']
#             lon = gps_data.loc[index, 'lon']
#             current_date = datetime.now().strftime('%d%m%Y')
#             frame_filename = f"{video_name}_{current_date}_{index}.jpg"
#             full_frame_path = os.path.join(DATA_FOLDER, frame_filename)
#             video_clip.save_frame(full_frame_path, frame_time)

#             # upload_to_ftp(full_frame_path, frame_filename)

#             prepare_data(float(lat), float(lon), frame_filename, video_ext, uploader)

#             # os.remove(full_frame_path)
#     except Exception as e:
#         print(f"Error processing frames: {e}")

# ==== Fungsi Haversine ====
def haversine(lon1, lat1, lon2, lat2):
    lon1, lat1, lon2, lat2 = map(math.radians, [lon1, lat1, lon2, lat2])
    dlon = lon2 - lon1
    dlat = lat2 - lat1
    a = math.sin(dlat/2)**2 + math.cos(lat1) * math.cos(lat2) * math.sin(dlon/2)**2
    c = 2 * math.asin(math.sqrt(a))
    r = 6371  # Radius bumi dalam kilometer
    return c * r

# ==== Proses ====
def filter_gps_points(video_ext):
    try:
        df = pd.read_csv(OUTPUT_CSV)
        last_lat, last_lon = None, None
        frame_counter = 0
        total_distance = 0.0
        filtered_data = []

        for _, row in df.iterrows():
            try:
                current_lat = float(row['lat'])
                current_lon = float(row['lon'])
                if last_lat is not None:
                    distance = haversine(last_lon, last_lat, current_lon, current_lat)
                    if distance >= distance_threshold:
                        timestamp_iso = parser.isoparse(row['time']) if pd.notna(row['time']) else datetime.now()
                        date_str = timestamp_iso.date()
                        time_str = timestamp_iso.time()
                        timestamp_float = float(row['timestamp']) if 'timestamp' in row and pd.notna(row['timestamp']) else None

                        frame_filename = f"{os.path.splitext(video_ext)[0]}_{datetime.now().strftime('%d%m%Y')}_{frame_counter}.jpg"
                        frame_counter += 1
                        total_distance += round(distance, 4)

                        # Simpan ke list hasil
                        filtered_data.append([current_lat, current_lon, date_str, time_str, timestamp_float, total_distance])

                        last_lat, last_lon = current_lat, current_lon
                else:
                    last_lat, last_lon = current_lat, current_lon
            except Exception as inner_e:
                print(f"Skipping row due to error: {inner_e}")

        # Simpan hasil ke CSV
        filtered_df = pd.DataFrame(filtered_data, columns=['lat', 'lon', 'date', 'time', 'timestamp', 'distance_km'])
        filtered_df.to_csv(FILTERED_CSV, index=False)
        print(f"Filtered coordinates saved to: {FILTERED_CSV}")
        print(f"Total distance captured: {total_distance:.3f} km")

    except Exception as e:
        print(f"Error processing data: {e}")

def process_frames(video_path, video_name, video_ext, uploader, interval):
    try:
        # 1. Ekstrak data GPS dari video
        print("Menjalankan ekstraksi GPX dari video...")
        extract_and_process_gpx(video_path)

        # 2. Jalankan filter haversine berdasarkan jarak
        print("Menyaring koordinat berdasarkan jarak...")
        filter_gps_points(video_ext)

        # 3. Baca hasil filter
        print("Membaca data dari filtered.csv...")
        gps_data = pd.read_csv(FILTERED_CSV)

        if not os.path.exists(DATA_FOLDER):
            os.makedirs(DATA_FOLDER)

        # 4. Ekstrak frame dari timestamp pada filtered.csv
        for index, row in gps_data.iterrows():
            try:
                timestamp = float(row['timestamp'])
                lat = row['lat']
                lon = row['lon']
                current_date = datetime.now().strftime('%d%m%Y')
                frame_filename = f"{video_name}_{current_date}_{index}.jpg"
                full_frame_path = os.path.join(DATA_FOLDER, frame_filename)

                print(f"Menyimpan frame ke: {frame_filename} @ {timestamp}s")

                command = [
                    FFMPEG_CMD,
                    '-ss', str(timestamp),
                    '-i', video_path,
                    '-frames:v', '1',
                    '-q:v', '2',
                    full_frame_path
                ]
                subprocess.run(command, check=True)

                # 5. Upload ke FTP & simpan metadata
                upload_to_ftp(full_frame_path, frame_filename)
                prepare_data(float(lat), float(lon), frame_filename, video_ext, uploader)
from fastapi import FastAPI, File, UploadFile, Form, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import os
import math
import shutil
from datetime import datetime
from moviepy.editor import VideoFileClip
from ftplib import FTP
import pymongo
import subprocess
import re
import xml.etree.ElementTree as ET
import csv
from typing import List
import logging
import pandas as pd
from dateutil import parser

# Constants and config
UPLOAD_FOLDER = "output_coba"
DATA_FOLDER = "data"
OUTPUT_CSV = "output.csv"
FILTERED_CSV = "filtered.csv" 
FTP_SERVER = 'ftp5.pptik.id'
FTP_PORT = 2121
FTP_USER = 'monitoring'
FTP_PASS = 'Tpm0ni23!n6'
FTP_TARGET_FOLDER = '/road_coba/test_upload'

EXIFTOOL_PATH = 'exiftool/exiftool.exe'
FFMPEG_CMD = os.path.join('ffmpeg-2025-05-07-git-1b643e3f65-essentials_build', 'bin', 'ffmpeg.exe')
FORMAT_FILE = "gpx.fmt"
distance_threshold = 0.025 

MONGO_CLIENT = pymongo.MongoClient("mongodb://monitoring:dbm0ni32!6@nosql.smartsystem.id:27017/monitoring")
DB = MONGO_CLIENT["monitoring"]
COLLECTION = DB["Test_2025"]
# COLLECTION = DB["finalreports"]
FINDCOLLECTION = DB["Kegiatan_survey"]

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

os.makedirs(UPLOAD_FOLDER, exist_ok=True)
logging.basicConfig(level=logging.INFO)

# Extract GPS metadata using exiftool
def extract_and_process_gpx(media_file):
    try:
        command = [EXIFTOOL_PATH, '-p', FORMAT_FILE, '-ee3', media_file]
        result = subprocess.run(command, capture_output=True, text=True, check=True)

        with open(OUTPUT_CSV, mode='w', newline='') as file:
            writer = csv.writer(file)
            writer.writerow(['lat', 'lon', 'ele', 'time', 'timestamp'])

            trkpt_pattern = re.compile(r'<trkpt[^>]*>.*?</trkpt>', re.DOTALL)
            for match in trkpt_pattern.findall(result.stdout):
                root = ET.fromstring(match)
                latitude = root.get('lat')
                longitude = root.get('lon')
                elevation = root.findtext('ele', default='N/A')
                time = root.findtext('time', default='N/A')
                desc_text = root.findtext('desc', default='')
                timestamp_match = re.search(r'Timestamp:\s*([\d.]+)', desc_text)
                timestamp = timestamp_match.group(1) if timestamp_match else 'N/A'

                writer.writerow([latitude, longitude, elevation,time, timestamp])

        print(f"GPS data extracted to {OUTPUT_CSV}")
    except Exception as e:
        print(f"Error extracting GPS data: {e}")

# Prepare MongoDB schema
def prepare_data(lat, lon, frame_filename, video_ext, uploader):
    print("name:", video_ext)
    document = FINDCOLLECTION.find_one({"namafiles": video_ext})
    if document:
        data = {
            "namafile": frame_filename,
            "coordinate": [lat, lon],
            "guid_survey": document["guid_survey"],
            "original_file_video": video_ext,
            "surveyor": document["surveyor"],
            "uploader": uploader,
            "kamera": document["kamera"],
            "rute": document["rute"],
            "guid_rute": document["guid_rute"],
            "tanggal_survey": document["tanggal_survey"],
            "tanggal_upload": datetime.now().strftime("%d-%m-%Y %H:%M:%S"),
            "createdAt": datetime.now().strftime("%d-%m-%Y %H:%M:%S"),
            "kilometer": 0.0,
            "station": 0,
            "status_ai": "PROCESSED",
            "status_jalan": "B",
            "FORM_SURVEY": {
                "SURFACE_HARDNESS": {
                    "ORDER": "Baik/Rapat",
                    "CONDITION": "Baik/tdk. Ada",
                    "DECREASE": "Tidak ada",
                    "PATCHES": "Tidak ada"
                },
                "CRACKS": {
                    "TYPE": "Tidak ada",
                    "WIDE": "Tidak ada",
                    "LARGE": "Tidak ada"
                },
                "OTHER_DAMAGE": {
                    "HOLE_NUMBER": "Tidak ada",
                    "HOLE_SIZE": "Tidak ada",
                    "EX_WHEEL": "Tidak ada",
                    "LEFT_DAMAGE_EDGE": "Tidak ada",
                    "RIGHT_DAMAGE_EDGE": "Tidak ada"
                },
                "SHOULDER_CHANNEL_SIDE": {
                    "LEFT_SHOULDER_CONDITION": "Tidak ada",
                    "RIGHT_SHOULDER_CONDITION": "Tidak ada",
                    "LEFT_SHOULDER_SURFACE": "Rata dgn. Permukaan jalan",
                    "RIGHT_SHOULDER_SURFACE": "Rata dgn. Permukaan jalan",
                    "LEFT_CHANNEL_SIDE_CONDITION": "Tidak ada",
                    "RIGHT_CHANNEL_SIDE_CONDITION": "Tidak ada",
                    "DAMAGE_SLOPE_LEFT": "Tidak ada",
                    "DAMAGE_SLOPE_RIGHT": "Tidak ada",
                    "SIDEWALK_LEFT": "Tidak ada",
                    "SIDEWALK_RIGHT": "Tidak ada"
                },
                "CEK_STATUS_ENTRY": True,
                "Status_jalan": "B",
                "SDI_Calculation": {
                    "RETAK_LUAS": 0,
                    "RETAK_LEBAR": 0,
                    "JUMLAH_LUBANG": 0,
                    "BEKAS_RODA": 0
                },
                "NILAI_SDI": 0,
                "Data_Angka": [2, 3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3, 3, 1, 1, 1],
                "PANJANG_KONDISI": {"BAIK": 25, "SEDANG": 0, "RUSAK_RINGAN": 0, "RUSAK_BERAT": 0},
                "KEMANTAPAN": {"MANTAP": 25, "TIDAK_MANTAP": 0},
                "JENIS_PENANGANAN": "Pemeliharaan Rutin",
                "IRI": 1
            },
            "downloadable": True
        }
        COLLECTION.insert_one(data)
        return data
    return None

# Upload image to FTP
def upload_to_ftp(local_file, ftp_path):
    try:
        with FTP(timeout=300) as ftp:
            ftp.connect(FTP_SERVER, FTP_PORT)
            ftp.login(FTP_USER, FTP_PASS)
            ftp.set_pasv(True)
            ftp.cwd(FTP_TARGET_FOLDER)
            with open(local_file, 'rb') as file:
                ftp.storbinary(f"STOR {ftp_path}", file)
        print(f"Uploaded {local_file} to FTP as {ftp_path}")
    except Exception as e:
        print(f"FTP upload failed: {e}")

# Main video frame processing (frame per n detik)
def process_frames(video_path, video_name, video_ext, uploader, interval):
    try:
        # 1. Ekstrak data GPS dari video
        print("Menjalankan ekstraksi GPX dari video...")
        extract_and_process_gpx(video_path)

        # 2. Jalankan filter haversine berdasarkan jarak
        print("Menyaring koordinat berdasarkan jarak...")
        filter_gps_points(video_ext)

        # 3. Baca hasil filter
        print("Membaca data dari filtered.csv...")
        gps_data = pd.read_csv(FILTERED_CSV)

        if not os.path.exists(DATA_FOLDER):
            os.makedirs(DATA_FOLDER)

        # 4. Ekstrak frame dari timestamp pada filtered.csv
        for index, row in gps_data.iterrows():
            try:
                timestamp = float(row['timestamp'])
                lat = row['lat']
                lon = row['lon']
                current_date = datetime.now().strftime('%d%m%Y')
                frame_filename = f"{video_name}_{current_date}_{index}.jpg"
                full_frame_path = os.path.join(DATA_FOLDER, frame_filename)

                print(f"Menyimpan frame ke: {frame_filename} @ {timestamp}s")

                command = [
                    FFMPEG_CMD,
                    '-ss', str(timestamp),
                    '-i', video_path,
                    '-frames:v', '1',
                    '-q:v', '2',
                    full_frame_path
                ]
                subprocess.run(command, check=True)

                # 5. Upload ke FTP & simpan metadata
                upload_to_ftp(full_frame_path, frame_filename)
                prepare_data(float(lat), float(lon), frame_filename, video_ext, uploader)

                # Hapus frame setelah upload
                os.remove(full_frame_path)

            except Exception as e:
                print(f"Gagal memproses frame index {index}: {e}")

    except Exception as e:
        print(f"Error utama saat memproses: {e}")

@app.post("/upload/")
async def upload_video(

                # Hapus frame setelah upload
                os.remove(full_frame_path)

            except Exception as e:
                print(f"Gagal memproses frame index {index}: {e}")

    except Exception as e:
        print(f"Error utama saat memproses: {e}")

@app.post("/upload/")
async def upload_video(
    file: UploadFile = File(...),
    uploader: str = Form(...),
    frame_interval: int = Form(30)  # interval dalam detik
):
    video_path = os.path.join(UPLOAD_FOLDER, file.filename)
    video_name = os.path.splitext(file.filename)[0]
    video_ext = os.path.splitext(file.filename)[1].upper()
    video_ext = video_name + video_ext

    with open(video_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    process_frames(video_path, video_name, video_ext, uploader, frame_interval)

    return {
        "filename": file.filename,
        "uploader": uploader,
        "message": "Upload and processing successful"
    }


    
# Fungsi helper untuk mengubah ObjectId ke string
def serialize_doc(doc):
    doc["_id"] = str(doc["_id"])
    return doc

@app.get("/getrute", response_model=List[dict])
async def get_data():
    data = FINDCOLLECTION.find({}, {"rute": 1, "_id": 0})
    rute_list = list(set([item["rute"] for item in data if "rute" in item]))
    return [{"rute": r} for r in rute_list]  # Return list of dict

from typing import List

@app.get("/cek", response_model=bool)
async def cek_data(rute: str, namafile: str):
    print(rute, namafile)
    count = FINDCOLLECTION.count_documents({"rute": rute, "namafiles": namafile})
    return count > 0

