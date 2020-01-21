const DEVELOPMENT = 1;
const PRODUCTION  = 2;

const CONFIG_MODE = DEVELOPMENT;

export const API_SERVICE = ( 
    CONFIG_MODE == DEVELOPMENT ? 
        "http://192.168.0.26:3001/zalva/api/v1" : 
        "http://52.2.141.62:3001/zalva/api/v1"
);

export const SERVICE_FILE_URL = (
    CONFIG_MODE == DEVELOPMENT ?
        "http://192.168.0.26:3002/" :
        "http://52.2.141.62:3002/"
);

export const WS_CENTRIFUGO = (
    CONFIG_MODE == DEVELOPMENT ?
    "ws://192.168.0.26:9000/connection/websocket" :
    "ws://52.2.141.62:9000/connection/websocket"
)

export const TRIP_ACCEPTED  = "TripAccepted"
export const TRIP_CONFIRMED = "TripConfirmed"
export const TRIP_STARTED   = "TripStarted"
export const TRIP_ARRIVED   = "TripArrived"
export const TRIP_DROPPED   = "TripDropped"
export const TRIP_DECLINE   = "TripDeclined"
export const TRIP_CANCELLED = "TripCancelled"
export const TRIP_COMPLETED = "TripCompleted"