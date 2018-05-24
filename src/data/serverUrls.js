const base = 'http://f99f5da6.ngrok.io';

export default {
    donors: {
        register: base + '/api/donors',
        getAnalysisHistory: base + '/api/donors/history',
        getPersonalDetails: base + '/api/donors',
        update: base + '/api/donors',
        donate: base + '/api/donations',
        getAll: base + '/api/donors'
    },

    doctors: {
        getBloodRequests: base + '/api/requests/doctors',
        addBloodRequest: base + '/api/requests'
    },

    getPatients: base + '/api/patients',
    getBloodRequests: base + '/api/requests',
    getBloodStocks: base + '/api/bloodStocks',

    login: {
        url: base + '/api/login',
        fields: {
            type: "type",
            id: "id"
        }
    }
};