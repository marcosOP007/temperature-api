const express = require('express');
const { body, validationResult } = require('express-validator');

const SensorController = require('../Controller/SensorController');
const { verifyUserPermission } = require('../MiddleWares/permissionCheck');
const router = express.Router();
const permissionCheck = require('../MiddleWares/permissionCheck');


// Função de manipulação de erros
const handleError = (res, error) => {
    console.error(error);
    res.status(500).json({ error: 'Ocorreu um erro no servidor.' });
};

// Função de validação
const validateSensor = [
    // Validações
    body('name').isString().withMessage('O nome deve ser uma string.'),
    body('corretion_temperature').isBoolean().withMessage('A correção de temperatura deve ser um booleano.'),
    body('corretion').optional().isFloat().withMessage('A correção deve ser um número inteiro.'),
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
    

    if(!req.body.corretion_temperature){
        req.body.correction_value = 0
    }
    console.log(req.body.correction_value)

    try {
        const newSensor = await SensorController.createSensor({
            name: req.body.name,
            channels_id: req.body.channels_id,
            corretion_temperature: req.body.corretion_temperature,
            corretion: req.body.correction_value,
            location: req.body.location
        });
        res.status(201).json(newSensor);
    } catch (error) {
        handleError(res, error);
    }
});

router.get('/delet/:id', permissionCheck.verifyUserPermission('ADMIN','MODERATOR'), async (req,res) => {
    try {
        await SensorController.deleteSensor(req.params.id);
        res.status(204).redirect('/index/channel/'+req.query.channelId+'/edit_view');
    } catch (error) {
        handleError(res, error);
    }
})

// Rota para editar um sensor por ID
router.post('/edit/:id', permissionCheck.verifyUserPermission('ADMIN','MODERATOR'), async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }


    console.log(req.body)
    try {
        const updatedSensor = await SensorController.updateSensor(req.params.id,{
            name: req.body.name,
            corretion_temperature: req.body.corretion_temperature,
            corretion: (req.body.corretion_temperature ? req.body.correction_value : 0),
            location: req.body.location,
            status: (req.body.status ? 'ACTIVE' : 'INACTIVE')
        });
        res.status(200).json({success: true,msg:'sucesso'});
    } catch (error) {
        console.log("erro> ",error)
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
    console.log("pegando todos os logs")
    try {
        const data = await SensorController.getAllTemperatureLogs(req.params.id);
        res.status(200).json(data);
    } catch (error) {
        handleError(res, error);
    }
});


module.exports = router;
