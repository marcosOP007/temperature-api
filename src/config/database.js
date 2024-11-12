module.exports = {
    dialect: 'postgres',
    protocol: 'postgres',
    host: process.env.DB_HOST,
    port: 5432,
    username: process.env.DB_USER,
    database: process.env.DB_NAME,
    password: process.env.DB_SECRET,
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
