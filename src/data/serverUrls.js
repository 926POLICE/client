const base = 'http://5e4a80b6.ngrok.io';

export default {
    donors: {
        register: base + '/api/donors',
        getAnalysisHistory: (clientID) => base + '/api/donors/history/' + clientID,
        getPersonalDetails: base + '/api/donors',
        update: (clientID) => base + '/api/donors/' + clientID,
        donate: () => base + '/api/donations/',
        getAll: base + '/api/donors',
        getNextDonation: (clientID) => base + '/api/donors/nextDonation/' + clientID
    },

    doctors: {
        getBloodRequests: (clientID) => base + '/api/requests/doctors/' + clientID,
        addBloodRequest: base + '/api/requests'
    },

    personnel: {
        completeRequest: (requestID) => base + '/api/requests/' + requestID,
        badStocks: () => base + '/api/bloodStocksUnusable',
        dispose: (bloodID) => base + '/api/bloodStocksUnusable/' + bloodID,
        getUntestedStock: () => base + '/api/bloodStocksUntested',
        notifyDonors: (patientID) => base + '/api/donors/notify/' + patientID,
        getPendingDonations: () => base + '/api/pendingDonations',
        testBlood: (stockID) => base + '/api/bloodStocksUntested/' + stockID
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