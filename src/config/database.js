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
    pool: {
        max: 1,      // número máximo de conexões no pool
        min: 0,      // número mínimo de conexões no pool
        idle: 10000  // tempo máximo, em milissegundos, que uma conexão pode ficar ociosa antes de ser liberada
    },
    define: {
        timestamps: true,
        underscored: true,
    },
    logging: process.env.NODE_ENV === 'production' ? false : console.log
};
