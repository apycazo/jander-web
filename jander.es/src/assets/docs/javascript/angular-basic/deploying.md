To generate production ready sources use, for example:

```bash
$ ng build --prod
```

Where `--prod` optimizes files for uploading and serving, and `--base-href` sets the base path for routing. If the page needs some specific routing, use the param `--base-href`, for example:

```bash
$ ng build --prod --base-href="https://www.jander.es/pre"
```