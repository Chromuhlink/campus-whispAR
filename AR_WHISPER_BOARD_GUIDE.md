# Displaying Dynamic Text on 3D Objects in AR.js

## Method 1: A-Frame Text Element (Simplest)
Text floats as separate element positioned in front of 3D object.

```html
<a-scene embedded arjs>
  <a-marker preset="hiro">
    <!-- Your 3D billboard model -->
    <a-entity gltf-model="#billboard-model"></a-entity>
    
    <!-- Text positioned in front -->
    <a-text 
      id="whisper-text"
      value="Your whisper here"
      position="0 1 0.1"
      align="center"
      width="3"
      color="#ffffff">
    </a-text>
  </a-marker>
  <a-entity camera></a-entity>
</a-scene>
```

**Update text dynamically:**
```javascript
// Simple update
document.querySelector('#whisper-text').setAttribute('value', 'New message here');

// With Firebase
async function updateWhisperText() {
  const snapshot = await db.collection('whispers').get();
  const whispers = snapshot.docs.map(doc => doc.data());
  const random = whispers[Math.floor(Math.random() * whispers.length)];
  
  document.querySelector('#whisper-text').setAttribute('value', random.message);
}
```

---

## Method 2: Canvas Texture on 3D Object (More Integrated)
Text becomes the actual texture/material on your 3D model surface.

```javascript
// Wait for model to load
const billboard = document.querySelector('#billboard-model');

billboard.addEventListener('model-loaded', () => {
  // Create canvas for text rendering
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');
  
  function updateTextTexture(message) {
    // Draw background
    ctx.fillStyle = '#1a1a1a';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Draw text
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 60px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(message, canvas.width/2, canvas.height/2);
    
    // Apply texture to model
    const texture = new THREE.CanvasTexture(canvas);
    billboard.object3D.traverse((node) => {
      if (node.isMesh) {
        node.material.map = texture;
        node.material.needsUpdate = true;
      }
    });
  }
  
  // Update with Firebase
  async function fetchAndUpdate() {
    const snapshot = await db.collection('whispers').get();
    const whispers = snapshot.docs.map(doc => doc.data());
    const random = whispers[Math.floor(Math.random() * whispers.length)];
    updateTextTexture(random.message);
  }
  
  fetchAndUpdate();
  setInterval(fetchAndUpdate, 5000); // Update every 5 seconds
});
```

---

## Firebase Setup

```html
<!-- Add Firebase SDK -->
<script src="https://www.gstatic.com/firebasejs/9.x.x/firebase-app-compat.js"></script>
<script src="https://www.gstatic.com/firebasejs/9.x.x/firebase-firestore-compat.js"></script>
```

```javascript
// Initialize Firebase
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  projectId: "your-project-id",
  // ... get these from Firebase console
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Fetch random message
async function getRandomWhisper() {
  const snapshot = await db.collection('whispers').get();
  const whispers = snapshot.docs.map(doc => doc.data());
  return whispers[Math.floor(Math.random() * whispers.length)];
}
```

**Firestore Structure:**
```
whispers (collection)
  ├── doc1: { message: "Hello world", timestamp: ... }
  ├── doc2: { message: "AR is cool", timestamp: ... }
  └── doc3: { message: "Keep whispering", timestamp: ... }
```

---

## Quick Comparison

| Feature | Method 1: A-Frame Text | Method 2: Canvas Texture |
|---------|----------------------|--------------------------|
| Setup complexity | Simple (10 lines) | Medium (40+ lines) |
| Text integration | Floats over model | Baked into model surface |
| Styling control | Limited | Full control (fonts, colors, layouts) |
| Performance | Good | Better for complex text |
| Best for | Quick prototypes | Production/polished apps |

**Recommendation:** Start with Method 1, switch to Method 2 if you need more control or better visual integration.