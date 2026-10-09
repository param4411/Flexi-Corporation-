"""Admin panel - http://127.0.0.1:5002   (login: admin / felix@123, change via env ADMIN_USER / ADMIN_PASS)"""
import json, os, sys, secrets, csv, io
from http.server import ThreadingHTTPServer, SimpleHTTPRequestHandler
from urllib.parse import urlparse
sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)), '..'))
import db
HERE = os.path.dirname(os.path.abspath(__file__))
USER = os.environ.get('ADMIN_USER', 'admin'); PASS = os.environ.get('ADMIN_PASS', 'felix@123')
TOKENS = set()

class H(SimpleHTTPRequestHandler):
    def __init__(self, *a, **k): super().__init__(*a, directory=HERE, **k)
    def send(self, code, obj, ctype='application/json', extra=None):
        b = obj if isinstance(obj, bytes) else json.dumps(obj).encode()
        self.send_response(code); self.send_header('Content-Type', ctype)
        for k, v in (extra or {}).items(): self.send_header(k, v)
        self.send_header('Content-Length', str(len(b))); self.end_headers(); self.wfile.write(b)
    def authed(self): return self.headers.get('X-Token') in TOKENS
    def body(self): return json.loads(self.rfile.read(int(self.headers.get('Content-Length', 0))) or '{}')
    def do_GET(self):
        u = urlparse(self.path)
        if not u.path.startswith('/api/'): return super().do_GET()
        if not self.authed(): return self.send(401, {'error': 'unauthorized'})
        c = db.conn()
        if u.path == '/api/quotes':
            return self.send(200, [dict(r) for r in c.execute("SELECT * FROM quotes ORDER BY id DESC")])
        if u.path == '/api/export':
            o = io.StringIO(); w = csv.writer(o)
            rows = c.execute("SELECT * FROM quotes ORDER BY id DESC").fetchall()
            w.writerow(rows[0].keys() if rows else ['id'])
            for r in rows: w.writerow(list(r))
            return self.send(200, o.getvalue().encode(), 'text/csv', {'Content-Disposition': 'attachment; filename=quotes.csv'})
        self.send(404, {})
    def do_POST(self):
        if self.path == '/api/login':
            d = self.body()
            if d.get('user') == USER and d.get('password') == PASS:
                t = secrets.token_hex(16); TOKENS.add(t); return self.send(200, {'token': t})
            return self.send(401, {'error': 'Invalid credentials'})
        if not self.authed(): return self.send(401, {'error': 'unauthorized'})
        c = db.conn(); d = self.body()
        if self.path == '/api/update':
            c.execute("UPDATE quotes SET status=?, notes=? WHERE id=?", (d['status'], d.get('notes', ''), d['id'])); c.commit()
            return self.send(200, {'ok': True})
        if self.path == '/api/delete':
            c.execute("DELETE FROM quotes WHERE id=?", (d['id'],)); c.commit()
            return self.send(200, {'ok': True})
        self.send(404, {})

if __name__ == '__main__':
    P = int(os.environ.get('PORT', 5002)); print(f'Admin panel running at http://127.0.0.1:{P}', flush=True)
    ThreadingHTTPServer(('127.0.0.1', P), H).serve_forever()
