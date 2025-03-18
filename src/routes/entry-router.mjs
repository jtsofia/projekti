import express from 'express';
import {body, param} from 'express-validator';
import {
  getEntries,
  getEntryById,
  postEntry,
  putEntry,
  deleteEntry,
} from '../controllers/entry-controller.mjs';
import {authenticateToken} from '../middlewares/authentication.mjs';
import {validationErrorHandler} from '../middlewares/error-handler.mjs';

const entryRouter = express.Router();

entryRouter.route('/')
  .get(authenticateToken, getEntries)
  .post(    
    authenticateToken,
    body('user_id').isAlphanumeric(),
    body('entry_date').isDate(),
    body('meal').isLength({min: 3, max: 20}),
    body('calories').isInt({min: 0, max: 2400}),
    body('foodname').isLength({min: 3, max: 200}),
    body('notes').isLength({min: 3, max: 300}),
    postEntry
    );

    entryRouter.route('/:id')
      .get(
        authenticateToken,
        param('id', 'must be integer').isInt(),
        validationErrorHandler,
        getEntryById,
      )
      .put(
        authenticateToken,
        param('id', 'must be integer').isInt(),
        // user_id is not allowed to be changed
        body('user_id', 'not allowed').not().exists(),
        body('entry_date').optional().isDate(),
        body('meal').optional().trim().isLength({min: 3, max: 20}).isString(),
        body('calories').optional().isInt({min: 0, max: 2400}),
        body('foodname').optional().isString().isLength({min: 3, max: 200}),
        body('notes').optional().isString().isLength({min: 3, max: 300}),
        validationErrorHandler,
        putEntry,
      )
      .delete(
        authenticateToken,
        param('id', 'must be integer').isInt(),
        validationErrorHandler,
        deleteEntry,
      );
    
    export default entryRouter;