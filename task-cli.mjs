#!/usr/bin/env node

import { allowOptions } from './utils/util.mjs';
import { tasks as taskAll, createTask, deleteTask, updateDescriptionTask, updateStatusTask } from './helpers/crudHelper.mjs';


async function createJson() {

  let tasks = await taskAll

  const option = process.argv[2]
  const args = process.argv.slice(3);

  try {
    const validate = allowOptions.includes(option)

    if (!validate) {
      console.log(`El comando "${option ?? ''}" es incorrecto, revisa la lista`)
      return
    }

    if (option === 'list') {
      const filterTask = args[0]
      const joinArgs = args.join(' ')
      const fullOption = `${option} ${joinArgs}`

      if (joinArgs === '') {
        if(taskAll.length === 0){
          console.log('No se cuenta con tareas a mostrar');
          return
        }
        console.log(taskAll)
        return
      }

      if (fullOption) {
        const validate = allowOptions.includes(fullOption)

        if (!validate) {
          console.log(`El comando "${fullOption}" es incorrecto, revisa la lista`)
          return
        }

        const listAllTask = tasks.filter(task => task.status === filterTask)

        if(listAllTask.length === 0) {
          console.log(`No se cuenta con tareas marcadas en '${joinArgs}' para mostrar`);
          return
        }
        console.log(listAllTask);
        return
        
      }
    }

    if (option === 'add') {
      createTask(args)
    } else {
      if (!isNaN(args[0])) {
        const id = +args[0]
        const newValue = args[1]

        if (option === 'update') await updateDescriptionTask({ id, description: newValue })

        if (option === 'delete') await deleteTask({ id })

        if (
            option === 'mark-in-progress' ||
            option === 'mark-done'
          ) {
          const status = (option === 'mark-done') 
            ? 'done' 
            : 'in-progress'
          await updateStatusTask({ id, status })
        }
      }

    }
  } catch (error) {
    console.log(error)
  }
}

createJson()