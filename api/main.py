import pymysql.cursors
from fastapi import FastAPI
from pymysql import NULL

app = FastAPI()

# database connection
connection = pymysql.connect(
    host="204.197.244.46",
    user="summitmoving_gbadmin",
    password="NneOIL5sF,;",
    database="summitmoving_gauchobooking",
    charset="utf8mb4",
    cursorclass=pymysql.cursors.DictCursor,
)


@app.get("/")
async def root():
    return {"message": "Hello World"}


@app.get("/items/{item_id}")
async def read_item(item_id: int):
    return {"item_id": item_id}


@app.get("/init-tables")
async def init_tables():

    with connection:
        try:
            with connection.cursor() as cursor:

                opportunity_sql = """CREATE TABLE opportunity(
                    opportunity_id VARCHAR(36) PRIMARY KEY,
                    last_updated DATETIME
                )"""

                job_sql = """CREATE TABLE job(
                    job_number VARCHAR(8) PRIMARY KEY,
                    opportunity_id VARCHAR(36) NOT NULL,
                    service_date DATETIME,
                    truck_count INT,
                    crew_count INT,
                    FOREIGN KEY (opportunity_id)
                        REFERENCES opportunity(opportunity_id)
                        ON DELETE CASCADE
                )"""

                pricing_sql = """CREATE TABLE price(
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    name VARCHAR(20),
                    hourly_rate INT,
                    trip_charge INT
                )"""

                schedule_sql = """CREATE TABLE schedule(
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    max_trucks INT
                )"""

                cursor.execute(opportunity_sql)
                cursor.execute(job_sql)
                cursor.execute(pricing_sql)
                cursor.execute(schedule_sql)

        finally:
            connection.commit()
        return {"tables created"}


@app.get("/list-jobs")
async def list_jobs():
    return {"job_numbers": booked_job_numbers, "length": len(booked_job_numbers)}


booked_job_numbers = [
    52790,
    51936,
    52651,
    51522,
    53429,
    52523,
    53291,
    51241,
    49546,
    51171,
    52568,
    53514,
    53618,
    52053,
    52974,
    53841,
    53352,
    53443,
    53494,
    52531,
    52896,
    53529,
    52619,
    51420,
    46475,
    53000,
    52846,
    52310,
    52911,
    51627,
    53922,
    53554,
    51790,
    52880,
    51053,
    51190,
]
