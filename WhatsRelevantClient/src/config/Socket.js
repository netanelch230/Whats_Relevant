const ENDPOINT = 'http://192.168.14.13:5000';
import io from 'socket.io-client';
export default io(ENDPOINT);