# AG-Studio: Gestión de Galería de Arte con Microservicios

Este proyecto es una plataforma de gestión para una galería de arte, desarrollada bajo una arquitectura de **microservicios**, utilizando **Node.js**, **MongoDB** y desplegada en la nube mediante **Docker** y **Kubernetes (DigitalOcean)**.

## Arquitectura del Sistema

El sistema se divide en tres microservicios independientes que se comunican a través de una red orquestada:

* **Artistas Service:** Gestión de perfiles y biografía de autores.
* **Obras Service:** Inventario de piezas de arte y detalles técnicos.
* **Visitantes Service:** Registro y control de acceso de público.

Cada servicio cuenta con su propia lógica de negocio y se conecta a una instancia centralizada de **MongoDB** dentro del clúster de Kubernetes.

---
<br>

## Tecnologías Utilizadas

* **Backend:** Node.js / Express.js
* **Base de Datos:** MongoDB (NoSQL)
* **Contenerización:** Docker & Docker Compose
* **Orquestación:** Kubernetes (K8s)
* **Cloud Hosting:** DigitalOcean (Nodes & Load Balancers)
* **Frontend:** HTML5, CSS, Bootstrap 5

---
<br>

## Despliegue

### Requisitos previos
* Docker instalado.
* Kubectl configurado con acceso al clúster.

<br>

### Ejecución en Local (Desarrollo)
Para levantar el entorno completo de desarrollo con un solo comando:

```bash
docker-compose up --build
````
<br>

### La aplicación estará disponible en:

* **Artistas:** http://localhost:3000
* **Obras:** http://localhost:4000
* **Visitantes:** http://localhost:5000

<br>

### Despliegue en la Nube (Producción)
Para aplicar la configuración en el clúster de DigitalOcean:

```bash
kubectl apply -f k8s/mongodb.yaml
kubectl apply -f k8s/artistas.yaml
kubectl apply -f k8s/obras.yaml
kubectl apply -f k8s/visitantes.yaml
````

--- 
<br>

### Despliegue en la Nube (DigitalOcean):

El proyecto se encuentra actualmente desplegado en un clúster de Kubernetes. Puedes visualizarlo en vivo en las siguientes direcciones:

* **Link Artistas:** http://45.55.98.199
* **Link Obras:** http://129.212.147.117
* **Link Visitantes:** http://174.138.117.102

<br>
<br>

