const ENDPOINT = 'http://10.100.102.12:5000';
import io from 'socket.io-client';
export default io(ENDPOINT);