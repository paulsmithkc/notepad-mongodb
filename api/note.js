const debug = require('debug')('app:api');
const express = require('express');
const joi = require('@hapi/joi');
const db = require('../db');

// define the schema for a valid note
const NOTE_SCHEMA = joi.object({
  _id: joi.objectId(),
  title: joi.string().required(),
  body: joi.string().required(),
});

// create router
const router = new express.Router();

// middleware
router.use(express.urlencoded({ extended: false }));
router.use(express.json());

// route: get all notes from the database
router.get('/', async (request, response, next) => {
  try {
    const notes = await db.getAllNotes();
    return response.json(notes);
  } catch (err) {
    next(err);
  }
});

router.post('/', async (request, response, next) => {
  try {
    const note = request.body;
    debug(note);

    await NOTE_SCHEMA.validateAsync(note);
    await db.insertOneRecipe(note);
    return response.json(note);
  } catch (err) {
    next(err);
  }
});

// export router
module.exports = router;
