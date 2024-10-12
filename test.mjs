import { open } from 'fs/promises'

const d = await open('name.txt', 'a')
d.write('asdsdf')