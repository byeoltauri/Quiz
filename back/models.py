import sqlite3

DB_PATH = 'database.db'

def init_db():
    with sqlite3.connect(DB_PATH) as conn:
        c = conn.cursor()
        c.execute('''
        CREATE TABLE IF NOT EXISTS problems (
            id INTEGER PRIMARY KEY,
            question TEXT,
            answer TEXT,
            image_filename TEXT,
            link TEXT
        )''')
        c.execute('''
        CREATE TABLE IF NOT EXISTS main_image (
            id INTEGER PRIMARY KEY,
            filename TEXT
        )''')
        conn.commit()

def save_main_image(filename):
    with sqlite3.connect(DB_PATH) as conn:
        c = conn.cursor()
        c.execute("DELETE FROM main_image")
        c.execute("INSERT INTO main_image (filename) VALUES (?)", (filename,))
        conn.commit()

def get_main_image():
    with sqlite3.connect(DB_PATH) as conn:
        c = conn.cursor()
        c.execute("SELECT filename FROM main_image ORDER BY id DESC LIMIT 1")
        row = c.fetchone()
    return row[0] if row else None

def save_problem(problem_id, question, answer, image_filename, link):
    with sqlite3.connect(DB_PATH) as conn:
        c = conn.cursor()
        c.execute('''
            REPLACE INTO problems (id, question, answer, image_filename, link)
            VALUES (?, ?, ?, ?, ?)
        ''', (problem_id, question, answer, image_filename, link))
        conn.commit()

def get_problem(problem_id):
    with sqlite3.connect(DB_PATH) as conn:
        c = conn.cursor()
        c.execute("SELECT question, answer, image_filename, link FROM problems WHERE id=?", (problem_id,))
        return c.fetchone()
