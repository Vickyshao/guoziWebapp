require('shelljs/global');

exec('apimocker --config ./config/mock.json', function(status, output) {});
