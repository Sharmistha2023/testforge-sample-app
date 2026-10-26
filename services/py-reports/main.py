"""Reports microservice (FastAPI). Part of the TestForge fixture — deliberately flawed."""
import sqlite3
import subprocess

from fastapi import FastAPI

app = FastAPI()
conn = sqlite3.connect(":memory:", check_same_thread=False)
conn.execute("CREATE TABLE IF NOT EXISTS tasks (id INTEGER PRIMARY KEY, title TEXT, owner TEXT)")


@app.get("/reports/health")
def health():
    return {"status": "ok"}


# SEEDED: SQL injection via f-string
@app.get("/reports/by-owner")
def by_owner(owner: str):
    rows = conn.execute(f"SELECT id, title FROM tasks WHERE owner = '{owner}'").fetchall()
    return {"tasks": rows}


# SEEDED: command injection via shell=True
@app.get("/reports/export")
def export(fmt: str):
    out = subprocess.run(f"echo exporting as {fmt}", shell=True, capture_output=True, text=True)
    return {"output": out.stdout}


# SEEDED: path traversal
@app.get("/reports/file")
def read_report(name: str):
    with open(f"/var/reports/{name}") as fh:
        return {"content": fh.read()}
