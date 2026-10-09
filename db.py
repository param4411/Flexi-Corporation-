import sqlite3, os
DB = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'data', 'felix.db')
def conn():
    os.makedirs(os.path.dirname(DB), exist_ok=True)
    c = sqlite3.connect(DB); c.row_factory = sqlite3.Row
    c.execute("""CREATE TABLE IF NOT EXISTS quotes(
      id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, company TEXT, email TEXT, phone TEXT,
      product TEXT, quantity TEXT, specs TEXT, message TEXT,
      status TEXT DEFAULT 'New', notes TEXT DEFAULT '', created_at TEXT DEFAULT CURRENT_TIMESTAMP)""")
    return c
