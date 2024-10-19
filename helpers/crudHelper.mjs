import { fileName } from "./config.mjs"
import { formatterDate } from "../utils/util.mjs"
import { readFile, writeFile } from 'fs/promises'
import { createInterface } from "node:readline/promises"



const askConfirmation = async () => {
  const rl = createInterface({
    input: process.stdin,
    output: process.stdout
  })

  const answer = await rl.question('¿Deseas seguir? (s/n): ');
  rl.close(); // Cierra la interfaz de readline después de recibir la respuesta

  if (answer.trim().toLowerCase() === 's') {
    console.log('Acción confirmada, continuando...');
    return true; // Devuelve true si la respuesta es 's'
  } else if (answer.trim().toLowerCase() === 'n') {
    console.log('Acción cancelada.');
    return false; // Devuelve false si la respuesta es 'n'
  } else {
    console.log('Entrada no válida. Por favor, ingresa "s" para sí o "n" para no.');
    return null; // Puedes manejarlo como una respuesta no válida
  }
}

const existTask = async (id) => {
  const task = tasks.find(task => task.id === id)
  if (!task) return null
  return task
}

async function readFileJson(fileName) {
  try {
    console.log(`Buscando archivo en: ${fileName}`);
    const data = await readFile(fileName, 'utf-8')

    if (data !== '') return JSON.parse(data)
    return []

  } catch (error) {
    if (error.code === 'ENOENT') {
      console.log('Archivo no encontrado. Creando archivo...');
      await writeFile(fileName, JSON.stringify([]));
      return [];  // Retornamos un array vacío
    } else {
      // Si es otro tipo de error, lo lanzamos
      console.log(error);
      throw new Error(error);
    }
  }
}

export const tasks = await readFileJson(fileName)

export const createTask = async (args) => {
  const description = args[0]

  if (!isNaN(description)) {
    console.log('La descripcion debe ser de tipo texto')
    return
  }

  const id = tasks.length ? tasks[tasks.length - 1].id + 1 : 1
  const task = {
    id,
    description,
    status: "todo",
    createdAt: formatterDate,
    updatedAt: formatterDate
  }

  tasks.push(task)

  await writeFile(fileName, JSON.stringify(tasks, null, 2));

  console.log('Se añadio nueva tarea: ID-' + task.id);
}

export const updateDescriptionTask = async ({ id, description }) => {
  const task = await existTask(id)

  if (!task) {
    console.log(`No se encontro la tarea ID-${id} a actulizar`);
    return
  }

  task.description = description
  task.updatedAt = formatterDate

  await writeFile(fileName, JSON.stringify(tasks, null, 2));
  console.log('Se actualizo la descripcion del ID-' + id);
}

export const deleteTask = async ({ id }) => {
  const task = await existTask(id)

  if (!task) {
    console.log(`No se encontro la tarea ID-${id} para su eliminación`);
    return
  }

  const ask = await askConfirmation()

  if (!ask) return

  const tasksFilter = tasks.filter((task) => task.id !== id)

  await writeFile(fileName, JSON.stringify(tasksFilter, null, 2));
  console.log('Se elimino la tarea ID-' + id);
}

export const updateStatusTask = async ({ id, status }) => {
  const task = await existTask(id)

  if (!task) {
    console.log(`No se encontro la tarea ID-${id} a actulizar`);
    return
  }

  task.status = status
  task.updatedAt = formatterDate

  await writeFile(fileName, JSON.stringify(tasks, null, 2));
  console.log('Se actualizo el estado del ID-' + id);
}