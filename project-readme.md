# For developers

Before compiling, if you want to use https, and work with hot reload a webpack config file `webpack.config.js` is provided. It requires *`.env`* file, which is not attached, because it is machine specific.

If you don't want to work with *both* hot reload feature and https you can safely delete `webpack.config.js`. Otherwise, proceed as follows:

Create `.crt` and `.key` files for https and setup server to use those.
Create `.env` file in the root of project (same dir as this file). Fill it as follows:

```
host=your-host-name
cert_location=path to crt file
key_location=path to key file
```