import fs from 'fs'

import { Actions } from 'node-plop'
import { NodePlopAPI } from 'plop'

import actions from './lib/actions'
import prompts from './lib/prompts'
import { validatePackageName } from './lib/validations'

export default (plop: NodePlopAPI) => {
  plop.load('plop-pack-npm-install', null, null)
  plop.setGenerator('project', {
    description: 'Web Project Files',
    /* CUSTOM PROMPTS */
    prompts: [
      {
        type: 'list',
        name: 'workspace',
        default: 'create-react-app',
        choices: fs.readdirSync('./templates')
          .map(dir => ({ name: dir, value: dir }))
      },
      {
        type: 'input',
        name: 'organization',
        message: 'organization name',
        validate: validatePackageName,
      },
      {
        type: 'input',
        name: 'name',
        message: 'workspace name',
        validate: validatePackageName,
      },
      /* RECURSIVE/DYNAMIC PROMPTS */
      ...prompts(),
    ],
    actions: actions as Actions
  })
}
