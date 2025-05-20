import csv
import os
import subprocess

VIDEO_FILE = 'GX010166.mp4'
CSV_FILE = 'filtered.csv'
OUTPUT_DIR = 'frames'

# Gunakan path relatif ke ffmpeg.exe
FFMPEG_CMD = os.path.join('ffmpeg-2025-05-07-git-1b643e3f65-essentials_build', 'bin', 'ffmpeg.exe')

# Buat folder output jika belum ada
if not os.path.exists(OUTPUT_DIR):
    os.makedirs(OUTPUT_DIR)

# Baca dan ekstrak frame berdasarkan timestamp dari CSV
with open(CSV_FILE, newline='') as csvfile:
    reader = csv.DictReader(csvfile)
    for row in reader:
        try:
            timestamp = float(row['timestamp'])
            output_filename = os.path.join(OUTPUT_DIR, f"frame_{timestamp:.3f}.jpg")
            command = [
                FFMPEG_CMD,
                '-ss', str(timestamp),
                '-i', VIDEO_FILE,
                '-frames:v', '1',
                '-q:v', '2',
                output_filename
            ]
            subprocess.run(command, check=True)
            print(f"✅ Frame extracted at {timestamp}s -> {output_filename}")
        except Exception as e:
            print(f"❌ Error extracting frame at {row['timestamp']}s: {e}")
