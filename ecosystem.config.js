module.exports = {
    apps : [{
        name: 'mingou_application',
        script: './bin/application',
        instances: 'max',
        autorestart: true,
        watch: false,
        max_memory_restart: '1G',
        // output: '/dev/null',
        // error: './logs/miner-app-error.js',
        env: {
            NODE_ENV: 'production'
        },
        env_development: {
            NODE_ENV: 'development'
        }
    }]
};