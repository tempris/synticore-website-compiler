(function () {
    'use strict';

    require('./gui/_core');
    require('./gui/_util');
    require('./gui/_config-editor');
    require('./gui/_app');

    const GUI = window.SynticoreGui;
    GUI.bindEvents();
    GUI.bootstrap();
})();
