import { CALL_API } from '../middleware/api';

export function getAllDataSets() {
    return {
        [CALL_API]: {
            endpoint: '/datasets/',
            option: {
                method: 'GET',
                headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                }
            }
        }
    };
}
