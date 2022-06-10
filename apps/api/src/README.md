# treelof-api

Metered API supporting the Treelof Wiki page

## Documentation
This API uses OpenAPI Specification 3.0 for managing documentation. It uses a global [oas](https://github.com/readmeio/oas) installation to pull OpenAPI snippets from the codes comments.

```bash
oas generate base.yaml > spec.yaml
```
 to generate a OpenAPI Spec file

 
`oas host` to publish