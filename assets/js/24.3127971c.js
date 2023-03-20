(window.webpackJsonp=window.webpackJsonp||[]).push([[24],{314:function(t,e,a){"use strict";a.r(e);var s=a(7),n=Object(s.a)({},(function(){var t=this,e=t._self._c;return e("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[e("h1",{attrs:{id:"bankconnect-uploading-using-rest-api"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#bankconnect-uploading-using-rest-api"}},[t._v("#")]),t._v(" BankConnect: Uploading using REST API")]),t._v(" "),e("p",[t._v("BankConnect REST APIs can be used to submit bank statement PDFs for an entity.")]),t._v(" "),e("p",[t._v("You can also try these APIs on Postman. Check out "),e("RouterLink",{attrs:{to:"/bank-connect/#postman-collection"}},[t._v("this")]),t._v(" article for more details.")],1),t._v(" "),e("div",{staticClass:"custom-block warning"},[e("p",{staticClass:"custom-block-title"},[t._v("Request Format")]),t._v(" "),e("p",[t._v("BankConnect accepts all requests with form fields, so please make sure that all requests must be made with content-type "),e("code",[t._v("application/x-www-form-urlencoded")]),t._v(" or "),e("code",[t._v("multipart/form-data; boundary={boundary string}")])])]),t._v(" "),e("h2",{attrs:{id:"authentication"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#authentication"}},[t._v("#")]),t._v(" Authentication")]),t._v(" "),e("p",[t._v("FinBox BankConnect REST API uses API keys to authenticate requests. All API requests must be made over HTTPS. Calls made over plain HTTP will fail. API requests without authentication will also fail.")]),t._v(" "),e("p",[t._v("To make a successful request, required "),e("strong",[t._v("headers mentioned with each API")]),t._v(" must be present in the request.")]),t._v(" "),e("p",[t._v("In case wrong/incomplete/no keys were passed in headers, response will have "),e("strong",[t._v("401")]),t._v(" HTTP Code and payload as follows:")]),t._v(" "),e("div",{staticClass:"language-json extra-class"},[e("pre",{pre:!0,attrs:{class:"language-json"}},[e("code",[e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),e("span",{pre:!0,attrs:{class:"token property"}},[t._v('"detail"')]),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token string"}},[t._v('"Authentication credentials were not provided."')]),t._v("\n"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),e("div",{staticClass:"custom-block danger"},[e("p",{staticClass:"custom-block-title"},[t._v("IMPORTANT")]),t._v(" "),e("p",[t._v("Upload APIs do not require use of "),e("strong",[t._v("Server Hash")])])]),t._v(" "),e("h2",{attrs:{id:"specifying-the-entity"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#specifying-the-entity"}},[t._v("#")]),t._v(" Specifying the Entity")]),t._v(" "),e("p",[t._v("In Upload API, "),e("code",[t._v("link_id")]),t._v(" needs to be specified as a parameter. If an entity was already created with the given "),e("code",[t._v("link_id")]),t._v(", the upload will happen under the same entity, if not it will create a new entity with the "),e("code",[t._v("link_id")]),t._v(" and return the "),e("code",[t._v("entity_id")]),t._v(" in response.")]),t._v(" "),e("p",[t._v("If you already have an "),e("code",[t._v("entity_id")]),t._v(", you can mention it directly as well instead of "),e("code",[t._v("link_id")]),t._v(".")]),t._v(" "),e("div",{staticClass:"custom-block danger"},[e("p",{staticClass:"custom-block-title"},[t._v("IMPORTANT")]),t._v(" "),e("p",[t._v("In case both "),e("code",[t._v("link_id")]),t._v(" and "),e("code",[t._v("entity_id")]),t._v(" are present in request, "),e("code",[t._v("link_id")]),t._v(" will be ignored and "),e("code",[t._v("entity_id")]),t._v(" will be used.")])]),t._v(" "),e("h2",{attrs:{id:"password-protected-pdfs"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#password-protected-pdfs"}},[t._v("#")]),t._v(" Password Protected PDFs")]),t._v(" "),e("p",[t._v("If the bank statements are password protected it is required to pass the password in the "),e("code",[t._v("pdf_password")]),t._v(" parameter in upload APIs. The next section lists the upload APIs.")]),t._v(" "),e("h2",{attrs:{id:"uploading-statements-in-files"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#uploading-statements-in-files"}},[t._v("#")]),t._v(" Uploading statements in files")]),t._v(" "),e("p",[t._v("This section lists the endpoint and request format for upload APIs that accepts file in request. Response Format is "),e("RouterLink",{attrs:{to:"/bank-connect/upload-rest-api.html#response-format"}},[t._v("present here")]),t._v(".")],1),t._v(" "),e("h3",{attrs:{id:"bank-name-is-known"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#bank-name-is-known"}},[t._v("#")]),t._v(" Bank name is known")]),t._v(" "),e("div",{staticClass:"custom-block tip"},[e("p",{staticClass:"custom-block-title"},[t._v("Endpoint")]),t._v(" "),e("p",[t._v("POST "),e("strong",[t._v(t._s(t.$page.frontmatter.base_url)+"/"+t._s(t.$page.frontmatter.version)+"/statement/upload/?identity=true")])])]),t._v(" "),e("h3",{attrs:{id:"authentication-2"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#authentication-2"}},[t._v("#")]),t._v(" Authentication")]),t._v(" "),e("p",[t._v("Request header "),e("code",[t._v("x-api-key")]),t._v(" with API Key as value must be present in request.")]),t._v(" "),e("h3",{attrs:{id:"parameters"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#parameters"}},[t._v("#")]),t._v(" Parameters")]),t._v(" "),e("table",[e("thead",[e("tr",[e("th",[t._v("Name")]),t._v(" "),e("th",[t._v("Type")]),t._v(" "),e("th",[t._v("Description")]),t._v(" "),e("th",[t._v("Required")]),t._v(" "),e("th",[t._v("Default")])])]),t._v(" "),e("tbody",[e("tr",[e("td",[t._v("file")]),t._v(" "),e("td",[t._v("file")]),t._v(" "),e("td",[t._v("the statement pdf file")]),t._v(" "),e("td",[t._v("Yes")]),t._v(" "),e("td",[t._v("-")])]),t._v(" "),e("tr",[e("td",[t._v("bank_name")]),t._v(" "),e("td",[t._v("string")]),t._v(" "),e("td",[t._v("a valid "),e("RouterLink",{attrs:{to:"/bank-connect/appendix.html#bank-identifiers"}},[t._v("bank identifier")])],1),t._v(" "),e("td",[t._v("Yes")]),t._v(" "),e("td",[t._v("-")])]),t._v(" "),e("tr",[e("td",[t._v("link_id")]),t._v(" "),e("td",[t._v("string")]),t._v(" "),e("td",[t._v("a "),e("code",[t._v("link_id")]),t._v(" against which you want to upload the statement")]),t._v(" "),e("td",[t._v("Yes")]),t._v(" "),e("td",[t._v("-")])]),t._v(" "),e("tr",[e("td",[t._v("entity_id")]),t._v(" "),e("td",[t._v("string")]),t._v(" "),e("td",[t._v("an "),e("code",[t._v("entity_id")]),t._v(" against which you want to upload the statement")]),t._v(" "),e("td",[t._v("No")]),t._v(" "),e("td",[t._v("-")])]),t._v(" "),e("tr",[e("td",[t._v("pdf_password")]),t._v(" "),e("td",[t._v("string")]),t._v(" "),e("td",[t._v("password for the pdf in case it is password protected")]),t._v(" "),e("td",[t._v("No")]),t._v(" "),e("td",[t._v("-")])])])]),t._v(" "),e("h3",{attrs:{id:"bank-name-not-known"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#bank-name-not-known"}},[t._v("#")]),t._v(" Bank name not known "),e("Badge",{attrs:{text:"beta",type:"warn"}})],1),t._v(" "),e("p",[t._v("In case you don't know bank name, and want BankConnect to automatically identify the bank name:")]),t._v(" "),e("div",{staticClass:"custom-block tip"},[e("p",{staticClass:"custom-block-title"},[t._v("Endpoint")]),t._v(" "),e("p",[t._v("POST "),e("strong",[t._v(t._s(t.$page.frontmatter.base_url)+"/"+t._s(t.$page.frontmatter.version)+"/statement/bankless_upload/?identity=true")])])]),t._v(" "),e("h3",{attrs:{id:"authentication-3"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#authentication-3"}},[t._v("#")]),t._v(" Authentication")]),t._v(" "),e("p",[t._v("Request header "),e("code",[t._v("x-api-key")]),t._v(" with API Key as value must be present in request.")]),t._v(" "),e("h3",{attrs:{id:"parameters-2"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#parameters-2"}},[t._v("#")]),t._v(" Parameters")]),t._v(" "),e("table",[e("thead",[e("tr",[e("th",[t._v("Name")]),t._v(" "),e("th",[t._v("Type")]),t._v(" "),e("th",[t._v("Description")]),t._v(" "),e("th",[t._v("Required")]),t._v(" "),e("th",[t._v("Default")])])]),t._v(" "),e("tbody",[e("tr",[e("td",[t._v("file")]),t._v(" "),e("td",[t._v("file")]),t._v(" "),e("td",[t._v("the statement pdf file")]),t._v(" "),e("td",[t._v("Yes")]),t._v(" "),e("td",[t._v("-")])]),t._v(" "),e("tr",[e("td",[t._v("link_id")]),t._v(" "),e("td",[t._v("string")]),t._v(" "),e("td",[t._v("a "),e("code",[t._v("link_id")]),t._v(" against which you want to upload the statement")]),t._v(" "),e("td",[t._v("Yes")]),t._v(" "),e("td",[t._v("-")])]),t._v(" "),e("tr",[e("td",[t._v("entity_id")]),t._v(" "),e("td",[t._v("string")]),t._v(" "),e("td",[t._v("an "),e("code",[t._v("entity_id")]),t._v(" against which you want to upload the statement")]),t._v(" "),e("td",[t._v("No")]),t._v(" "),e("td",[t._v("-")])]),t._v(" "),e("tr",[e("td",[t._v("pdf_password")]),t._v(" "),e("td",[t._v("string")]),t._v(" "),e("td",[t._v("password for the pdf in case it is password protected")]),t._v(" "),e("td",[t._v("No")]),t._v(" "),e("td",[t._v("-")])])])]),t._v(" "),e("h2",{attrs:{id:"uploading-base-64-encoded-statements"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#uploading-base-64-encoded-statements"}},[t._v("#")]),t._v(" Uploading base 64 encoded statements")]),t._v(" "),e("p",[t._v("This section lists the endpoint and request format for upload APIs that accepts base 64 encoded files. Response Format is "),e("RouterLink",{attrs:{to:"/bank-connect/upload-rest-api.html#response-format"}},[t._v("present here")]),t._v(".")],1),t._v(" "),e("h3",{attrs:{id:"bank-name-known"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#bank-name-known"}},[t._v("#")]),t._v(" Bank name known")]),t._v(" "),e("div",{staticClass:"custom-block tip"},[e("p",{staticClass:"custom-block-title"},[t._v("Endpoint")]),t._v(" "),e("p",[t._v("POST "),e("strong",[t._v(t._s(t.$page.frontmatter.base_url)+"/"+t._s(t.$page.frontmatter.version)+"/statement/upload_base64/?identity=true")])])]),t._v(" "),e("h3",{attrs:{id:"authentication-4"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#authentication-4"}},[t._v("#")]),t._v(" Authentication")]),t._v(" "),e("p",[t._v("Request header "),e("code",[t._v("x-api-key")]),t._v(" with API Key as value must be present in request.")]),t._v(" "),e("h3",{attrs:{id:"parameters-3"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#parameters-3"}},[t._v("#")]),t._v(" Parameters")]),t._v(" "),e("table",[e("thead",[e("tr",[e("th",[t._v("Name")]),t._v(" "),e("th",[t._v("Type")]),t._v(" "),e("th",[t._v("Description")]),t._v(" "),e("th",[t._v("Required")]),t._v(" "),e("th",[t._v("Default")])])]),t._v(" "),e("tbody",[e("tr",[e("td",[t._v("file")]),t._v(" "),e("td",[t._v("string")]),t._v(" "),e("td",[t._v("the statement pdf file in base 64 encoded string")]),t._v(" "),e("td",[t._v("Yes")]),t._v(" "),e("td",[t._v("-")])]),t._v(" "),e("tr",[e("td",[t._v("bank_name")]),t._v(" "),e("td",[t._v("string")]),t._v(" "),e("td",[t._v("a valid "),e("RouterLink",{attrs:{to:"/bank-connect/appendix.html#bank-identifiers"}},[t._v("bank identifier")])],1),t._v(" "),e("td",[t._v("Yes")]),t._v(" "),e("td",[t._v("-")])]),t._v(" "),e("tr",[e("td",[t._v("link_id")]),t._v(" "),e("td",[t._v("string")]),t._v(" "),e("td",[t._v("a "),e("code",[t._v("link_id")]),t._v(" against which you want to upload the statement")]),t._v(" "),e("td",[t._v("Yes")]),t._v(" "),e("td",[t._v("-")])]),t._v(" "),e("tr",[e("td",[t._v("entity_id")]),t._v(" "),e("td",[t._v("string")]),t._v(" "),e("td",[t._v("an "),e("code",[t._v("entity_id")]),t._v(" against which you want to upload the statement")]),t._v(" "),e("td",[t._v("No")]),t._v(" "),e("td",[t._v("-")])]),t._v(" "),e("tr",[e("td",[t._v("pdf_password")]),t._v(" "),e("td",[t._v("string")]),t._v(" "),e("td",[t._v("password for the pdf in case it is password protected")]),t._v(" "),e("td",[t._v("No")]),t._v(" "),e("td",[t._v("-")])])])]),t._v(" "),e("h3",{attrs:{id:"bank-name-not-known-2"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#bank-name-not-known-2"}},[t._v("#")]),t._v(" Bank name not known "),e("Badge",{attrs:{text:"beta",type:"warn"}})],1),t._v(" "),e("p",[t._v("In case you don't know bank name, and want BankConnect to automatically identify the bank name:")]),t._v(" "),e("div",{staticClass:"custom-block tip"},[e("p",{staticClass:"custom-block-title"},[t._v("Endpoint")]),t._v(" "),e("p",[t._v("POST "),e("strong",[t._v(t._s(t.$page.frontmatter.base_url)+"/"+t._s(t.$page.frontmatter.version)+"/statement/bankless_upload_base64/?identity=true")])])]),t._v(" "),e("h3",{attrs:{id:"authentication-5"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#authentication-5"}},[t._v("#")]),t._v(" Authentication")]),t._v(" "),e("p",[t._v("Request header "),e("code",[t._v("x-api-key")]),t._v(" with API Key as value must be present in request.")]),t._v(" "),e("h3",{attrs:{id:"parameters-4"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#parameters-4"}},[t._v("#")]),t._v(" Parameters")]),t._v(" "),e("table",[e("thead",[e("tr",[e("th",[t._v("Name")]),t._v(" "),e("th",[t._v("Type")]),t._v(" "),e("th",[t._v("Description")]),t._v(" "),e("th",[t._v("Required")]),t._v(" "),e("th",[t._v("Default")])])]),t._v(" "),e("tbody",[e("tr",[e("td",[t._v("file")]),t._v(" "),e("td",[t._v("string")]),t._v(" "),e("td",[t._v("the statement pdf file in base 64 encoded format")]),t._v(" "),e("td",[t._v("Yes")]),t._v(" "),e("td",[t._v("-")])]),t._v(" "),e("tr",[e("td",[t._v("link_id")]),t._v(" "),e("td",[t._v("string")]),t._v(" "),e("td",[t._v("a "),e("code",[t._v("link_id")]),t._v(" against which you want to upload the statement")]),t._v(" "),e("td",[t._v("Yes")]),t._v(" "),e("td",[t._v("-")])]),t._v(" "),e("tr",[e("td",[t._v("entity_id")]),t._v(" "),e("td",[t._v("string")]),t._v(" "),e("td",[t._v("an "),e("code",[t._v("entity_id")]),t._v(" against which you want to upload the statement")]),t._v(" "),e("td",[t._v("No")]),t._v(" "),e("td",[t._v("-")])]),t._v(" "),e("tr",[e("td",[t._v("pdf_password")]),t._v(" "),e("td",[t._v("string")]),t._v(" "),e("td",[t._v("password for the pdf in case it is password protected")]),t._v(" "),e("td",[t._v("No")]),t._v(" "),e("td",[t._v("-")])])])]),t._v(" "),e("h2",{attrs:{id:"uploading-statement-file-url"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#uploading-statement-file-url"}},[t._v("#")]),t._v(" Uploading statement file URL")]),t._v(" "),e("p",[t._v("This section lists the endpoint and request format for upload APIs that accepts file URLs. Response Format is "),e("RouterLink",{attrs:{to:"/bank-connect/upload-rest-api.html#response-format"}},[t._v("present here")]),t._v(".")],1),t._v(" "),e("h3",{attrs:{id:"bank-name-known-2"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#bank-name-known-2"}},[t._v("#")]),t._v(" Bank name known")]),t._v(" "),e("div",{staticClass:"custom-block tip"},[e("p",{staticClass:"custom-block-title"},[t._v("Endpoint")]),t._v(" "),e("p",[t._v("POST "),e("strong",[t._v(t._s(t.$page.frontmatter.base_url)+"/"+t._s(t.$page.frontmatter.version)+"/statement/upload/?identity=true")])])]),t._v(" "),e("h3",{attrs:{id:"authentication-6"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#authentication-6"}},[t._v("#")]),t._v(" Authentication")]),t._v(" "),e("p",[t._v("Request header "),e("code",[t._v("x-api-key")]),t._v(" with API Key as value must be present in request.")]),t._v(" "),e("h3",{attrs:{id:"parameters-5"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#parameters-5"}},[t._v("#")]),t._v(" Parameters")]),t._v(" "),e("table",[e("thead",[e("tr",[e("th",[t._v("Name")]),t._v(" "),e("th",[t._v("Type")]),t._v(" "),e("th",[t._v("Description")]),t._v(" "),e("th",[t._v("Required")]),t._v(" "),e("th",[t._v("Default")])])]),t._v(" "),e("tbody",[e("tr",[e("td",[t._v("file_url")]),t._v(" "),e("td",[t._v("string")]),t._v(" "),e("td",[t._v("publicly accessible full file URL with protocol (HTTPS)")]),t._v(" "),e("td",[t._v("Yes")]),t._v(" "),e("td",[t._v("-")])]),t._v(" "),e("tr",[e("td",[t._v("bank_name")]),t._v(" "),e("td",[t._v("string")]),t._v(" "),e("td",[t._v("a valid "),e("RouterLink",{attrs:{to:"/bank-connect/appendix.html#bank-identifiers"}},[t._v("bank identifier")])],1),t._v(" "),e("td",[t._v("Yes")]),t._v(" "),e("td",[t._v("-")])]),t._v(" "),e("tr",[e("td",[t._v("link_id")]),t._v(" "),e("td",[t._v("string")]),t._v(" "),e("td",[t._v("a "),e("code",[t._v("link_id")]),t._v(" against which you want to upload the statement")]),t._v(" "),e("td",[t._v("Yes")]),t._v(" "),e("td",[t._v("-")])]),t._v(" "),e("tr",[e("td",[t._v("entity_id")]),t._v(" "),e("td",[t._v("string")]),t._v(" "),e("td",[t._v("an "),e("code",[t._v("entity_id")]),t._v(" against which you want to upload the statement")]),t._v(" "),e("td",[t._v("No")]),t._v(" "),e("td",[t._v("-")])]),t._v(" "),e("tr",[e("td",[t._v("pdf_password")]),t._v(" "),e("td",[t._v("string")]),t._v(" "),e("td",[t._v("password for the pdf in case it is password protected")]),t._v(" "),e("td",[t._v("No")]),t._v(" "),e("td",[t._v("-")])])])]),t._v(" "),e("h3",{attrs:{id:"bank-name-not-known-3"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#bank-name-not-known-3"}},[t._v("#")]),t._v(" Bank name not known "),e("Badge",{attrs:{text:"beta",type:"warn"}})],1),t._v(" "),e("p",[t._v("In case you don't know bank name, and want BankConnect to automatically identify the bank name:")]),t._v(" "),e("div",{staticClass:"custom-block tip"},[e("p",{staticClass:"custom-block-title"},[t._v("Endpoint")]),t._v(" "),e("p",[t._v("POST "),e("strong",[t._v(t._s(t.$page.frontmatter.base_url)+"/"+t._s(t.$page.frontmatter.version)+"/statement/bankless_upload/?identity=true")])])]),t._v(" "),e("h3",{attrs:{id:"authentication-7"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#authentication-7"}},[t._v("#")]),t._v(" Authentication")]),t._v(" "),e("p",[t._v("Request header "),e("code",[t._v("x-api-key")]),t._v(" with API Key as value must be present in request.")]),t._v(" "),e("h3",{attrs:{id:"parameters-6"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#parameters-6"}},[t._v("#")]),t._v(" Parameters")]),t._v(" "),e("table",[e("thead",[e("tr",[e("th",[t._v("Name")]),t._v(" "),e("th",[t._v("Type")]),t._v(" "),e("th",[t._v("Description")]),t._v(" "),e("th",[t._v("Required")]),t._v(" "),e("th",[t._v("Default")])])]),t._v(" "),e("tbody",[e("tr",[e("td",[t._v("file_url")]),t._v(" "),e("td",[t._v("string")]),t._v(" "),e("td",[t._v("publicly accessible full file URL with protocol (HTTP / HTTPS)")]),t._v(" "),e("td",[t._v("Yes")]),t._v(" "),e("td",[t._v("-")])]),t._v(" "),e("tr",[e("td",[t._v("link_id")]),t._v(" "),e("td",[t._v("string")]),t._v(" "),e("td",[t._v("a "),e("code",[t._v("link_id")]),t._v(" against which you want to upload the statement")]),t._v(" "),e("td",[t._v("Yes")]),t._v(" "),e("td",[t._v("-")])]),t._v(" "),e("tr",[e("td",[t._v("entity_id")]),t._v(" "),e("td",[t._v("string")]),t._v(" "),e("td",[t._v("an "),e("code",[t._v("entity_id")]),t._v(" against which you want to upload the statement")]),t._v(" "),e("td",[t._v("No")]),t._v(" "),e("td",[t._v("-")])]),t._v(" "),e("tr",[e("td",[t._v("pdf_password")]),t._v(" "),e("td",[t._v("string")]),t._v(" "),e("td",[t._v("password for the pdf in case it is password protected")]),t._v(" "),e("td",[t._v("No")]),t._v(" "),e("td",[t._v("-")])])])]),t._v(" "),e("h2",{attrs:{id:"response-format"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#response-format"}},[t._v("#")]),t._v(" Response Format")]),t._v(" "),e("p",[t._v("All the above APIs give the response in the format below in case of successful file upload with a "),e("strong",[t._v("200 HTTP Code")]),t._v(":")]),t._v(" "),e("div",{staticClass:"language-json extra-class"},[e("pre",{pre:!0,attrs:{class:"language-json"}},[e("code",[e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),e("span",{pre:!0,attrs:{class:"token property"}},[t._v('"bank_name"')]),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token string"}},[t._v('"sbi"')]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    "),e("span",{pre:!0,attrs:{class:"token property"}},[t._v('"statement_id"')]),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token string"}},[t._v('"uuid4_for_statement"')]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    "),e("span",{pre:!0,attrs:{class:"token property"}},[t._v('"entity_id"')]),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token string"}},[t._v('"uuid4_for_entity"')]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    "),e("span",{pre:!0,attrs:{class:"token property"}},[t._v('"identity"')]),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n        "),e("span",{pre:!0,attrs:{class:"token property"}},[t._v('"account_number"')]),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token string"}},[t._v('"Account Number Extracted"')]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n        "),e("span",{pre:!0,attrs:{class:"token property"}},[t._v('"name"')]),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token string"}},[t._v('"Name Extracted"')]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n        "),e("span",{pre:!0,attrs:{class:"token property"}},[t._v('"address"')]),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token string"}},[t._v('"Address extracted"')]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n        "),e("span",{pre:!0,attrs:{class:"token property"}},[t._v('"account_category"')]),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token string"}},[t._v('"individual"')]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n        "),e("span",{pre:!0,attrs:{class:"token property"}},[t._v('"credit_limit"')]),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token number"}},[t._v("0")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n        "),e("span",{pre:!0,attrs:{class:"token property"}},[t._v('"account_id"')]),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token string"}},[t._v('"uuid4_for_account"')]),t._v("\n    "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    "),e("span",{pre:!0,attrs:{class:"token property"}},[t._v('"date_range"')]),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n        "),e("span",{pre:!0,attrs:{class:"token property"}},[t._v('"from_date"')]),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token string"}},[t._v('"2019-12-25"')]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n        "),e("span",{pre:!0,attrs:{class:"token property"}},[t._v('"to_date"')]),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token string"}},[t._v('"2020-03-26"')]),t._v("\n    "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    "),e("span",{pre:!0,attrs:{class:"token property"}},[t._v('"is_fraud"')]),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token boolean"}},[t._v("false")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    "),e("span",{pre:!0,attrs:{class:"token property"}},[t._v('"fraud_type"')]),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token null keyword"}},[t._v("null")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    "),e("span",{pre:!0,attrs:{class:"token property"}},[t._v('"status"')]),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),t._v("\n"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),e("p",[t._v("The identity information returned in the response can be used to verify the customer, while the time periods can be used to check whether the statement was uploaded for the required period.")]),t._v(" "),e("table",[e("thead",[e("tr",[e("th",[t._v("Key")]),t._v(" "),e("th",[t._v("Type")]),t._v(" "),e("th",[t._v("Description")])])]),t._v(" "),e("tbody",[e("tr",[e("td",[t._v("bank_name")]),t._v(" "),e("td",[t._v("string")]),t._v(" "),e("td",[t._v("indicates the bank, refer "),e("RouterLink",{attrs:{to:"/bank-connect/appendix.html#bank-identifiers"}},[t._v("here")]),t._v(" for complete list")],1)]),t._v(" "),e("tr",[e("td",[t._v("statement_id")]),t._v(" "),e("td",[t._v("string")]),t._v(" "),e("td",[t._v("Unique identifier for Statement")])]),t._v(" "),e("tr",[e("td",[t._v("entity_id")]),t._v(" "),e("td",[t._v("string")]),t._v(" "),e("td",[t._v("unique identifier for entity")])]),t._v(" "),e("tr",[e("td",[t._v("date_range")]),t._v(" "),e("td",[t._v("object")]),t._v(" "),e("td",[t._v("contains "),e("code",[t._v("from_date")]),t._v(" and "),e("code",[t._v("to_date")]),t._v(" strings indicating the time period in "),e("code",[t._v("YYYY-MM-DD")]),t._v(" format")])]),t._v(" "),e("tr",[e("td",[t._v("is_fraud")]),t._v(" "),e("td",[t._v("boolean")]),t._v(" "),e("td",[t._v("indicates if a metadata fraud was detected")])]),t._v(" "),e("tr",[e("td",[t._v("fraud_type")]),t._v(" "),e("td",[t._v("string")]),t._v(" "),e("td",[t._v("indicates the metadata fraud type, if no metadata fraud found, its value is "),e("code",[t._v("null")])])]),t._v(" "),e("tr",[e("td",[t._v("identity")]),t._v(" "),e("td",[t._v("object")]),t._v(" "),e("td",[t._v("contains multiple identity information keys extracted from the statement")])]),t._v(" "),e("tr",[e("td",[t._v("account_id")]),t._v(" "),e("td",[t._v("string")]),t._v(" "),e("td",[t._v("unique identifier for account")])]),t._v(" "),e("tr",[e("td",[t._v("account_number")]),t._v(" "),e("td",[t._v("string")]),t._v(" "),e("td",[t._v("bank account number")])]),t._v(" "),e("tr",[e("td",[t._v("account_category")]),t._v(" "),e("td",[t._v("string")]),t._v(" "),e("td",[t._v("account category, can be "),e("code",[t._v("individual")]),t._v(" or "),e("code",[t._v("corporate")])])]),t._v(" "),e("tr",[e("td",[t._v("credit_limit")]),t._v(" "),e("td",[t._v("Integer")]),t._v(" "),e("td",[t._v("limit up to which a company can withdraw from the working capital limit sanctioned")])]),t._v(" "),e("tr",[e("td",[t._v("address")]),t._v(" "),e("td",[t._v("string")]),t._v(" "),e("td",[t._v("address of the bank account holder")])]),t._v(" "),e("tr",[e("td",[t._v("name")]),t._v(" "),e("td",[t._v("string")]),t._v(" "),e("td",[t._v("name of the bank account holder")])]),t._v(" "),e("tr",[e("td",[t._v("status")]),t._v(" "),e("td",[t._v("integer")]),t._v(" "),e("td",[t._v("contains the status code for API, should be 1 for success. Other possible values are listed in Bad Requests(/bank-connect/upload-rest-api.html#bad-request-cases) section")])])])]),t._v(" "),e("div",{staticClass:"custom-block warning"},[e("p",{staticClass:"custom-block-title"},[t._v("NOTE")]),t._v(" "),e("ul",[e("li",[e("code",[t._v("fraud_type")]),t._v(" field is "),e("code",[t._v("null")]),t._v(" in case "),e("code",[t._v("is_fraud")]),t._v(" field is false, otherwise it is a string. Please refer to "),e("RouterLink",{attrs:{to:"/bank-connect/fraud.html"}},[t._v("Fraud")]),t._v(" section to know more about it.")],1),t._v(" "),e("li",[t._v("Some of the fields within the identity dictionary, or the "),e("code",[t._v("from_date")]),t._v(" and "),e("code",[t._v("to_date")]),t._v(" maybe "),e("code",[t._v("null")]),t._v(" for few statements depending on the bank statement format and what all information is present on the top of the statement. The "),e("code",[t._v("from_date")]),t._v(" and the "),e("code",[t._v("to_date")]),t._v(" in case are returned as "),e("code",[t._v("null")]),t._v(", are updated for the statement at a later stage when transactions are extracted.")]),t._v(" "),e("li",[t._v("The query parameter "),e("code",[t._v("?identity=true")]),t._v(" is optional for both the APIs above, if not specified the response will only include "),e("code",[t._v("entity_id")]),t._v(", "),e("code",[t._v("statement_id")]),t._v(" and "),e("code",[t._v("bank_name")]),t._v(" fields in case of successful upload.")])])]),t._v(" "),e("h2",{attrs:{id:"bad-request-cases"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#bad-request-cases"}},[t._v("#")]),t._v(" Bad Request Cases")]),t._v(" "),e("p",[t._v("In case of successful upload, you'll get the "),e("code",[t._v("status")]),t._v(" field value as "),e("code",[t._v("1")]),t._v(". Following are bad request cases with status codes:")]),t._v(" "),e("table",[e("thead",[e("tr",[e("th",[t._v("Case")]),t._v(" "),e("th",[t._v("HTTP status code")]),t._v(" "),e("th",[t._v("status field value")]),t._v(" "),e("th",[t._v("Sample response")])])]),t._v(" "),e("tbody",[e("tr",[e("td",[t._v("Compulsory field is missing")]),t._v(" "),e("td",[t._v("400")]),t._v(" "),e("td",[t._v("0")]),t._v(" "),e("td",[e("code",[t._v('{"file": ["This field is required."], "status": 0}')])])]),t._v(" "),e("tr",[e("td",[t._v("Invalid field value")]),t._v(" "),e("td",[t._v("400")]),t._v(" "),e("td",[t._v("0")]),t._v(" "),e("td",[e("code",[t._v('{"file": ["Invalid Base 64 string"], "status": 0}')])])]),t._v(" "),e("tr",[e("td",[t._v("Incorrect Content Type")]),t._v(" "),e("td",[t._v("400")]),t._v(" "),e("td",[t._v("0")]),t._v(" "),e("td",[e("code",[t._v('{"file": ["This field must be present as a form field. Send request with content type x-www-form-urlencoded or form-data"], "status": 0}')])])]),t._v(" "),e("tr",[e("td",[t._v("Trial Expired for Dev Credentials")]),t._v(" "),e("td",[t._v("402")]),t._v(" "),e("td",[t._v("2")]),t._v(" "),e("td",[e("code",[t._v('{"message": "Your trial period has expired. Please request FinBox to upgrade your plan", "status": 2}')])])]),t._v(" "),e("tr",[e("td",[t._v("Password Incorrect")]),t._v(" "),e("td",[t._v("400")]),t._v(" "),e("td",[t._v("3")]),t._v(" "),e("td",[e("code",[t._v('{"entity_id": "some_long_uuid4", "message": "Password incorrect", "status": 3}')])])]),t._v(" "),e("tr",[e("td",[t._v("Specified bank doesn't match with detected bank")]),t._v(" "),e("td",[t._v("400")]),t._v(" "),e("td",[t._v("4")]),t._v(" "),e("td",[e("code",[t._v('{"entity_id": "some_long_uuid4", "message": "Not axis statement", "status": 4}')])])]),t._v(" "),e("tr",[e("td",[t._v("Cannot Detect Bank (Bank less APIs only)")]),t._v(" "),e("td",[t._v("400")]),t._v(" "),e("td",[t._v("5")]),t._v(" "),e("td",[e("code",[t._v('{"entity_id": "some_long_uuid4", "message": "Unable to detect bank. Please provide BANK NAME.", "status": 5}')])])]),t._v(" "),e("tr",[e("td",[t._v("Non Parsable PDF - PDF file is corrupted or has no selectable text (only scanned images)")]),t._v(" "),e("td",[t._v("400")]),t._v(" "),e("td",[t._v("6")]),t._v(" "),e("td",[e("code",[t._v('{"entity_id": "some_long_uuid4", "message": "PDF is not parsable", "status": 6}')])])]),t._v(" "),e("tr",[e("td",[t._v("Balance, date and amount columns are not present in the statement")]),t._v(" "),e("td",[t._v("400")]),t._v(" "),e("td",[t._v("7")]),t._v(" "),e("td",[e("code",[t._v('{"entity_id": "some_long_uuid4", "message": "Unsupported Bank Statement Format. It should have balance, date and amount columns.", "status": 7}')])])])])]),t._v(" "),e("div",{staticClass:"custom-block danger"},[e("p",{staticClass:"custom-block-title"},[t._v("IMPORTANT")]),t._v(" "),e("ul",[e("li",[t._v("We do not support scanned PDF images, if uploaded we throw a "),e("strong",[t._v("400 HTTP Code")]),t._v(" with the "),e("code",[t._v("status")]),t._v(" as "),e("code",[t._v("6")])]),t._v(" "),e("li",[t._v("In case a valid PDF comes as an input, and we are not able to extract information from it, API will give a "),e("strong",[t._v("200 HTTP Code")]),t._v(" but will have "),e("strong",[t._v("identity")]),t._v(" information in response as "),e("code",[t._v("null")]),t._v(". Our quality team takes care of such cases, and new templates are added within 24 hours.")]),t._v(" "),e("li",[t._v("In case you are in "),e("strong",[t._v("DEV")]),t._v(" environment and your "),e("strong",[t._v("trial period has expired")]),t._v(", then upload APIs will give you a response with "),e("strong",[t._v("402 HTTP Code")]),t._v(". To fix this please request FinBox to upgrade your plan.")])])])])}),[],!1,null,null,null);e.default=n.exports}}]);