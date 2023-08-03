import sqlite3
import json
import time

def get_last_messages():
    con = sqlite3.connect("messages.db")
    cur = con.cursor()
    sql = "SELECT message FROM Messages ORDER BY id DESC LIMIT 5"

    cur.execute(sql)
    rows = cur.fetchall()
    cur.close()
    con.close()

    return rows


def save_message(message, sender):
    con = sqlite3.connect('messages.db')
    cur = con.cursor()

    message = {"data": message, "sender": sender}

    sql = "INSERT INTO Messages (message) VALUES (?)"

    cur.execute(
        sql,
        (json.dumps(message),)
    )

    con.commit()
    cur.close()
    con.close()

def get_msgs():
    con = sqlite3.connect('messages.db')
    cur = con.cursor()

    sql = "SELECT message FROM Messages ORDER BY id DESC LIMIT 5"

    cur.execute(sql)
    
    rows = cur.fetchall()
    cur.close()
    con.close()
    return rows

def save_chroma(user, server):
    current_time = int(time.time())
    message = f"user: {user} Assistant: {server}"
    collection.add(documents=message, ids=f"{current_time}_id")
