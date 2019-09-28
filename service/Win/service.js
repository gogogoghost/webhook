const service = require('node-windows').Service;
const path = require('path');
const param = process.argv.splice(2)[0];

const svc = new service({
    name: 'Webhook daemon',
    description: 'The webhook daemon server',
    script: path.join(__dirname,'../../index.js'),
    nodeOptions: [
        '--harmony',
        '--max_old_space_size=4096'
    ]
});

svc.on('install', function () {
    console.log('Install complete.');
    svc.start();
    console.log('Running complete.');
});

svc.on('uninstall', function () {
    console.log('Uninstall complete.');
    console.log('The service exists: ', svc.exists);
});

if (param == 'install')
    svc.install();
else if (param == 'uninstall')
    svc.uninstall();

