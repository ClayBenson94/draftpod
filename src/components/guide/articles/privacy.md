## Privacy Notice

This document provides details about data gathered by the site and how we use it.

### Contact Form

The website [contact form](/guide#contact/) requests that you provide your name and email address. This information is used only for following up on requests via email. 

### Error Reporting

When errors on the site occur, a log of the error is sent to the [Sentry](https://sentry.io/) error-reporting service. Error reports also include various types of system diagnostic information (e.g. browser version, operating system, etc.). This information is used only for diagnosing and fixing errors which occur in the service.

### Analytics Data

When you use the site, we collect statistical data about the device and network you used to access the site. We also collect behavior data. For example, we keep track of which buttons and links people click to get around on the site and how often they come back.

This information is stored with [Google Analytics](https://en.wikipedia.org/wiki/Google_Analytics) and is anonymized and aggregated. Only site administrators have access to our analytics data. We collect this information so that we can make better decisions about how to improve the site. We never sell or trade this information to any other company.

Opt-out: You have the option to [opt-out of Google Analytics](https://tools.google.com/dlpage/gaoptout) using their browser extension or any of the available content blocking plugins for your platform.

Opt-out: You can set a [Do Not Track](https://allaboutdnt.com/) setting in your browser, which Google Analytics will honor.

### Draft Data

The site stores an archive of the most recent 10 drafts within your browser's local storage. This data is only available to your browser and is not transmitted to our server.

In addition, for multi-player drafts the current state of the draft table is written to a [Google Cloud Firestore](https://cloud.google.com/firestore/) document. The player data within the stored draft table includes a user-provided first name, but no other personally identifiable information.

When drafts are completed, the order of picks within the draft is logged for for subsequent analysis. This data is completely anonymous (there is no way to tie it back to the person or browser that originated it). This data is used to improve card ratings, develop improved bot drafters, and may in the future be shared publicly (again, fully anonymized). The data is stored within a [Google Cloud Storage](https://cloud.google.com/storage/) bucket.

