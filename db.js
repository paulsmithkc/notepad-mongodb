const debug = require('debug')('app:db');
const config = require('config');
const { MongoClient, Db, ObjectId } = require('mongodb');

const DB_NAME = config.get('db.name');
const DB_URI = config.get('db.uri');

/**
 * Note Entity
 */
class Note {
  /**
   * Create a new note entity.
   * @param {string} title title text of the note
   * @param {string} body body text of the note
   */
  constructor(title, body) {
    this.title = title;
    this.body = body;
  }
}

/**
 * Global database connection.
 * Do not user directly, call connect() when needed.
 * @type {Db}
 */
let databaseConnection = null;

/**
 * Open a connection to the database, if one is not already open.
 * Otherwise, reuse the existing connection.
 * @return {Promise<Db>}
 */
async function connect() {
  if (!databaseConnection) {
    debug('connecting to database...');
    const client = await MongoClient.connect(DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      poolSize: 10,
    });
    databaseConnection = client.db(DB_NAME);
  }
  return databaseConnection;
}

/**
 * Returns all notes in the database as an array.
 * @return {Promise<Note[]>}
 */
async function getAllNotes() {
  const db = await connect();
  const collection = db.collection('notes');
  return collection.find({}).sort({ title: 1 }).toArray();
}

/**
 * Insert a new note into the database.
 * @param {Note} note entity to be inserted
 * @return {Promise<any>}
 */
async function insertOneNote(note) {
  const db = await connect();
  const collection = db.collection('notes');
  return collection.insertOne(note);
}

module.exports.Note = Note;
module.exports.connect = connect;
module.exports.getAllNotes = getAllNotes;
module.exports.insertOneNote = insertOneNote;
