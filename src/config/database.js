module.exports = {
    dialect: 'postgres',
    protocol: 'postgres',
    host: 'isabelle.db.elephantsql.com',
    port: 5432,
    username: 'vqsexyea',
    //password: process.env.DB_SECRET,
    database: 'vqsexyea',
    password: "LTAt36KafrnaMldQlFCbGhcRtZTb3uJg",
    dialectoptions: {
        ssl: true,
        native:true,
        /*   ssl: {
            require: true,
            rejectUnauthorized: false
        }*/
    },
    define: {
        timestamps: true,
        underscored: true,
    },
    logging: process.env.NODE_ENV === 'production' ? false : console.log
};
