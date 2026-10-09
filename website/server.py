"""Public website - http://127.0.0.1:5001"""
import json, os, sys, re
from http.server import ThreadingHTTPServer, SimpleHTTPRequestHandler
sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)), '..'))
import db
HERE = os.path.dirname(os.path.abspath(__file__))

class H(SimpleHTTPRequestHandler):
    def __init__(self, *a, **k): super().__init__(*a, directory=HERE, **k)
    def do_POST(self):
        if self.path != '/api/quote': return self.send_error(404)
        try:
            d = json.loads(self.rfile.read(int(self.headers.get('Content-Length', 0))))
            f = {k: str(d.get(k, '')).strip()[:2000] for k in
                 ('name', 'company', 'email', 'phone', 'product', 'quantity', 'specs', 'message')}
            if not f['name'] or not re.match(r'[^@\s]+@[^@\s]+\.[^@\s]+$', f['email']) or not f['product']:
                raise ValueError('Name, valid email and product are required.')
            c = db.conn()
            cur = c.execute("INSERT INTO quotes(name,company,email,phone,product,quantity,specs,message) VALUES(?,?,?,?,?,?,?,?)", tuple(f.values()))
            c.commit(); code, out = 200, {'ok': True, 'id': cur.lastrowid}
        except Exception as e:
            code, out = 400, {'ok': False, 'error': str(e)}
        b = json.dumps(out).encode()
        self.send_response(code); self.send_header('Content-Type', 'application/json')
        self.send_header('Content-Length', str(len(b))); self.end_headers(); self.wfile.write(b)

if __name__ == '__main__':
    P = int(os.environ.get('PORT', 5001)); host = os.environ.get('HOST', '127.0.0.1')
    print(f'Website running at http://{host}:{P}', flush=True)
    ThreadingHTTPServer((host, P), H).serve_forever()
