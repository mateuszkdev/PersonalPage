import { endpoint } from '../types/endpoints'

const { socialmedia } = require('../../data/media.json')
const { projects } = require('../../data/projects.json')

export default {

    method: 'GET', type: 'public', endpoint: ['/', '/home'],
    execute(req, res, next) {

        res.render('home', { socialmedia, projects })

    }

} as endpoint