import { set, connect as _connect } from 'mongoose';
import uri from '../COMMON.js'
set('strictQuery', true);

const atlas = uri;

const connect = async () => {
    try {
        await _connect(atlas);
        console.log("Connect Success");
    } catch (error) {
        console.error("Connection Error:", error);
        console.log("Connect Fail");
    }
}



export default { connect };