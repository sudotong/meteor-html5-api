Package.describe({
    name         : 'gunjansoni:html5-api',
    version      : '0.1.0',
    summary      : 'Rich HTML5 APIs wrapped for using with Meteor including Desktop Notifications, Geo Location, Network Information, Page Visibility, Speech Synthesis, Speech Recognition and Mobile Vibration',
    git          : 'https://github.com/guns2410/meteor-html5-apis',
    documentation: 'README.md'
});

Package.onUse(function (api) {
    api.versionsFrom('1.2.1');
    api.use([ 'ecmascript', 'mongo', 'underscore', 'jsx@0.2.3' ]);
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

Package.onTest(function (api) {
    api.use('ecmascript');
    api.use('tinytest');
    api.use('gunjansoni:html5-apis');
    api.addFiles('html5-apis-tests.js');
});
