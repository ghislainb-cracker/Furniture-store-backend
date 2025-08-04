const handleDeepLinkRedirect = (req, res) => {
     const { token } = req.query;
     if (!token) {
          return res.status(400).send("Invalid token");
     }

     // For iOS and Android, we'll use different deep link formats
     const isIOS = /iPad|iPhone|iPod/.test(req.headers["user-agent"] || "");
     let deepLinkUrl;

     if (isIOS) {
          // iOS deep link format
          deepLinkUrl = `furnitureshop://(auth)/reset?token=${token}`;
     } else {
          // Android deep link format with intent
          deepLinkUrl = `intent://(auth)/reset?token=${token}#Intent;scheme=furnitureshop;package=com.furniture;end`;
     }

     // Send an HTML page that will redirect to the app
     res.send(`
          <!DOCTYPE html>
          <html>
               <head>
                    <title>Redirecting to App...</title>
                    <meta http-equiv="refresh" content="0;url=${deepLinkUrl}">
                    <script>
                         // Try to open the app immediately
                         window.location.href = "${deepLinkUrl}";
                         
                         // If the app doesn't open, redirect to the app store after a delay
                         setTimeout(function() {
                              window.location.href = "https://play.google.com/store/apps/details?id=com.furniture"; // Replace with your app store URL
                         }, 1000);
                    </script>
               </head>
               <body>
                    <p>If you are not redirected automatically, <a href="${deepLinkUrl}">click here</a>.</p>
               </body>
          </html>
     `);
};

module.exports = {
     handleDeepLinkRedirect,
};
