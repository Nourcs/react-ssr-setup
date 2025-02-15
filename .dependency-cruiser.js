module.exports = {
    extends: 'dependency-cruiser/configs/recommended-warn-only',
    /*
       the 'dependency-cruiser/configs/recommended-warn-only' preset
       contains these rules:
       no-circular            - flags all circular dependencies
       no-orphans             - flags orphan modules (except typescript .d.ts files)
       no-deprecated-core     - flags dependencies on deprecated node 'core' modules
       no-deprecated-npm      - flags dependencies on deprecated npm modules
       no-non-package-json    - flags (npm) dependencies that don't occur in package.json
       not-to-unresolvable    - flags dependencies that can't be resolved
       no-duplicate-dep-types - flags dependencies that occur more than once in package.json

       If you need to, you can override these rules. E.g. to ignore the
       no-duplicate-dep-types rule, you can set its severity to "ignore" by
       adding this to the 'forbidden' section:
       {
            name: 'no-duplicate-dep-types',
            severity: 'ignore'
       }

       Also, by default, the preset does not follow any external modules (things in
       node_modules or in yarn's plug'n'play magic). If you want to have that
       differently, just override it the options.doNotFollow key.
     */
    forbidden: [
        {
            name: 'not-to-test',
            comment: "Don't allow dependencies from outside the test folder to test",
            severity: 'error',
            from: {
                pathNot: '^(test|spec)',
            },
            to: {
                path: '^(test|spec)',
            },
        },
        {
            name: 'not-to-spec',
            comment:
                "Don't allow dependencies to (typescript/ javascript/ coffeescript) spec files",
            severity: 'error',
            from: {},
            to: {
                path: '\\.spec\\.(js|ts|ls|coffee|litcoffee|coffee\\.md)$',
            },
        },
        {
            name: 'not-to-dev-dep',
            severity: 'error',
            comment: "Don't allow dependencies from src/app/lib to a development only package",
            from: {
                path: '^(src|app|lib)',
                pathNot: '\\.spec\\.(js|ts|ls|coffee|litcoffee|coffee\\.md)$',
            },
            to: {
                dependencyTypes: ['npm-dev'],
            },
        },
        {
            name: 'optional-deps-used',
            severity: 'info',
            comment:
                "Inform when using an optional dependency. It might not be wrong - but it's not typicaly either",
            from: {},
            to: {
                dependencyTypes: ['npm-optional'],
            },
        },
        {
            name: 'peer-deps-used',
            comment:
                "Warn when using a peer dependency - which might not be wrong - but it's not typicaly either",
            severity: 'warn',
            from: {},
            to: {
                dependencyTypes: ['npm-peer'],
            },
        },
    ],
    options: {
        /* conditions specifying which files not to follow further when encountered:
    - path: a regular expression to match
    - dependencyTypes: see https://github.com/sverweij/dependency-cruiser/blob/develop/doc/rules-reference.md#dependencytypes
      for a complete list
 */
        doNotFollow: {
            // path: 'node_modules',
            dependencyTypes: [
                'npm',
                'npm-dev',
                'npm-optional',
                'npm-peer',
                'npm-bundled',
                'npm-no-pkg',
            ],
        },

        /* pattern specifying which files to exclude (regular expression) */
        // , exclude : ''

        /* pattern specifying which files to include (regular expression)
           dependency-cruiser will skip everything not matching this pattern
        */
        // , includeOnly : ''

        /* list of module systems to cruise */
        // , moduleSystems: ['amd', 'cjs', 'es6', 'tsd']

        /* prefix for links in html and svg output (e.g. https://github.com/you/yourrepo/blob/develop/) */
        // , prefix: ''

        /* if true detect dependencies that only exist before typescript-to-javascript compilation */
        tsPreCompilationDeps: true,

        /* if true combines the package.jsons found from the module up to the base
           folder the cruise is initiated from. Useful for how (some) mono-repos
           manage dependencies & dependency definitions.
         */
        // , combinedDependencies: false

        /* if true leave symlinks untouched, otherwise use the realpath */
        // , preserveSymlinks: false

        /* Typescript project file ('tsconfig.json') to use for
           (1) compilation and
           (2) resolution (e.g. with the paths property)

           The (optional) fileName attribute specifies which file to take (relative to
           dependency-cruiser's current working directory). When not provided
           defaults to './tsconfig.json'.
         */
        // , tsConfig: {
        //    fileName: './tsconfig.json'
        // }

        /* Webpack configuration to use to get resolve options from.

          The (optional) fileName attribute specifies which file to take (relative to dependency-cruiser's
          current working directory. When not provided defaults to './webpack.conf.js'.

          The (optional) `env` and `args` attributes contain the parameters to be passed if
          your webpack config is a function and takes them (see webpack documentation
          for details)
         */
        // , webpackConfig: {
        //    fileName: './webpack.conf.js'
        //    , env: {}
        //    , args: {}
        // }

        /* How to resolve external modules - use "yarn-pnp" if you're using yarn's Plug'n'Play.
           otherwise leave it out (or set to the default, which is 'node_modules')
        */
        // , externalModuleResolutionStrategy: 'node_modules'
    },
};
// generated: dependency-cruiser@4.16.0 on 2019-04-28T13:33:22.188Z
