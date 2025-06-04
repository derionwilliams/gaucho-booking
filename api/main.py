import os

import psycopg
from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

load_dotenv()

db_host = os.getenv("DB_HOST", "")
db_port = os.getenv("DB_PORT", "")
db_user = os.getenv("DB_USER", "")
db_password = os.getenv("DB_PASSWORD", "")
db_database = os.getenv("DB_DATABASE", "")
db_sslmode = os.getenv("DB_SSLMODE", "")

app = FastAPI()

origins = ["http://localhost:5173"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

connection = psycopg.connect(
    f"user={db_user} password={db_password} host={db_host} port={db_port} sslmode={db_sslmode} dbname={db_database}"
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
        with connection.cursor() as cursor:
            opportunity_sql = """
            CREATE TABLE IF NOT EXISTS opportunity (
                opportunity_id VARCHAR(36) PRIMARY KEY,
                last_updated TIMESTAMP
            )
            """

            job_sql = """
            CREATE TABLE IF NOT EXISTS job (
                job_number VARCHAR(8) PRIMARY KEY,
                opportunity_id VARCHAR(36) NOT NULL,
                service_date DATE,
                truck_count INT,
                crew_count INT,
                FOREIGN KEY (opportunity_id)
                    REFERENCES opportunity(opportunity_id)
                    ON DELETE CASCADE
            )
            """

            pricing_sql = """
            CREATE TABLE IF NOT EXISTS price (
                id SERIAL PRIMARY KEY,
                name VARCHAR(20),
                hourly_rate INT,
                trip_charge INT
            )
            """

            schedule_sql = """
            CREATE TABLE IF NOT EXISTS schedule (
                id SERIAL PRIMARY KEY,
                max_trucks INT
            )
            """

            cursor.execute(opportunity_sql)
            cursor.execute(job_sql)
            cursor.execute(pricing_sql)
            cursor.execute(schedule_sql)

    return {"message": "tables created"}


@app.get("/list-jobs")
async def list_jobs():
    return {"job_numbers": booked_job_numbers, "length": len(booked_job_numbers)}


def init_jobs():
    # get the oppID, job numbers and dates, pricing
    return


def find_config_from_pricing():
    return


def get_availability():
    return


def override_availability():
    return


def process_payment():
    return


def book_job():
    return


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
