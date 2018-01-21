const Router = require('express').Router;
const handlers = require('../handlers/handlers');

const router = Router();


router.get('/', handlers.getApiTodos);
router.post('/', handlers.addApiTodo);
router.put('/:_id', handlers.editApiTodo);
router.delete('/:_id', handlers.deleteTodo);

module.exports = router;