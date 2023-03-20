(window.webpackJsonp=window.webpackJsonp||[]).push([[38],{328:function(t,s,a){"use strict";a.r(s);var e=a(7),n=Object(e.a)({},(function(){var t=this,s=t._self._c;return s("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[s("h1",{attrs:{id:"deviceconnect-ionic-react"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#deviceconnect-ionic-react"}},[t._v("#")]),t._v(" DeviceConnect: Ionic React")]),t._v(" "),s("p",[t._v("Device Connect Ionic React SDK is used to collect anonymised non-PII data from the devices of the users after taking explicit user consent.")]),t._v(" "),s("h2",{attrs:{id:"installation"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#installation"}},[t._v("#")]),t._v(" Installation")]),t._v(" "),s("p",[t._v("Using yarn:")]),t._v(" "),s("div",{staticClass:"language-sh extra-class"},[s("pre",{pre:!0,attrs:{class:"language-sh"}},[s("code",[s("span",{pre:!0,attrs:{class:"token function"}},[t._v("yarn")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("add")]),t._v(" react-native-risk-sdk\n")])])]),s("p",[t._v("or using npm:")]),t._v(" "),s("div",{staticClass:"language-sh extra-class"},[s("pre",{pre:!0,attrs:{class:"language-sh"}},[s("code",[s("span",{pre:!0,attrs:{class:"token function"}},[t._v("npm")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("install")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token parameter variable"}},[t._v("--save")]),t._v(" react-native-risk-sdk\n")])])]),s("p",[t._v("Our SDK will auto link automatically with your application")]),t._v(" "),s("h2",{attrs:{id:"authentication"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#authentication"}},[t._v("#")]),t._v(" Authentication")]),t._v(" "),s("p",[t._v("Open Android Studio and in the project level "),s("code",[t._v("build.gradle")]),t._v(" file, add the repository URLs to all "),s("code",[t._v("allprojects")]),t._v(" block.")]),t._v(" "),s("div",{staticClass:"language-groovy extra-class"},[s("pre",{pre:!0,attrs:{class:"language-groovy"}},[s("code",[t._v("maven "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    url "),s("span",{pre:!0,attrs:{class:"token interpolation-string"}},[s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"s3://risk-manager-android-sdk/artifacts"')])]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("credentials")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("AwsCredentials"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n        accessKey "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token interpolation-string"}},[s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"<ACCESS_KEY>"')])]),t._v("\n        secretKey "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token interpolation-string"}},[s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"<SECRET_KEY>"')])]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n    content "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n        "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("includeGroup")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token interpolation-string"}},[s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"in.finbox"')])]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),s("p",[t._v("Add the following keys in "),s("code",[t._v("local.properties")]),t._v(" file:")]),t._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[t._v("ACCESS_KEY=<ACCESS_KEY>\nSECRET_KEY=<SECRET_KEY>\nDC_SDK_VERSION=<DC_SDK_VERSION>\nCOMMON_SDK_VERSION=<COMMON_SDK_VERSION>\nCOMMON_FLAVOR=<COMMON_FLAVOR>\nLOGGER_SDK_VERSION=<LOGGER_SDK_VERSION>\n")])])]),s("div",{staticClass:"custom-block warning"},[s("p",{staticClass:"custom-block-title"},[t._v("NOTE")]),t._v(" "),s("p",[t._v("Following will be shared by FinBox team at the time of integration:")]),t._v(" "),s("ul",[s("li",[s("code",[t._v("ACCESS_KEY")])]),t._v(" "),s("li",[s("code",[t._v("SECRET_KEY")])]),t._v(" "),s("li",[s("code",[t._v("DC_SDK_VERSION")])]),t._v(" "),s("li",[s("code",[t._v("COMMON_SDK_VERSION")])]),t._v(" "),s("li",[s("code",[t._v("COMMON_FLAVOR")])]),t._v(" "),s("li",[s("code",[t._v("LOGGER_SDK_VERSION")])]),t._v(" "),s("li",[s("code",[t._v("CLIENT_API_KEY")])])])]),t._v(" "),s("h2",{attrs:{id:"create-user-method"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#create-user-method"}},[t._v("#")]),t._v(" Create User Method")]),t._v(" "),s("p",[t._v("Call "),s("code",[t._v("createUser")]),t._v(" method using the "),s("code",[t._v("FinBoxRiskSdk")]),t._v(" instance to create the user (first time) or check the API credentials for the SDK. It takes "),s("code",[t._v("CUSTOMER_ID")]),t._v(" as one of its arguments which is a unique identifier for a user.")]),t._v(" "),s("div",{staticClass:"custom-block danger"},[s("p",{staticClass:"custom-block-title"},[t._v("IMPORTANT")]),t._v(" "),s("p",[t._v("Please make sure "),s("code",[t._v("CUSTOMER_ID")]),t._v(" is "),s("strong",[t._v("not more than 64")]),t._v(" characters and is "),s("strong",[t._v("alphanumeric")]),t._v(" (with no special characters). Also it should never be "),s("code",[t._v("null")]),t._v(" or a blank string "),s("code",[t._v('""')]),t._v(".")])]),t._v(" "),s("p",[t._v("The response to this method (success or failure) can be captured using the callback, and on success "),s("RouterLink",{attrs:{to:"/device-connect/react-native.html#start-period-sync-method"}},[t._v("Start Periodic Sync Method")]),t._v(" should be called.")],1),t._v(" "),s("div",{staticClass:"language-javascript extra-class"},[s("pre",{pre:!0,attrs:{class:"language-javascript"}},[s("code",[s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("import")]),t._v(" FinBoxRiskSdk "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("from")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'react-native-risk-sdk'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//Function to trigger RiskSdk")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function-variable function"}},[t._v("callModule")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=>")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    FinBoxRiskSdk"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("createUser")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("\n        "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"CLIENT_API_KEY"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n        "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"CUSTOMER_ID"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n        "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("errorStatus")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=>")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n     "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// Error Callback")]),t._v("\n            console"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("log")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"Error status -> "')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" errorStatus"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n        "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" \n        "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("msg")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=>")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n            "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// Success Callback, Call the periodic sync once the user has been created")]),t._v("\n     console"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("log")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"Final message"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" msg"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n     FinBoxRiskSdk"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("startPeriodicSync")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("12")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//Start the sync periodically after every 12 hour")]),t._v("\n "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),s("p",[t._v("Read about the error codes in "),s("RouterLink",{attrs:{to:"/device-connect/react-native.html#error-codes"}},[t._v("this")]),t._v(" section.")],1),t._v(" "),s("h2",{attrs:{id:"start-periodic-sync-method"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#start-periodic-sync-method"}},[t._v("#")]),t._v(" Start Periodic Sync Method")]),t._v(" "),s("p",[t._v("This is to be called only on a successful response to "),s("code",[t._v("createUser")]),t._v(" method's callback. On calling this the syncs will start for all the data sources configured as per permissions. The method below syncs data in the background at regular intervals:")]),t._v(" "),s("div",{staticClass:"language-javascript extra-class"},[s("pre",{pre:!0,attrs:{class:"language-javascript"}},[s("code",[t._v("FinBoxRiskSdk"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("startPeriodicSync")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("12")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//Start the sync periodically after every 12 hour")]),t._v("\n")])])]),s("div",{staticClass:"custom-block tip"},[s("p",{staticClass:"custom-block-title"},[t._v("Handle Sync Frequency")]),t._v(" "),s("p",[s("code",[t._v("startPeriodicSync")]),t._v(" takes one argument which indicates the frequency of sync "),s("strong",[t._v("in hours")]),t._v(".")])]),t._v(" "),s("h2",{attrs:{id:"cancel-periodic-syncing"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#cancel-periodic-syncing"}},[t._v("#")]),t._v(" Cancel Periodic Syncing")]),t._v(" "),s("p",[t._v("If you have already set up the sync for the user data, you can cancel it any time by the following code:")]),t._v(" "),s("div",{staticClass:"language-javascript extra-class"},[s("pre",{pre:!0,attrs:{class:"language-javascript"}},[s("code",[t._v("FinBoxRiskSdk"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("stopPeriodicSync")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])]),s("h2",{attrs:{id:"reset-user-data"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#reset-user-data"}},[t._v("#")]),t._v(" Reset User Data")]),t._v(" "),s("p",[t._v("In case the user data needs to be removed on the device so that you can re-sync the entire data, use the method "),s("code",[t._v("resetData")]),t._v(".")]),t._v(" "),s("div",{staticClass:"language-javascript extra-class"},[s("pre",{pre:!0,attrs:{class:"language-javascript"}},[s("code",[t._v("FinBoxRiskSdk"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("resetData")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])]),s("h2",{attrs:{id:"forget-user"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#forget-user"}},[t._v("#")]),t._v(" Forget User")]),t._v(" "),s("p",[t._v("In case the user choose to be forgotten, use the method "),s("code",[t._v("forgetUser")]),t._v(". This will delete the user details in our system.")]),t._v(" "),s("div",{staticClass:"language-javascript extra-class"},[s("pre",{pre:!0,attrs:{class:"language-javascript"}},[s("code",[t._v("FinBoxRiskSdk"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("forgetUser")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])])])}),[],!1,null,null,null);s.default=n.exports}}]);