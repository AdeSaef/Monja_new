from fastapi import FastAPI, File, UploadFile, Form
from fastapi.middleware.cors import CORSMiddleware
import csv
import re
import pymongo
from datetime import datetime, timedelta
import shutil
import os
import math
from dateutil import parser
from moviepy.editor import VideoFileClip
import logging
import subprocess
import xml.etree.ElementTree as ET
import pandas as pd
from ftplib import FTP


# Arahkan ke executable lokal exiftool
exiftool_path = 'exiftool/exiftool.exe'
FORMAT_FILE = "gpx.fmt"
OUTPUT_CSV = "output.csv"
DISTANCE_CSV = "distance_output.csv"  
FILTERED_CSV = "filtered_output.csv"  
DATA_FOLDER = "data"
ftp = None

# MongoDB connection details
MONGO_CLIENT = pymongo.MongoClient("mongodb://monitoring:dbm0ni32!6@nosql.smartsystem.id:27017/monitoring")
DB = MONGO_CLIENT["monitoring"]
#COLLECTION = DB["Data_coba"]
COLLECTION = DB["Test_2025"]
# VIDEO_FILENAME = os.path.basename(sys.argv[1])
hasil = 0
distance_threshold = 0.3  # km
ftp = None
jarak = 0
# MEDIA_FILE = sys.argv[1]
# uploader_name = sys.argv[2]
findcollection = DB["Kegiatan_survey"]

# FTP server details
FTP_SERVER = 'ftp5.pptik.id'
FTP_PORT = 2121
FTP_USER = 'monitoring'
FTP_PASS = 'Tpm0ni23!n6'
FTP_TARGET_FOLDER = '/road_coba/test_2025'

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(level=logging.INFO)

UPLOAD_FOLDER = "D:/output_coba"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

h = 1000
lebar_sensor =6.3
lebar_fokus =2.92
gsd = h*lebar_sensor//lebar_fokus
def haversine(lon1, lat1, lon2, lat2):
    """Calculate the great-circle distance between two points on the Earth's surface."""
    lon1, lat1, lon2, lat2 = map(math.radians, [lon1, lat1, lon2, lat2])
    dlon = lon2 - lon1
    dlat = lat2 - lat1
    a = math.sin(dlat / 2)**2 + math.cos(lat1) * math.cos(lat2) * math.sin(dlon / 2)**2
    c = 2 * math.asin(math.sqrt(a))
    r = 6371  # Radius of Earth in kilometers
    return c * r

# def extract_frames(video_path, output_folder, interval=1):
#     logging.info(f"Processing video: {video_path}")
#     os.makedirs(output_folder, exist_ok=True)
#     video = VideoFileClip(video_path)
#     duration = int(video.duration)

#     frame_count = 0
#     for t in range(0, duration, interval):
#         frame_path = os.path.join(output_folder, f"frame_{t}.jpg")
#         video.save_frame(frame_path, t)
#         frame_count += 1

#     return frame_count


def extract_and_process_gpx(MEDIA_FILE):
    """Extract GPS data from the media file and process it."""
    try:
        COMMAND= [exiftool_path,'-p', FORMAT_FILE,'-ee3',MEDIA_FILE]
        # Execute the command to extract GPS data
        result = subprocess.run(COMMAND, capture_output=True, text=True, check=True)
        print(result.stdout)
        
        # Parse the output and save to CSV
        with open(OUTPUT_CSV, mode='w', newline='') as file:
            writer = csv.writer(file)
            writer.writerow(['lat', 'lon', 'ele', 'time'])  # Write the header
            
            # Regular expression to match <trkpt> elements
            trkpt_pattern = re.compile(r'<trkpt[^>]*>.*?</trkpt>', re.DOTALL)
            
            for match in trkpt_pattern.findall(result.stdout):
                root = ET.fromstring(match)
                latitude = root.get('lat')
                longitude = root.get('lon')
                elevation_elem = root.find('ele')
                timestamp_elem = root.find('time')
                
                elevation = elevation_elem.text if elevation_elem is not None else 'N/A'
                timestamp = timestamp_elem.text if timestamp_elem is not None else 'N/A'
                
                writer.writerow([latitude, longitude, elevation, timestamp])
        
        print(f"GPS data extracted to {OUTPUT_CSV}")
        # Process the CSV file to compute distances and filter points

    except subprocess.CalledProcessError as e:
        print("Error occurred while running exiftool:", e)
        print("stderr:", e.stderr)
    except FileNotFoundError:
        print("exiftool executable not found. Please ensure exiftool is installed and the path is correct.")
    # except pymongo.errors.ConnectionError as e:
    #     print(f"Could not connect to MongoDB: {e}")
    except Exception as e:
        print(f"An unexpected error occurred: {e}")

def prepare_data(lat, lon, frame_filename, video_name, UPLOADER):
    same_nama_files_cursor = findcollection.find({"namafiles": video_name})
    document = same_nama_files_cursor.next()
    if document:
        return {
            "namafile": frame_filename,
            "coordinate": [lat, lon],
            "guid_survey": document["guid_survey"],
            "original_file_video": video_name,
            "surveyor": document["surveyor"],
            "uploader": UPLOADER,
            "kamera": document["kamera"],
            "rute": document["rute"],
            "guid_rute": document["guid_rute"],
            "tanggal_survey": document["tanggal_survey"],
            "tanggal_upload": datetime.now().strftime("%d-%m-%Y %H:%M:%S"),
            "createdAt": datetime.now().strftime("%d-%m-%Y %H:%M:%S"),
            "kilometer": distance_threshold,
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
    
def process_data(FILENAME, uploader):
    global hasil, jarak, distance_threshold
    try:
        # Load data from CSV
        df = pd.read_csv(OUTPUT_CSV)
        
        # Initialize variables
        last_lat, last_lon = None, None
        distance_threshold = 0.3  # km
        filtered_data = []
        frame_counter = 0
        jarak = 0
        hasil = 0  # Reset hasil counter
        
        for i, row in df.iterrows():
            try:
                current_lat = float(row['lat'])
                current_lon = float(row['lon'])
                
                if last_lat is not None and last_lon is not None:
                    distance = haversine(last_lon, last_lat, current_lon, current_lat)
                    if distance >= distance_threshold:
                        timestamp = parser.isoparse(row['time'])
                        current_date = datetime.now().strftime('%d%m%Y')
                        filename = os.path.basename(FILENAME)
                        frame_filename = f"{filename}_{current_date}_{frame_counter}.jpg"
                        frame_counter += 1
                        jarak += round(distance, 2)
                        
                        filtered_data.append([current_lat, current_lon, timestamp.date(), timestamp.time(), jarak])
                        
                        # Prepare and insert data to MongoDB
                        data = prepare_data(current_lat, current_lon, frame_filename, FILENAME, uploader)
                        if data:
                            COLLECTION.insert_one(data)
                            hasil += 1
                        
                        last_lat, last_lon = current_lat, current_lon
                else:
                    last_lat, last_lon = current_lat, current_lon
            except Exception as e:
                print(f"Error processing row {i}: {e}")
                continue
        
        # Save filtered data to CSV
        if filtered_data:
            filtered_df = pd.DataFrame(filtered_data, columns=['lat', 'lon', 'date', 'time', 'distance'])
            filtered_df.to_csv(FILTERED_CSV, index=False)
            print(f"Filtered coordinates have been saved to {FILTERED_CSV}")
            print(f"Total points processed: {hasil}")
        else:
            print("No valid data points found to process")
            
    except Exception as e:
        print(f"An error occurred while processing data: {e}")
        raise  # Re-raise the exception to handle it in the calling function

def upload_to_ftp(local_file, ftp_path):
    global ftp
    try:
        if not ftp:
            raise Exception("FTP connection not established")
            
        with open(local_file, 'rb') as file:
            ftp_path = ftp_path.replace("\\", "/")
            ftp.storbinary(f"STOR {ftp_path}", file)
        print(f"Uploaded {local_file} to FTP server as {ftp_path}")
    except Exception as e:
        print(f"An error occurred while uploading to FTP: {e}")
        raise  # Re-raise the exception to handle it in the calling function

def extract_frame(video_path, video_name):  
    global ftp
    try:
        video_clip = VideoFileClip(video_path)
        if not os.path.isdir(DATA_FOLDER):
            os.mkdir(DATA_FOLDER)

        step = distance_threshold*140
        current_duration = 0
        jumlah = 0
        counter = 0

        # Coba koneksi FTP dengan timeout yang lebih lama
        try:
            ftp = FTP(timeout=300)  # Increase timeout to 5 minutes
            ftp.connect(FTP_SERVER, FTP_PORT)
            ftp.login(FTP_USER, FTP_PASS)
            ftp.set_pasv(True)
            ftp.cwd(FTP_TARGET_FOLDER)
        except Exception as e:
            print(f"FTP Connection Error: {e}")
            return

        while True:
            try:
                current_date = datetime.now().strftime('%d%m%Y')
                frame_filename = os.path.join(DATA_FOLDER, f"{video_name}_{current_date}_{counter}.jpg")
                counter += 1
                
                video_clip.save_frame(frame_filename, current_duration)
                jumlah += 1
                
                upload_to_ftp(frame_filename, os.path.join(FTP_TARGET_FOLDER, os.path.basename(frame_filename)))
                os.remove(frame_filename)

                if jumlah >= hasil:
                    break
                current_duration += step
            except Exception as e:
                print(f"Error processing frame: {e}")
                continue

    except Exception as e:
        print(f"An error occurred: {e}")

    finally:
        try:
            if ftp:
                ftp.quit()
        except:
            pass
        MONGO_CLIENT.close()


@app.post("/upload/")
async def upload_video(
    file: UploadFile = File(...),
    uploader: str = Form(...),  # ← ini untuk menangkap input uploader
    # route: str = Form(...)       # ← jika kamu ingin rute juga dikirim
):
    video_path = os.path.join(UPLOAD_FOLDER, file.filename)
    video_name = os.path.splitext(file.filename)[0]
    video_ext = os.path.splitext(file.filename)

    with open(video_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    # Cetak uploader dan rute (bisa juga disimpan ke MongoDB, CSV, dll.)
    print(f"Uploader: {uploader}")
    # print(f"Rute: {route}")

    # Ekstrak data GPS ke file CSV
    try:
        extract_and_process_gpx(video_path)
        process_data(video_name, uploader)
        extract_frame(video_path, video_name)
    except Exception as e:
        print(f"Failed to process: {e}")
        return {"message": "Failed to process"}

    # Buat folder untuk simpan frame
    frame_folder = os.path.join(UPLOAD_FOLDER, video_name)

    return {
        "filename": file.filename,
        "uploader": uploader,
        # "route": route,
        "message": "Upload successful",
        "frame_folder": frame_folder,
        "gps_data_csv": OUTPUT_CSV
    }

# @app.get("/getrute")
# async def get_rute():
#     rute_data = []
#     for data in findcollection.find():
#         rute_data.append({
#             "rute": data["rute"],
#             "guid_rute": data["guid_rute"]
#         })
#     print(rute_data)
#     return {
#         "rute_data": rute_data
#     }
