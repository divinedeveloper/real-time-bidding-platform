myApp.config(['$environmentProvider',
    function ($environmentProvider) {
                $environmentProvider.environments = [
                        {
                                name: 'local',
                                pattern: /localhost/,
                                url: 'http://localhost:3000/',
                                analyticsAppId: 'UA-XXXXXXXX-1',
                                facebookAppId: '12345678901234',
                                baseurl: '//localhost:3000',
//                                custurl: '//localhost:3000/cust'
        },
                        {
                                name: 'stage',
                                pattern: /54.164.68.205:3000/,
                                url: 'http://54.164.68.205:3000/',
                                analyticsAppId: 'UA-XXXXXXXX-1',
                                facebookAppId: '12345678901234',
                                baseurl: '//54.164.68.205:3000',
//                                custurl: '//54.251.2.39/cust'
        }
    ];
}]);