(window.webpackJsonp=window.webpackJsonp||[]).push([[39],{329:function(t,s,a){"use strict";a.r(s);var e=a(7),n=Object(e.a)({},(function(){var t=this,s=t._self._c;return s("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[s("h1",{attrs:{id:"deviceconnect-ionic-capacitor"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#deviceconnect-ionic-capacitor"}},[t._v("#")]),t._v(" DeviceConnect: Ionic Capacitor")]),t._v(" "),s("p",[t._v("Device Connect Ionic Capacitor SDK is used to collect anonymised non-PII data from the devices of the users after taking explicit user consent.")]),t._v(" "),s("h2",{attrs:{id:"installation"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#installation"}},[t._v("#")]),t._v(" Installation")]),t._v(" "),s("p",[t._v("Using yarn:")]),t._v(" "),s("div",{staticClass:"language-sh extra-class"},[s("pre",{pre:!0,attrs:{class:"language-sh"}},[s("code",[s("span",{pre:!0,attrs:{class:"token function"}},[t._v("yarn")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("add")]),t._v(" ionic-risk-sdk\n")])])]),s("p",[t._v("or using npm:")]),t._v(" "),s("div",{staticClass:"language-sh extra-class"},[s("pre",{pre:!0,attrs:{class:"language-sh"}},[s("code",[s("span",{pre:!0,attrs:{class:"token function"}},[t._v("npm")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("install")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token parameter variable"}},[t._v("--save")]),t._v(" ionic-risk-sdk\n")])])]),s("p",[t._v("Register our SDK using "),s("code",[t._v("registerPlugin(IonicRiskSdkPlugin.class);")]),t._v(" in your "),s("code",[t._v("MainActivity")]),t._v(" class.")]),t._v(" "),s("h2",{attrs:{id:"authentication"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#authentication"}},[t._v("#")]),t._v(" Authentication")]),t._v(" "),s("p",[t._v("Open Android Studio and in the project level "),s("code",[t._v("build.gradle")]),t._v(" file, add the repository URLs to all "),s("code",[t._v("allprojects")]),t._v(" block.")]),t._v(" "),s("div",{staticClass:"language-groovy extra-class"},[s("pre",{pre:!0,attrs:{class:"language-groovy"}},[s("code",[t._v("maven "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    url "),s("span",{pre:!0,attrs:{class:"token interpolation-string"}},[s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"s3://risk-manager-android-sdk/artifacts"')])]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("credentials")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("AwsCredentials"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n        accessKey "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token interpolation-string"}},[s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"<ACCESS_KEY>"')])]),t._v("\n        secretKey "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token interpolation-string"}},[s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"<SECRET_KEY>"')])]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n    content "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n        "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("includeGroup")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token interpolation-string"}},[s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"in.finbox"')])]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),s("p",[t._v("Add the following keys in "),s("code",[t._v("local.properties")]),t._v(" file:")]),t._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[t._v("ACCESS_KEY=<ACCESS_KEY>\nSECRET_KEY=<SECRET_KEY>\nDC_SDK_VERSION=<DC_SDK_VERSION>\nCOMMON_SDK_VERSION=<COMMON_SDK_VERSION>\nCOMMON_FLAVOR=<COMMON_FLAVOR>\nLOGGER_SDK_VERSION=<LOGGER_SDK_VERSION>\n")])])]),s("div",{staticClass:"custom-block warning"},[s("p",{staticClass:"custom-block-title"},[t._v("NOTE")]),t._v(" "),s("p",[t._v("Following will be shared by FinBox team at the time of integration:")]),t._v(" "),s("ul",[s("li",[s("code",[t._v("ACCESS_KEY")])]),t._v(" "),s("li",[s("code",[t._v("SECRET_KEY")])]),t._v(" "),s("li",[s("code",[t._v("DC_SDK_VERSION")])]),t._v(" "),s("li",[s("code",[t._v("COMMON_SDK_VERSION")])]),t._v(" "),s("li",[s("code",[t._v("COMMON_FLAVOR")])]),t._v(" "),s("li",[s("code",[t._v("LOGGER_SDK_VERSION")])]),t._v(" "),s("li",[s("code",[t._v("CLIENT_API_KEY")])])])]),t._v(" "),s("h2",{attrs:{id:"create-user"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#create-user"}},[t._v("#")]),t._v(" Create User")]),t._v(" "),s("p",[t._v("Call "),s("code",[t._v("createUser")]),t._v(" method to create the user. It takes Client Api Key and Customer Id as the arguments.")]),t._v(" "),s("div",{staticClass:"custom-block danger"},[s("p",{staticClass:"custom-block-title"},[t._v("IMPORTANT")]),t._v(" "),s("p",[t._v("Please make sure "),s("code",[t._v("CUSTOMER_ID")]),t._v(" is "),s("strong",[t._v("not more than 64")]),t._v(" characters and is "),s("strong",[t._v("alphanumeric")]),t._v(" (with no special characters). Also it should never be "),s("code",[t._v("null")]),t._v(" or a blank string "),s("code",[t._v('""')]),t._v(".")])]),t._v(" "),s("p",[t._v("The response to this method (success or failure) can be captured using the callback.")]),t._v(" "),s("div",{staticClass:"language-javascript extra-class"},[s("pre",{pre:!0,attrs:{class:"language-javascript"}},[s("code",[s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("import")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" IonicRiskSdk "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("from")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'ionic-risk-sdk'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//Function to trigger RiskSdk")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" token "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("await")]),t._v(" IonicRiskSdk"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("createUser")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token literal-property property"}},[t._v("apiKey")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token constant"}},[t._v("API_KEY")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token literal-property property"}},[t._v("customerId")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token constant"}},[t._v("CUSTOMER_ID")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])]),s("p",[t._v("You can read about the errors in the "),s("RouterLink",{attrs:{to:"/device-connect/error-codes.html"}},[t._v("Error Codes")]),t._v(" section.")],1),t._v(" "),s("h2",{attrs:{id:"start-periodic-sync"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#start-periodic-sync"}},[t._v("#")]),t._v(" Start Periodic Sync")]),t._v(" "),s("p",[t._v("This is to be called only on a successful response to "),s("code",[t._v("createUser")]),t._v(" method's callback. On calling this the syncs will start for all the data sources configured as per permissions. The method below syncs data in the background at regular intervals:")]),t._v(" "),s("div",{staticClass:"language-javascript extra-class"},[s("pre",{pre:!0,attrs:{class:"language-javascript"}},[s("code",[t._v("IonicRiskSdk"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("startPeriodicSync")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//Start the sync periodically after every 12 hour")]),t._v("\n")])])]),s("div",{staticClass:"custom-block tip"},[s("p",{staticClass:"custom-block-title"},[t._v("Handle Sync Frequency")]),t._v(" "),s("p",[s("code",[t._v("startPeriodicSync")]),t._v(" takes one argument which indicates the frequency of sync "),s("strong",[t._v("in hours")]),t._v(".")])]),t._v(" "),s("h2",{attrs:{id:"cancel-periodic"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#cancel-periodic"}},[t._v("#")]),t._v(" Cancel Periodic")]),t._v(" "),s("p",[t._v("If you have already set up the sync for the user data, you can cancel it any time by the following code:")]),t._v(" "),s("div",{staticClass:"language-javascript extra-class"},[s("pre",{pre:!0,attrs:{class:"language-javascript"}},[s("code",[t._v("IonicRiskSdk"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("stopPeriodicSync")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])]),s("h2",{attrs:{id:"reset-user-data"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#reset-user-data"}},[t._v("#")]),t._v(" Reset User Data")]),t._v(" "),s("p",[t._v("In case the user data needs to be removed on the device so that you can re-sync the entire data, use the method "),s("code",[t._v("resetData")]),t._v(".")]),t._v(" "),s("div",{staticClass:"language-javascript extra-class"},[s("pre",{pre:!0,attrs:{class:"language-javascript"}},[s("code",[t._v("IonicRiskSdk"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("resetData")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])]),s("h2",{attrs:{id:"forget-user"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#forget-user"}},[t._v("#")]),t._v(" Forget User")]),t._v(" "),s("p",[t._v("In case the user choose to be forgotten, use the method "),s("code",[t._v("forgetUser")]),t._v(". This will delete the user details in our system.")]),t._v(" "),s("div",{staticClass:"language-javascript extra-class"},[s("pre",{pre:!0,attrs:{class:"language-javascript"}},[s("code",[t._v("IonicRiskSdk"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("forgetUser")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])])])}),[],!1,null,null,null);s.default=n.exports}}]);