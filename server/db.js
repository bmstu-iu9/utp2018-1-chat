const mongoose = require('./modules/db');

mongoose.connection.on('open', () => {
    const db = mongoose.connection.db;

    db.dropDatabase((error) => {
        if (error) throw error;

        // TODO

        mongoose.disconnect();
    });
});
