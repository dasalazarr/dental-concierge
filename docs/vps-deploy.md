# VPS Deploy (Ubuntu 24.04)

## Supuestos

- Servidor Ubuntu 24.04 accesible por SSH.
- Dominio apuntando al VPS.
- Usuario con permisos sudo.

## Instalación base

```bash
sudo apt update && sudo apt upgrade -y
sudo apt install -y nginx git curl build-essential
curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
sudo apt install -y nodejs
sudo npm install -g pnpm
```

## Directorio aplicación

```bash
sudo mkdir -p /opt/dental-concierge
sudo chown -R $USER:$USER /opt/dental-concierge
git clone <repo-url> /opt/dental-concierge
cd /opt/dental-concierge
pnpm install
pnpm --filter @dental/backend build
```

## Service systemd

```bash
sudo cp infra/vps/systemd/dental-backend.service /etc/systemd/system/
sudo systemctl daemon-reload
sudo systemctl enable dental-backend
sudo systemctl start dental-backend
sudo systemctl status dental-backend
```

## Nginx reverse proxy

```bash
sudo cp infra/vps/nginx/dental-concierge.conf /etc/nginx/sites-available/dental-concierge
sudo ln -s /etc/nginx/sites-available/dental-concierge /etc/nginx/sites-enabled/dental-concierge
sudo nginx -t
sudo systemctl reload nginx
```

## TLS con certbot

```bash
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d api.tu-dominio.com
```

## Comandos de operación

- Deploy: `infra/vps/scripts/deploy.sh`
- Rollback: `infra/vps/scripts/rollback.sh`
- Healthcheck: `infra/vps/scripts/healthcheck.sh`
