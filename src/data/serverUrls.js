const base = 'http://f99f5da6.ngrok.io';

export default {
    donors: {
        register: base + '/api/donors',
        getAnalysisHistory: base + '/api/getAnalysisHistory',
        getPersonalDetails: base + '/api/getPersonalDetails',
        update: base + '/api/donors',
        donate: base + '/api/donations',
        getAll: base + '/api/donors'
    },

    doctors: {
        getBloodRequests: base + '/api/requests/doctors'
    },

    getPatients: base + '/api/patients',
    getBloodRequests: base + '/api/requests/status',
    getBloodStocks: base + '/api/bloodStocks',

    login: {
        url: base + '/api/login',
        fields: {
            type: "type",
            id: "id"
        }
    }
};