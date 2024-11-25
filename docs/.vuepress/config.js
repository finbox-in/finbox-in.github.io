module.exports = {
  title: 'FinBox Documentation',
  description: 'Documentation for FinBox SDK',
  plugins: ['code-switcher', ['vuepress-plugin-code-copy', {
    color: "#00b1ff"
  }], ['@vuepress/search', {
    test: ["^((?!device-connect\/transactions).)*$"]
  }], '@vuepress/medium-zoom'],
  mounted() {
    const hash = document.location.hash;
    if (hash.length > 1) {
      const id = hash.substring(1)
      const element = document.getElementById(id)
      if (element) element.scrollIntoView()
    }
  },
  themeConfig: {
    logo: '/header.svg',
    heroText: ' ',
    smoothScroll: true,
    lastUpdated: 'Last Updated',
    nav: [
      { text: 'Home', link: '/' },
      { text: 'DeviceConnect', link: '/device-connect/' },
      { text: 'BankConnect', link: '/bank-connect/' },
      { text: 'About', link: 'https://finbox.in' },
    ],
    sidebar: {
      '/device-connect/': [
        {
          title: 'Overview',
          collapsable: false,
          children: [
            {
              title: 'Introduction',
              path: '/device-connect/'
            },
            {
              title: 'Getting Started',
              path: '/device-connect/getting-started.html'
            },
            {
              title: 'Architecture',
              path: '/device-connect/architecture.html'
            },
            {
              title: 'DeviceConnect Integration',
              path: '/device-connect/integration-flow.html'
            },
          ]
        },
        {
          title: 'Data Collection and Syncing',
          collapsable: false,
          children: [
            {
              title: 'FrontEnd Integration',
              path: '/device-connect/mobile-integration.html'
            },
            {
              title: 'Handling Permissions',
              path: '/device-connect/permissions.html'
            },
            
            {
              title: 'Android SDK setup',
              path: '/device-connect/android.html'
            },
            {
              title: 'React Native SDK setup',
              path: '/device-connect/react-native.html'
            },
            {
              title: 'Flutter SDK setup',
              path: '/device-connect/flutter.html'
            },
            {
              title: 'Cordova SDK setup',
              path: '/device-connect/cordova.html'
            },
            {
              title: 'Ionic Capacitor SDK setup',
              path: '/device-connect/ionic-capacitor.html'
            },
            {
              title: 'Error Codes',
              path: '/device-connect/error-codes.html'
            }
          ]
        },
        {
          title: 'Fetching Insights and Predictors',
          collapsable: false,
          children: [
            {
              title: 'Backend Integration',
              path: '/device-connect/insights-integration-flow.html'
            },
            {
              title: 'Insights API',
              path: '/device-connect/insights-api.html'
            },
            {
              title: 'Salt Generation',
              path: '/device-connect/salt-generation.html'
            }
          ]
        },
        {
          title: 'FAQ',
          collapsable: true,
          children: [
            {
              title: 'FAQ',
              path: '/device-connect/faq.html'
            }
          ]
        }
      ],
      '/bank-connect/': [
        {
          title: 'Overview',
          path: '/bank-connect/',
          collapsable: false
        },
        {
          title: 'Basics',
          path: '/bank-connect/basics.html',
          collapsable: false
        },
        {
          title: 'Uploading Bank Statements',
          collapsable: true,
          children: [
            {
              title: 'Overview',
              path: '/bank-connect/upload-overview.html'
            },
            {
              title: 'See in action',
              path: '/bank-connect/see-in-action.html'
            },
            {
              title: 'Android',
              path: '/bank-connect/android.html'
            },
            {
              title: 'React Native',
              path: '/bank-connect/react-native.html'
            },
            {
              title: 'Flutter',
              path: '/bank-connect/flutter.html'
            },
            {
              title: 'Cordova',
              path: '/bank-connect/cordova.html'
            },
            {
              title: 'JavaScript',
              path: '/bank-connect/javascript.html'
            },
            {
              title: 'REST API',
              path: '/bank-connect/upload-rest-api.html'
            }
            // {
            //   title: 'Python',
            //   path: '/bank-connect/upload-python.html'
            // }
          ]
        },
        {
          title: 'Fetching Enriched Data',
          collapsable: true,
          children: [
            {
              title: 'Overview',
              path: '/bank-connect/fetch-overview.html'
            },
            {
              title: 'REST API',
              path: '/bank-connect/rest-api.html'
            },
            // {
            //   title: 'Python',
            //   path: '/bank-connect/python.html'
            // },
            {
              title: 'Webhook',
              path: '/bank-connect/webhook.html'
            }
          ]
        },
        {
          title: 'Management',
          path: '/bank-connect/management.html',
          collapsable: false
        },
        {
          title: 'Fraud',
          path: '/bank-connect/fraud.html',
          collapsable: false
        },
        {
          title: 'Appendix',
          path: '/bank-connect/appendix.html',
          collapsable: false
        }
      ],
      '/session-flow/': [
        {
          title: 'Overview',
          path: '/session-flow/',
          collapsable: false
        },
        {
          title: 'Basics',
          path: '/session-flow/basics.html',
          collapsable: false
        },
        {
          title: 'Integration Pre-requisites',
          path: '/session-flow/integration-steps.html',
          collapsable: true
        },
        {
          title: 'Integration Steps',
          path: '/session-flow/integration-components.html',
          children: [
            {
              title: 'Submit Data to FinBox (Uploading Bank Statements)',
              path: '/session-flow/submit-data.html',
              children: [
                {
                  title: 'Frontend Integration',
                  path: '/session-flow/submit-data-frontend.html',
                },
                {
                  title: 'Backend Integration',
                  path: '/session-flow/submit-data-backend.html',
                }
              ]
            },
            {
              title: 'Check Upload Status',
              path: '/session-flow/upload-status.html'
            },
            {
              title: 'Get Data',
              path: '/session-flow/get-data.html'
            },
            {
              title: 'Check Processing Status',
              path: '/session-flow/processing-status.html'
            },
            {
              title: 'Fetch Enriched Data',
              path: '/session-flow/fetch-data.html'
            },
            // {
            //   title: 'REST API',
            //   path: '/session-flow/upload-rest-api.html'
            // }
          ],
          collapsable: true
        },
        // {
        //   title: 'Uploading Bank Statements',
        //   collapsable: true,
        //   children: [
        //     {
        //       title: 'Overview',
        //       path: '/session-flow/upload-overview.html'
        //     },
        //     {
        //       title: 'See in action',
        //       path: '/session-flow/see-in-action.html'
        //     },
        //     {
        //       title: 'Android',
        //       path: '/session-flow/android.html'
        //     },
        //     {
        //       title: 'Cordova',
        //       path: '/session-flow/cordova.html'
        //     },
        //     {
        //       title: 'Flutter',
        //       path: '/session-flow/flutter.html'
        //     },
        //     {
        //       title: 'JavaScript',
        //       path: '/session-flow/javascript.html'
        //     },
        //     {
        //       title: 'REST API',
        //       path: '/session-flow/upload-rest-api.html'
        //     }
        //     // {
        //     //   title: 'Python',
        //     //   path: '/session-flow/upload-python.html'
        //     // }
        //   ]
        // },
        // {
        //   title: 'Fetching Enriched Data',
        //   collapsable: true,
        //   children: [
        //     {
        //       title: 'Overview',
        //       path: '/session-flow/fetch-overview.html'
        //     },
        //     {
        //       title: 'REST API',
        //       path: '/session-flow/rest-api.html'
        //     },
        //     // {
        //     //   title: 'Python',
        //     //   path: '/session-flow/python.html'
        //     // },
        //     {
        //       title: 'Webhook',
        //       path: '/session-flow/webhook.html'
        //     }
        //   ]
        // },
        // {
        //   title: 'Management',
        //   path: '/session-flow/management.html',
        //   collapsable: false
        // },
        // {
        //   title: 'Fraud',
        //   path: '/session-flow/fraud.html',
        //   collapsable: false
        // },
        // {
        //   title: 'Appendix',
        //   path: '/session-flow/appendix.html',
        //   collapsable: false
        // },
        {
          title: 'Acceptance Criteria',
          path: '/session-flow/acceptance-criteria.html',
          collapsable: true
        },
        {
          title: 'Account Aggregator Onboarding',
          path: '/session-flow/aa-onboarding.html',
          collapsable: true
        },
        // {
        //   title: 'Test Output',
        //   path: '/session-flow/output.html',
        //   collapsable: false
        // }
      ],
      '/middleware/': [
        {
          title: 'Overview',
          collapsable: false,
          children: [
            {
              title: 'Introduction',
              path: '/middleware/'
            }
          ]
        },
        {
          title: 'Sourcing Entity',
          collapsable: false,
          children: [
            {
              title: 'Introduction',
              path: '/middleware/sourcing-entity.html'
            },
            {
              title: 'Android',
              path: '/middleware/android.html'
            },
            {
              title: 'React Native',
              path: '/middleware/react-native.html'
            },
            {
              title: 'Flutter',
              path: '/middleware/flutter.html'
            },
            {
              title: 'REST API',
              path: '/middleware/sourcing-rest-api.html'
            },
            {
              title: 'Web SDK',
              path: '/middleware/web-sdk.html'
            },
            {
              title: 'Banner',
              path: '/middleware/banner.html'
            },
          ]
        },
        {
          title: 'Lender',
          collapsable: false,
          children: [
            {
              title: 'Introduction',
              path: '/middleware/lender.html'
            }
          ]
        },
        {
          title: 'Appendix',
          path: '/middleware/appendix.html',
          collapsable: false
        },
      ],
      '/pfm/': [
        {
          title: 'Overview',
          collapsable: false,
          children: [
            {
              title: 'Introduction',
              path: '/pfm/'
            }
          ]
        },
        {
          title: 'Fetching Spends',
          collapsable: false,
          children: [
            {
              title: 'Android SDK',
              path: '/pfm/android.html'
            }
          ]
        },
      ]
    }
  },
}
