# nodecg-rest

nodecg-rest is a bundle that lets you send messages and read/write values to arbitrary replicants from a REST API. This was so I could communicate to NodeCG from other programs without adding a socket.io dependency.

## THIS BUNDLE CAN BE INSECURE

If you want to use this bundle, please note that unless you configure NodeCG and this bundle otherwise, nothing in this bundle is secure. With great power comes great responsibility, it is up to the developer to ensure they properly secure NodeCG under SSL, create a secure key in the `cfg/nodecg-rest.json` folder of their install, or otherwise isolate their NodeCG installation. This bundle can read/write any Replicant, and can create any arbitrary Message, so do not use them for sensitive values.

# API

`POST /rest/message/:name`

This sends a message to the `nodecg-rest` namespace. This might not be useful unless you intend to build your bundle around nodecg-rest. This optionally takes JSON formatted data with a `data` value to send as the message contents.

`POST /rest/message/:bundleName/:name`

This sends a message to the specified bundle's namespace. This optionally takes JSON formatted data with a `data` value to send as the message contents.

`POST /rest/replicant/:name`

This reads a replicant in the `nodecg-rest` namespace. This might not be useful unless you intend to build your bundle around nodecg-rest.

`PUT /rest/replicant/:name`

This writes a value to a replicant in the `nodecg-rest` namespace. This might not be useful unless you intend to build your bundle around nodecg-rest. This takes JSON formatted data with a `data` value to write as the replicant's value.

`POST /rest/replicant/:bundleName/:name`

This reads a replicant in the specified bundle's namespace.

`PUT /rest/replicant/:bundleName/:name`

This writes a value to a replicant in the specified bundle's namespace. This takes JSON formatted data with a `data` value to write as the replicant's value.

# Authentication

This bundle optionally does a very low level of authentication. By setting a "key" value in `cfg/nodecg-rest.json`, you can enable it. Authorization is done by including the key in your post/put data, also named "key".