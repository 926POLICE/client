const base = 'http://1e31df3b.ngrok.io';

export default {
    donors: {
        register: base + '/api/donors',
        getAnalysisHistory: (clientID) => base + '/api/donors/history/' + clientID,
        getPersonalDetails: base + '/api/donors',
        update: (clientID) => base + '/api/donors/' + clientID,
        donate: () => base + '/api/donations/',
        getAll: base + '/api/donors',
        getNextDonation: (clientID) => base + '/api/donors/nextDonation/' + clientID,
        getNotification: (clientID) => base + '/api/donors/notified/' + clientID,
        addMedicalHistory: (clientID) => base + '/api/donors/history/' + clientID
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
        testBlood: (stockID) => base + '/api/bloodStocksUntested/' + stockID,
        getDonors: () => base + '/api/donors',
        collectBlood: () => base + '/api/bloodStocksUntested',
        updateStock: (bloodID) => base + '/api/bloodStocks/' + bloodID,
        updateDonor: (donorID) => base + '/api/donors/info/' + donorID,
        getEligible: (donorID) => base + "/api/donors/eligibility/" + donorID,
        setEligible: (donorID) => base + "/api/donors/eligibility/" + donorID,
        deleteRequest: (requestID) => base + "/api/pendingDonations/" + requestID
    },

    getPatients: base + '/api/patients',
    getBloodRequests: base + '/api/requests',
    getBloodStocks: base + '/api/bloodStocks',
    getMedicalHistory: (clientID) => base + '/api/donors/history/' + clientID,
    checkCompatibility: () => base + '/api/donors/compatibility',

    login: {
        url: base + '/api/login',
        fields: {
            type: "type",
            id: "id"
        }
    }
};