import { SQLite } from 'expo';
import PouchDB from 'pouchdb-react-native';
PouchDB.plugin(require('pouchdb-upsert'));
import SQLiteAdapterFactory from 'pouchdb-adapter-react-native-sqlite';

const SQLiteAdapter = SQLiteAdapterFactory(SQLite);
PouchDB.plugin(SQLiteAdapter);

const locations = new PouchDB('locations.db', { adapter: 'react-native-sqlite' });
const places    = new PouchDB('places.db', { adapter: 'react-native-sqlite' });

export async function getFromLocation() {
    try {
      const result = await locations.get('directions');
      return result;
    } catch (error) {
      if (error.name === 'not_found') {
        return {
          _id: 'directions',
          fromLocation: null,
          toLocation: null
        };
      }
    }
}

export async function setFromLocation(data, longitude, latitude) {
    console.log('setFromLocation', data, longitude, latitude);
    var location = {
      _id: new Date().toISOString(),
      placeId: data.place_id,
      title: data.formatted_address.split(',')[0],
      address: data.formatted_address,
      geoJson: {
          type: "Point",
          coordinates: [
              longitude,
              latitude
          ]
      }
    }

    await locations.upsert('directions', (doc) => {
      doc.fromLocation = doc.fromLocation || null;
      doc.fromLocation = location;
      return doc;
    });
}

export async function setToLocation(data, longitude, latitude) {
  var location = {
    _id: new Date().toISOString(),
    placeId: data.place_id,
    title: data.formatted_address.split(',')[0],
    address: data.formatted_address,
    geoJson: {
        type: "Point",
        coordinates: [
            longitude,
            latitude
        ]
    }
  }
  await locations.upsert('directions', (doc) => {
    doc.toLocation = doc.toLocation || null;
    doc.toLocation = location;
    return doc;
  });
}

export async function deleteFromLocation() {
    try {
      var doc      = await locations.get('directions');
      var response = await locations.remove(doc);
    } catch (err) {
      console.log('Error ', err);
    }
}

export async function getPlaces() {
  try {
    const result = await places.get('places');
    return result;
  } catch (error) {
    if (error.name === 'not_found') {
      return {
        _id: 'places',
        places: []
      };
    }
  }
}

export async function setPlaces(locations) {
  
  let nearbyPlaces = [];
  for (var i=0; i < locations.length; i++) {
    let location = await createPlace(locations[i]);
    nearbyPlaces.push(location);
  }

  await places.upsert('places', (doc) => {
    doc.places = doc.places || null;
    doc.places = nearbyPlaces;
    return doc;
  });
}

async function createPlace(location) {
  var place = {
    _id: new Date().toISOString(),
    name: location.name,
    place_id: location.place_id,
    location: location.geometry.location
  };
  return place;
}

export async function deletePlaces() {
  try {
    var doc      = await locations.get('places');
    var response = await locations.remove(doc);
    return response;
  } catch (err) {
    console.log('Error ', err);
  }
}

// export async function deletePlaces() {
//    try {
//      var results = await getPlaces();
//      results = results.map(r => {
//        r._deleted = true;
//        return r;
//      });
//      await places.bulkDocs(results);
//    } catch (err) {
//      console.log(err);
//    }
// }