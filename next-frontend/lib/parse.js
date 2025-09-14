import Parse from 'parse';

if (typeof window !== 'undefined') {
  const appId = process.env.NEXT_PUBLIC_APP_ID;
  const serverURL = process.env.NEXT_PUBLIC_SERVER_URL;
  console.log('Parse Init - App ID:', appId, 'Server URL:', serverURL);  // Debug
  Parse.initialize(appId, process.env.NEXT_PUBLIC_JS_KEY || '');
  Parse.serverURL = serverURL;
}

export default Parse;