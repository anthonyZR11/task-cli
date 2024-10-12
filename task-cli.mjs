import { open } from 'fs/promises'
import { formatterDate, allowOptions } from './utils/util.mjs';
const args = process.argv.slice(2); // Ignorar los primeros dos elementos

async function createJson([option, ...args]) {

  try {

    const validate = allowOptions.includes(option)

    if (!validate) {
      const text = option ?? ''
      console.log(`El comando "${text}" es incorrecto, revisa la lista`)
      return
    }

    const fileName = 'rules.json'
    const file = await open(fileName, 'r')
    const { buffer } = await file.read()

    let dataString = buffer.toString('utf-8').trim()
    let tasks = []

    // Remover caracteres de control invisibles y espacios en blanco innecesarios
    dataString = dataString.replace(/[\u0000-\u001F\u007F]/g, '');
    if (dataString) tasks = JSON.parse(dataString)

    if (option === 'list') {
      const filterTask = args[0]
      const joinArgs = args.join(' ')
      const fullOption = `${option} ${joinArgs}`

      if (joinArgs === '') {
        console.log(tasks)
        return
      }

      if (fullOption) {
        const validate = allowOptions.includes(fullOption)

        if (!validate) {
          console.log(`El comando "${fullOption}" es incorrecto, revisa la lista`)
          return
        }

        const data = tasks.filter(task => task.status === filterTask)
        console.log(data);
        return
      }
    }

    if (option === 'add') {
      if (!isNaN(+args[0])) {
        console.log('La descripcion debe ser de tipo texto')
        return
      }

      const description = args[0]
      const id = tasks.length ? tasks[tasks.length - 1].id + 1 : 1

      const task = {
        id,
        description,
        status: 'todo',
        createAt: formatterDate,
        updatedAt: formatterDate
      }

      tasks.push(task)
      await file.close()

      const newFile = await open(fileName, 'w')
      await newFile.write(JSON.stringify(tasks, null, 2))
      await newFile.close()

      console.log('se añadio nueva tarea: ID-' + task.id);

    } else {
      if (!isNaN(args[0])) {
        const id = +args[0]
        const newValue = args[1]

        const findTask = tasks.find(task => task.id === id)
        if (!findTask) {
          console.log('No se realizaron cambios, no existe el elemento');
          return
        }

        switch (option) {
          case 'update':
            {
              findTask.description = newValue
              findTask.updatedAt = formatterDate

              console.log('Se actualizo la descripcion del ID-' + id);
            }
            break;
          case 'delete':
            {
            tasks = tasks.filter(task => task.id !== id)    
            console.log('Se elimino el ID-' + id);          
            }
            break;
          case 'mark-in-progress':
            {
              findTask.status = 'in-progress'
              findTask.updatedAt = formatterDate
              
              console.log('Se actualizo el status del ID-' + id);
            }
            break;
          case 'mark-done':
            {
              findTask.status = 'done'
              findTask.updatedAt = formatterDate

              console.log('Se actualizo el status del ID-' + id);        
            }
            break;
        }

        await file.close()

      const newFile = await open(fileName, 'w')
      await newFile.write(JSON.stringify(tasks, null, 2))
      await newFile.close() 
      }

    }
  } catch (error) {
    if (error.code === 'ENOENT') {
      await open(fileName, 'w')
      return
    }
    console.log(error)

  }
}

createJson(args)