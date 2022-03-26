const express = require('express');
const router = express.Router();
const controllers = require('../controller/collaboController');

router.get('/getCollaborator/:name',
  controllers.validGetCollaborator,
  controllers.resGetCollaborator
);

router.get('/getCollaboratorSectors/:id',
  controllers.validSectors,
  controllers.resSectors
);

router.post('/registerCollaborator',
  controllers.validBodyAdd,
  controllers.addResponse
);

router.delete('/removeCollaborator/:id',
  controllers.validId,
  controllers.resRemoveCollaborator
);

module.exports = router;