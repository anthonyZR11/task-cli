# CLI PARA CREAR LISTA DE TAREAS
***

En este pequeño proyecto utilizo nodeJs para crear una CLI que se encarga de crear mediante ciertos comando una lista de tareas, en la cual podemos crear, editar, eliminar e incluso actualizar el estado de esas tareas.

Al realizar alguna de la opciones el sistema validara la existe del archivo, de lo contrario procedera a crear un archivo JSON, en el cual se gestionaran todas las tareas.

Lista de comando disponibles:

| COMANDOS         | DESCRIPCIÓN                               |
| ---------------- | ----------------------------------------- |
| add              | Crear una tarea nueva                     |
| update           | Actualiza la descripción tarea            |
| delete           | Elimina una tarea                         |
| mark-in-progress | Cambia el estado a `En progreso`          |
| list             | Lista todas las tareas                    |
| list todo        | Lista las tareas con estado `Por hacer`   |
| list in-progress | Lista las tareas con estado `En progreso` |
| mark-done        | Cambia el estado a `Completado`           |


## CONFIGURACIÓN

Hay 3 FORMAS de poder usar la CLI

#### FORMA 1
En node usando la ejecucíon por defecto.

```bash 
node task-cli.mjs list
```
#### FORMA 2
Crear un archivo .bat que contenga la ejecucion del archivo node y agregarlo al path de las variables de entorno del sistema. Con esto podremos ejecutar el archivo con el siguiente comando

```bash
@echo off
node "C:\xampp\htdocs\personal\task-cli\task-cli.mjs" %*
```
- Guardamos en archivo en una ruta de preferencia.
- Click en el boton de windows y buscar `variables de entorno del sistema`
- Click en path y click en editar
- agregar la ruta donde se guardo el archivo `.bat` - ejemplo:  `C:\Program Files\scripts`

Con estos pasos podriamos abrir el powerShell y ejecutar el comando de la siguiente forma

```bash
task-cli list 
```

#### FORMA 3

Si usan git y el comando no les funciona en esa terminal pueden hacer lo siguiente:

- Abrir la terminal
- posicionarse en la ruta base con:
```bash
cd ~
```
- Luego abrir el archivo ~/.bashrc
```bash
nano ~/.bashrc
```
- Ahora pegar este codigo dentro del archivo
```bash
alias task-cli='/c/xampp/htdocs/personal/task-cli/task-cli.mjs'
```
- ctrl + o y ctrl + x para guardar y salir
- Luego ejecutar el siguente comando para refrescar
```bash
source ~/.bashrc
```
Con esto ya podriamos ejecutar los comando anteponiendo `task-cli` a los argumentos y opciones que pasaremos.
```bash
task-cli list 
```
### EJEMPLOS

```
# Añadir nueva tarea
task-cli add "Hola mundo"
# Output: Se añadio nueva tarea: ID-1

# Actualizar y eliminar tareas
task-cli update 1 "Hola mundo actualizado"
task-cli delete 1

# Actualizar estado en progreso o completado
task-cli mark-in-progress 1
task-cli mark-done 1

# Listar todas las tareas
task-cli list

# Listarar tareas por estado
task-cli list done
task-cli list todo
task-cli list in-progress
```

> [!Note]
> Los valores numeros en los comandos son los identificadores de cada tarea