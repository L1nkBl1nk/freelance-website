const uuid = require('uuid')
const path = require('path')
const { Profile, User } = require('../models/models')

class profileController {
    async create(req, res) {
        try {
            const { bio, skills, hourlyRate, userId } = req.body
            let fileName = null
            if (req.files && req.files.img) {
                const { img } = req.files
                fileName = uuid.v4() + '.jpg'
                await img.mv(path.resolve(__dirname, '..', 'static', fileName))
            }
            const profile = await Profile.create({ bio, skills, img: fileName, hourlyRate, UserId: userId })
            return res.json(profile)
        } catch (e) {
            return res.status(500).json({ message: e.message })
        }
    }

    async getByUser(req, res) {
        try {
            const { userId } = req.params
            const profile = await Profile.findOne({
                where: { UserId: userId },
                include: [{ model: User, attributes: ['id', 'username', 'email', 'role'] }]
            })
            if (!profile) return res.status(404).json({ message: 'Profile not found' })
            return res.json(profile)
        } catch (e) {
            return res.status(500).json({ message: e.message })
        }
    }

    async getAll(req, res) {
        try {
            const profiles = await Profile.findAll({
                include: [{ model: User, attributes: ['id', 'username', 'email', 'role'] }]
            })
            return res.json(profiles)
        } catch (e) {
            return res.status(500).json({ message: e.message })
        }
    }

    async update(req, res) {
        try {
            const { id } = req.params
            const { bio, skills, img, hourlyRate } = req.body
            const profile = await Profile.findByPk(id)
            if (!profile) return res.status(404).json({ message: 'Profile not found' })
            await profile.update({ bio, skills, img, hourlyRate })
            return res.json(profile)
        } catch (e) {
            return res.status(500).json({ message: e.message })
        }
    }

    async delete(req, res) {
        try {
            const { id } = req.params
            const profile = await Profile.findByPk(id)
            if (!profile) return res.status(404).json({ message: 'Profile not found' })
            await profile.destroy()
            return res.json({ message: 'Profile deleted' })
        } catch (e) {
            return res.status(500).json({ message: e.message })
        }
    }
}

module.exports = new profileController()