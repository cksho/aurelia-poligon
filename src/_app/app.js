export class App {
    configureRouter(config, router) {
        config.title = 'Aurelia Root Title';
        config.options.pushState = true;

        // routing map
        config.map([{
            route: ['/'],
            name: 'home',
            moduleId: './pages/home',
            nav: true,
            title: 'Home Routing',
        }, {
            route: ['list'],
            name: 'list',
            moduleId: './pages/list',
            nav: true,
            title: 'Listing Routing',
        }]);

        this.router = router;
    }
}
