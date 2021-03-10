const mongoose = require('mongoose');
const Clients = require('../models/Clients');
//@desc - Get all clients from the database
//@route - GET /api/v1/clients
//@access- private
exports.getClients = async (req, res, next) => {
	try {
		const clients = await Clients.find();
		res.status(200).json({
			results: clients.length,
			msg: 'All the clients',
			success: true,
			data: clients,
		});
	} catch (error) {
		console.log(error.message);
	}
};
//@desc - Get a single client from the database
//@route - GET /api/v1/clients/:id
//@access- Private

exports.getClient = async (req, res, next) => {
	try {
		const client = await Clients.findById(req.params.id);
		if (!client) {
			return res.status(400).json({
				success: false,
			});
		}
		res.status(200).json({
			msg: `the data for client withn id ${req.params.id}`,
			success: true,
			data: client,
		});
	} catch (error) {
		res.status(400).json({
			success: false,
		});
	}
};

//@desc - Add a client
//@route - POST /api/v1/clients
//@access- Private
exports.addClient = async (req, res, next) => {
	try {
		const client = await Clients.create(req.body);
		res.status(200).json({
			msg: 'clients Added',
			success: true,
			data: client,
		});
	} catch (error) {
		console.log(error.message);
	}
};
//@desc - Delete a client
//@route - DELETE /api/v1/clients/:id
//@access- Private
exports.deleteClient = async (req, res, next) => {
	try {
		const client = await Clients.findOneAndDelete(req.params.id);
		if (!client) {
			return res.status(400).json({
				success: false,
			});
		}
		res.status(200).json({
			msg: 'client deleted',
			success: true,
			data: [],
		});
	} catch (error) {
		res.status(400).json({
			success: false,
		});
	}
};
//@desc - update a client info
//@route - UPDATE /api/v1/clients/:id
//@access- Private
exports.updateClient = async (req, res, next) => {
	try {
		const client = await Clients.findByIdAndUpdate(req.params.id, req.body, {
			runValidators: true,
			new: true,
		});
		if (!client) {
			return res.status(400).json({
				success: false,
			});
		}
		res.status(200).json({
			msg: 'clients Added',
			success: true,
			data: client,
		});
	} catch (error) {
		res.status(400).json({
			success: false,
		});
	}
};
