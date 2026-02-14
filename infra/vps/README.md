# Infra VPS (Ubuntu 24.04)

Infraestructura mínima para el MVP de Dental Concierge.

## Componentes

- `systemd/dental-backend.service`: servicio del backend Node.
- `nginx/dental-concierge.conf`: reverse proxy HTTP/HTTPS.
- `scripts/deploy.sh`: despliegue estándar.
- `scripts/rollback.sh`: rollback a ref estable.
- `scripts/backup.sh`: backup básico de runtime/config.
- `scripts/healthcheck.sh`: validación de salud post-deploy.

## Preparación del servidor

```bash
sudo apt update && sudo apt upgrade -y
sudo apt install -y nginx git curl build-essential
curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
sudo apt install -y nodejs
sudo npm install -g pnpm
```

## Estructura recomendada

- Código: `/opt/dental-concierge`
- Env backend: `/opt/dental-concierge/apps/backend/.env`
- Logs: `journald` (`journalctl -u dental-backend`)

## Primer deploy

```bash
cd /opt/dental-concierge
cp apps/backend/.env.example apps/backend/.env
# editar secrets
bash infra/vps/scripts/deploy.sh
```
