import asyncio
import os
from datetime import datetime

import httpx
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

smartmoving_provider_url = os.getenv("SMARTMOVING_PROVIDER_URL", "null")
smartmoving_api_key = os.getenv("SMARTMOVING_API_KEY", "null")
smartmoving_headers = {
    "Cache-Control": "no-cache",
    "x-api-key": smartmoving_api_key,
}
smartmoving_lead_headers = {"Content-type": "application/json"}

app = FastAPI()

origins = ["http://localhost:5173", "https://summitmovinghouston.com"]

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


@app.get("/list-jobs")
async def list_jobs():
    return {"job_numbers": booked_job_numbers, "length": len(booked_job_numbers)}


@app.get("/test-job-data")
async def get_test_job():
    async with httpx.AsyncClient() as client:
        result = await client.get(
            "https://api-public.smartmoving.com/v1/api/opportunities/quote/52790?IncludeTripInfo=true",
            headers=smartmoving_headers,
        )
        return result.json()


@app.get("/init/jobs")
async def init_jobs():
    truck_count = 1
    jobs_data = []
    date_format = "%Y%m%d"
    ignored_job_types = {3, 102, 118, 103, 104, 105, 106, 110, 121, 122, 123, 124}

    async with httpx.AsyncClient() as client:
        tasks = [get_opportunity_details(client, qn) for qn in [52790]]
        results = await asyncio.gather(*tasks)

        with connection.cursor() as cursor:
            for result in results:
                opportunity_id = result.get("id", "")
                volume = result.get("volume", 1450)
                if volume > 1480:
                    truck_count = 2
                if volume > 3500:
                    truck_count = 3

                cursor.execute(
                    """
                    INSERT INTO opportunity
                    (opportunity_id, last_updated, truck_count)
                    VALUES (%s, %s, %s)
                    """,
                    (opportunity_id, datetime.now(), truck_count),
                )

                for job in result.get("jobs", []):
                    if job.get("type", 1) in ignored_job_types:
                        continue
                    job_number = job.get("jobNumber")
                    service_date = job.get("jobDate")
                    service_date_obj = datetime.strptime(
                        str(service_date), date_format
                    ).date()
                    jobs_data.append((job_number, opportunity_id, service_date_obj))

                cursor.executemany(
                    """
                    INSERT INTO job
                    (job_number, opportunity_id, service_date)
                    VALUES (%s, %s, %s)""",
                    jobs_data,
                )
            connection.commit()

    return {"message": "job data persisted", "results": results, "jobs_data": jobs_data}


async def get_opportunity_details(client, quoteNumber):
    response = await client.get(
        f"https://api-public.smartmoving.com/v1/api/opportunities/quote/{quoteNumber}",
        headers=smartmoving_headers,
    )
    return response.json()


@app.get("/list-job-types")
async def get_job_types():
    async with httpx.AsyncClient() as client:
        response = await client.get(
            "https://api-public.smartmoving.com/v1/api/service-types",
            headers=smartmoving_headers,
        )
        return response.json()


@app.get("/availability")
async def get_availability():
    # for dates from today onwards, get a dictionary of all days with booked jobs
    # use the truck limit to determine how many more jobs can be booked for the day
    # return the number of available slots
    today = datetime.today().date()
    with connection.cursor() as cursor:
        cursor.execute(
            f"SELECT * FROM job WHERE CAST(service_date AS DATE) > %s", (today,)
        )
        rows = cursor.fetchall()

    async with httpx.AsyncClient() as client:
        tasks = [get_pricing(client, opp_id, job_no) for (opp_id, job_no, _) in rows]
        pricing = await asyncio.gather(*tasks)
        print(rows)
        print(pricing)
    return pricing


def override_single_availability():
    # set a new availability number for this day
    return


def update_future_truck_limit():
    # set a new truck limit for all future dates
    return


async def get_pricing(client, opportunity_id, job_number):
    # get the hourly rate and trip charge for the selected day
    res = await client.get(
        f"https://api-public.smartmoving.com/v1/api/premium/opportunities/{opportunity_id}/jobs/{job_number}",
        headers=smartmoving_headers,
    )
    res.raise_for_status()
    print(res)
    return res.json


def update_pricing():
    # update the pricing for the selected day
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
