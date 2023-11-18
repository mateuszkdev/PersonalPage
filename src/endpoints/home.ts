import { Endpoint } from '../types/endpoints'

const { languages } = require('../../data/languages.json')
const { projects } = require('../../data/projects.json')

export default {

    method: 'GET', type: 'public', endpoint: ['/', '/home'],
    async execute() {

        return {
            render: {
                file: "home",
                data: { languages, projects }
            }
        }

    }

} as Endpoint