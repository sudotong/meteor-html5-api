Package.describe({
    name: 'gunjansoni:html5-api',
    version: '0.1.4',
    summary: 'Notifications, Location, Network, Page Visibility, Speech Synthesis, Speech Recognition, Vibration',
    git: 'https://github.com/guns2410/meteor-html5-api',
    documentation: 'README.md'
});

Package.onUse(function(api) {
    api.versionsFrom('1.2.1');
    api.use(['ecmascript', 'mongo', 'underscore', 'jsx@0.2.3']);
    api.addFiles('lib/GeoLocation.jsx', 'client');
    //api.addFiles('lib/GetUserMedia.jsx', 'client');
    api.addFiles('lib/NetworkInformation.jsx', 'client');
    api.addFiles('lib/PageVisibility.jsx', 'client');
    api.addFiles('lib/SpeechSynthesis.jsx', 'client');
    api.addFiles('lib/SpeechRecognition.jsx', 'client');
    api.addFiles('lib/Vibration.jsx', 'client');
    api.addFiles('lib/WebNotification.jsx', 'client');
    api.addFiles('html5-apis.jsx', 'client');
    api.export("Html5Api");
});

Package.onTest(function(api) {
    api.use('ecmascript');
    api.use('tinytest');
    api.use('gunjansoni:html5-api');
    api.addFiles('html5-apis-tests.js');
});
