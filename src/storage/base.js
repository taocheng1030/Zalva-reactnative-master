import { SQLite } from 'expo';
import PouchDB from 'pouchdb-react-native';
PouchDB.plugin(require('pouchdb-upsert'));
import SQLiteAdapterFactory from 'pouchdb-adapter-react-native-sqlite';

const SQLiteAdapter = SQLiteAdapterFactory(SQLite);
PouchDB.plugin(SQLiteAdapter);

const zalva = new PouchDB('zalva_user.db', { adapter: 'react-native-sqlite' });


// get pushToken
export async function getUserPushToken() {
    try {
      const result = await zalva.get('push_token');
      return result;
    } catch (error) {
      if (error.name === 'not_found') {
        return {
          _id: 'push_token',
          push_token: null
        };
      }
    }
}

// set pushToken
export async function setUserPushToken(token) {
    await zalva.upsert('push_token', (doc) => {
      doc.push_token = doc.push_token || null;
      doc.push_token = token;
      return doc;
    });
}