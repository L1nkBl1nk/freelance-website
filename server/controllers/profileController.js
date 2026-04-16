const uuid = require('uuid')
const path = require('path')
const ApiError = require('../error/ApiError')
const { Profile, User } = require('../models/models')

class profileController {
    async create(req, res, next) {
        try {
            const { bio, skills, hourlyRate } = req.body
            const userId = req.user.id
            let fileName = null
            if (req.files && req.files.img) {
                const { img } = req.files
                fileName = uuid.v4() + '.jpg'
                await img.mv(path.resolve(__dirname, '..', 'static', fileName))
            }
            const profile = await Profile.create({ bio, skills, img: fileName, hourlyRate, UserId: userId })
            return res.json(profile)
        } catch (e) {
            return next(ApiError.internal(e.message))
        }
    }

    async getByUser(req, res, next) {
        try {
            const { userId } = req.params
            const profile = await Profile.findOne({
                where: { UserId: userId },
                include: [{ model: User, attributes: ['id', 'username', 'email', 'role'] }]
            })
            if (!profile) return next(ApiError.badRequest('Profile not found'))
            return res.json(profile)
        } catch (e) {
            return next(ApiError.internal(e.message))
        }
    }

    async getAll(req, res, next) {
        try {
            const profiles = await Profile.findAll({
                include: [{ model: User, attributes: ['id', 'username', 'email', 'role'] }]
            })
            return res.json(profiles)
        } catch (e) {
            return next(ApiError.internal(e.message))
        }
    }

    async update(req, res, next) {
        try {
            const { id } = req.params
            const { bio, skills, hourlyRate } = req.body || {}
            console.log('[profile update] id:', id, 'body:', req.body, 'files:', req.files)
            const profile = await Profile.findByPk(id)
            if (!profile) return next(ApiError.badRequest('Profile not found'))
            if (profile.UserId !== req.user.id) return next(ApiError.forbidden('Access denied'))

            let fileName = profile.img
            if (req.files && req.files.img) {
                fileName = uuid.v4() + '.jpg'
                const savePath = path.resolve(__dirname, '..', 'static', fileName)
                console.log('[profile update] saving file to:', savePath)
                await req.files.img.mv(savePath)
            }

            await profile.update({ bio, skills, img: fileName, hourlyRate })
            return res.json(profile)
        } catch (e) {
            console.error('[profile update] error:', e.message)
            return next(ApiError.internal(e.message))
        }
    }

    async delete(req, res, next) {
        try {
            const { id } = req.params
            const profile = await Profile.findByPk(id)
            if (!profile) return next(ApiError.badRequest('Profile not found'))
            if (profile.UserId !== req.user.id) return next(ApiError.forbidden('Access denied'))
            await profile.destroy()
            return res.json({ message: 'Profile deleted' })
        } catch (e) {
            return next(ApiError.internal(e.message))
        }
    }
}

module.exports = new profileController()