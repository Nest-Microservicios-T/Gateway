# Client Gateway

Gateway de cliente para microservicios.

## Requisitos

- Node.js
- Docker

## Instalación

```bash
npm install
```

## Variables de Entorno

Crear un archivo `.env` en la raíz del proyecto:

```env
PORT=3000
NATS_SERVERS=nats://localhost:4222
```

## Desarrollo

```bash
npm run start:dev
```

## NATS Server con Docker

### Iniciar NATS

```bash
docker run -d --name nats-server -p 4222:4222 -p 8222:8222 nats
```

### Detener NATS

```bash
docker stop nats-server
```


## Build

```bash
npm run build
```

## Ejecución en Producción

```bash
npm run start
```
