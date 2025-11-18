# TODO: Deploy Firebase Security Rules

## Important Security Step - Complete This When Ready

### What This Does:
The `firestore.rules` file protects your Firebase database by:
- Allowing anyone to READ whispers (for AR display)
- Allowing anyone to CREATE whispers (max 280 characters)
- PREVENTING editing/deleting whispers

### How to Deploy:

**Option 1: Firebase CLI (Recommended)**
```bash
firebase deploy --only firestore:rules
```

**Option 2: Firebase Console (Manual)**
1. Go to https://console.firebase.google.com/
2. Select project: **campus-whispar**
3. Navigate to: **Firestore Database** → **Rules** tab
4. Copy contents from `firestore.rules` file
5. Paste into the rules editor
6. Click **Publish**

### Verify It Worked:
- Go to Firebase Console → Firestore → Rules
- You should see the rules from `firestore.rules` active
- Test by submitting a whisper - it should save successfully

---

**Note:** The API keys in your HTML files are SAFE to be public. Firebase security comes from these rules, not from hiding the API key. See: https://firebase.google.com/docs/projects/api-keys
