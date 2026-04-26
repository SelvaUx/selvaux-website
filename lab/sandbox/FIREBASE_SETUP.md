# Firebase Setup for Team Swap Simulator

INSTRUCTIONS:
1. Copy the code block below.
2. Go to [Firebase Console](https://console.firebase.google.com/) -> Firestore Database -> Rules.
3. **Delete everything** currently there.
4. **Paste** the code below.
5. Click **Publish**.

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    // ✅ ALLOW access to Team Swap Simulator (mini-project)
    match /mini-project/{document=**} {
      allow read, write: if true;
    }
    
    // 🔒 DENY everything else (Standard Security)
    match /{document=**} {
      allow read, write: if false;
    }
  }
}
```

Once published, reload your simulator page, and it should work!
