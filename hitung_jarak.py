import pandas as pd
import math
import os
from datetime import datetime
from dateutil import parser

# ==== Konfigurasi ====
INPUT_CSV = "input.csv"         # File input GPS
FILTERED_CSV = "filtered.csv"   # Output hasil filter
VIDEO_FILENAME = "GX010166.mp4" # Nama video untuk penamaan frame
distance_threshold = 0.025      # Threshold jarak dalam kilometer (25 meter)

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
def filter_gps_points():
    try:
        df = pd.read_csv(INPUT_CSV)
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

                        frame_filename = f"{os.path.splitext(VIDEO_FILENAME)[0]}_{datetime.now().strftime('%d%m%Y')}_{frame_counter}.jpg"
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

# === Jalankan ===
if __name__ == "__main__":
    filter_gps_points()
