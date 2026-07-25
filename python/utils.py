from datetime import datetime
import csv
import os


def get_current_date() -> str:
    return datetime.now().strftime("%Y-%m-%d")


def get_current_time() -> str:
    return datetime.now().strftime("%H:%M:%S")


def create_csv_if_not_exists(csv_file: str) -> None:
    """
    Create attendance CSV with header if it doesn't exist
    or is empty.
    """

    if (
        not os.path.exists(csv_file)
        or os.path.getsize(csv_file) == 0
    ):
        with open(csv_file, "w", newline="") as file:
            writer = csv.writer(file)
            writer.writerow(["Name", "Date", "Time"])


def is_attendance_marked(
    csv_file: str,
    name: str,
    date: str
) -> bool:

    with open(csv_file, "r", newline="") as file:

        reader = csv.reader(file)

        next(reader, None)

        for row in reader:

            if len(row) < 2:
                continue

            if row[0] == name and row[1] == date:
                return True

    return False


def save_attendance(
    csv_file: str,
    name: str,
    date: str,
    time: str
) -> None:

    with open(csv_file, "a", newline="") as file:

        writer = csv.writer(file)

        writer.writerow([name, date, time])