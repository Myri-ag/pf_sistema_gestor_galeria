# PF_GALERIA - Arquitectura de Microservicios

Este repositorio contiene una solución para la gestión de una galería de arte física, basada en una **Arquitectura de Microservicios**. Cada componente está aislado en su propio contenedor y orquestado para funcionar tanto de forma local como en la nube.

<br>
<br>
---

## Requisitos Previos

Antes de comenzar, asegúrate de tener instalado lo siguiente en tu equipo:

* **Node.js** (Versión 16 o superior)
* **Docker & Docker Desktop**
* **Git**
* **Kubectl** (Opcional, solo para despliegue en clúster)

<br>
<br>
---

## Despliegue Local (Docker Compose)

La manera más rápida de ver el proyecto funcionando en tu máquina es utilizando **Docker Compose**.

1. **Clonar el repositorio:**
   ```bash
   git clone [https://github.com/Myri-ag/pf_sistema_gestor_galeria.git](https://github.com/Myri-ag/pf_sistema_gestor_galeria.git)
   cd galeria-devops

<br>

2. **Levantar los servicios con Docker:**
   ```bash
   docker-compose up --build

<br>

3. **Acceder a los servicios localmente:**
   
Una vez que los contenedores estén en ejecución, abre tu navegador en:

* **Artistas:** http://localhost:3000
* **Obras:** http://localhost:4000
* **Visitantes:** http://localhost:5000

<br>

4. **Despliegue en la Nube (DigitalOcean):**

El proyecto se encuentra actualmente desplegado en un clúster de Kubernetes. Puedes visualizarlo en vivo en las siguientes direcciones:

* **Link Artistas:** http://45.55.98.199
* **Link Obras:** http://129.212.147.117
* **Link Visitantes:** http://174.138.117.102

<br>
<br>
