const base = 'http://localhost:8080';

export default {
    donors: {
        register: base + '/api/donors',
        getAnalysisHistory: base + '/api/getAnalysisHistory',
        getPersonalDetails: base + '/api/getPersonalDetails',
        update: base + '/api/donors',
        donate: base + '/api/donations'
    },

    doctors: {
        getBloodRequests: base + '/api/requests/doctors'
    },

    getPatients: base + '/api/patients',
    getBloodRequests: base + '/api/checkRequestStatus',
    getBloodStocks: base + '/api/bloodstocks',

    login: {
        url: base + '/api/login',
        fields: {
            type: "Type",
            id: "ID"
        }
    }
};