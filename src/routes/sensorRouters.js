const express = require('express');
const { body, validationResult } = require('express-validator');

const SensorController = require('../Controller/SensorController');
const router = express.Router();

// Função de manipulação de erros
const handleError = (res, error) => {
    console.error(error);
    res.status(500).json({ error: 'Ocorreu um erro no servidor.' });
};

// Função de validação
const validateSensor = [
    // Validações
    body('name').optional().isString().withMessage('O nome deve ser uma string.'),
    body('corretion_temperature').optional().isBoolean().withMessage('A correção de temperatura deve ser um booleano.'),
    body('corretion').optional().isInt().withMessage('A correção deve ser um número inteiro.'),
    body('channels_id').optional().isInt().withMessage('O ID do canal deve ser um número inteiro.'),
    body('location').optional().isString().withMessage('A localização deve ser uma string.'),
    body('status').optional().isIn(['ACTIVE', 'INACTIVE']).withMessage('O status deve ser ACTIVE ou INACTIVE.')
];


// Rota para listar todos os sensores
router.get('/', async (req, res) => {
    try {
        const sensors = await SensorController.getAllSensors();
        res.status(200).json(sensors);
    } catch (error) {
        handleError(res, error);
    }
});

// Rota para pegar um sensor por ID
router.get('/:id', async (req, res) => {
    try {
        const sensor = await SensorController.getSensorById(req.params.id);
        res.status(200).json(sensor);
    } catch (error) {
        handleError(res, error);
    }
});

// Rota para criar um novo sensor
router.post('/', validateSensor, async (req, res) => {
    // Verificar erros de validação
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const newSensor = await SensorController.createSensor(req.body);
        res.status(201).json(newSensor);
    } catch (error) {
        handleError(res, error);
    }
});

// Rota para editar um sensor por ID
router.put('/:id', validateSensor, async (req, res) => {
    // Verificar erros de validação
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const updatedSensor = await SensorController.updateSensor(req.params.id, req.body);
        res.status(200).json(updatedSensor);
    } catch (error) {
        handleError(res, error);
    }
});


// Rota para excluir um sensor por ID
router.delete('/:id', async (req, res) => {
    try {
        await SensorController.deleteSensor(req.params.id);
        res.status(204).send();
    } catch (error) {
        handleError(res, error);
    }
});


// Rota para obter todos os registros de temperatura de um sensor
router.get('/:id/temperature-logs', async (req, res) => {
    try {
        const data = await SensorController.getAllTemperatureLogs(req.params.id);
        res.status(200).json(data);
    } catch (error) {
        handleError(res, error);
    }
});


module.exports = router;
