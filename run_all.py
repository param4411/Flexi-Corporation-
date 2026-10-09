"""Starts the website and the admin panel, then opens both in your browser."""
import subprocess, sys, os, socket, time, webbrowser
root = os.path.dirname(os.path.abspath(__file__))

def free_port(p):
    while True:
        with socket.socket() as s:
            if s.connect_ex(('127.0.0.1', p)) != 0: return p   # nothing listening -> free
        p += 1

site_port, admin_port = free_port(5001), None
admin_port = free_port(5002 if site_port != 5002 else 5003)
jobs = []
for folder, port in (('website', site_port), ('admin', admin_port)):
    env = dict(os.environ, PORT=str(port))
    jobs.append(subprocess.Popen([sys.executable, os.path.join(root, folder, 'server.py')], env=env))

time.sleep(1.5)
print('\n==============================================')
print(f'  Website : http://127.0.0.1:{site_port}')
print(f'  Admin   : http://127.0.0.1:{admin_port}   (admin / felix@123)')
print('  Press Ctrl+C to stop both.')
print('==============================================\n', flush=True)
webbrowser.open(f'http://127.0.0.1:{site_port}')
webbrowser.open(f'http://127.0.0.1:{admin_port}')
try:
    for p in jobs: p.wait()
except KeyboardInterrupt:
    for p in jobs: p.terminate()
