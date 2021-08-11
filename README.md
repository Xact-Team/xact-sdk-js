# Xact SDK

## Installation

```
npm install
```

## Build the project

```
npm run build
```

## Run Unit Test

```
npm run test
```

## Important bits

- Project have one packages which are connected to npm organization @xact-wallet-sdk/\*
- Each package have own tsconfig.json which inherit base config from project root
- Each package have _src_ folder where all _TypeScript_ files are placed
- Each package have custom npm script _tsc_, which is triggered by _lerna run tsc_ before publishing

## Integration

_integration_ folder download, install and use published packages from NPM.

## Maintainers

[@schnouz](https://github.com/schnouz)

## Contributing

See [the contributing file](CONTRIBUTING.md)!

PRs accepted.

Small note: If editing the README, please conform to the [standard-readme](https://github.com/RichardLitt/standard-readme) specification.

## License

MIT © 2021 Xact
