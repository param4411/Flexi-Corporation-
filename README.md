# Felix Corporation – Website + Admin Panel
Needs only Python 3.8+ (https://www.python.org/downloads – tick "Add Python to PATH" on Windows).

## Start
- Windows: double-click `start-windows.bat`
- Mac/Linux: run `./start-mac-linux.sh`
- Or in a terminal: `python run_all.py`

The window prints the exact addresses and opens both in your browser.
Normally: Website http://127.0.0.1:5001 · Admin http://127.0.0.1:5002 (login `admin` / `felix@123`).
If a port is already used (for example your old app), the next free port is picked automatically –
use the address printed in the window. Keep that window open while using the sites.

The website homepage includes manufacturing highlights and illustrative stock photography, with separate Products, Process, Capabilities, About Us, and Contact pages linked from the navigation.

## Publish on Render
The `render.yaml` blueprint configures the public website on Render's free web-service plan.

1. Create a **private** GitHub repository and publish this project folder to it. Keep it private because the repository also contains the admin panel source.
2. In Render, choose **New + → Blueprint**, connect the GitHub repository, and apply the `render.yaml` blueprint.
3. Wait for the service status to become **Live**, then open the `onrender.com` URL shown in the Render dashboard.

The quote form endpoint is included, but this free setup uses ephemeral storage: quote records may be lost when the service restarts or redeploys. The admin panel is not included in this public website deployment.

## Photography
Illustrative stock photos are stored locally in `website/images/` and sourced from Pexels under its [license](https://www.pexels.com/license/). Photos are illustrative and may not depict Felix products or facilities.

- `stock-factory.jpg`: Pexels photo 34221997, industrial manufacturing equipment.
- `stock-bulk-bag.jpg`: Pexels photo 36423786, worker handling a bulk bag.
- `stock-cement-sacks.jpg`: Pexels photo 29817952, bagged construction material.
- `stock-plastic-film.jpg`: Pexels photo 7414936, translucent plastic film.
- `stock-sack-worker.jpg`: Pexels photo 4820682, worker handling printed sacks.
- `stock-sewing-floor.jpg`: Pexels photo 17710109, industrial sewing equipment.
- `stock-textile-machine.jpg`: Pexels photo 10328901, textile machine and threads.

Data is stored in SQLite: `data/felix.db`. Change the login with env vars `ADMIN_USER` / `ADMIN_PASS`.
