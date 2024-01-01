import { initializeApp } from "firebase/app";
import { 
  getAuth,
  signInWithPopup,
  signOut,
  GoogleAuthProvider,
  onAuthStateChanged, 
} from "firebase/auth";
import { getDatabase, ref, get, set } from "firebase/database";
import { v4 as uuid } from 'uuid';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTHDOMAIN,
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASEURL,
  projectId: import.meta.env.VITE_FIREBASE_PROJECTID,
};

const app = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();
const auth = getAuth();
const database = getDatabase(app);

export async function login() {
  signInWithPopup(auth, provider).catch(console.error);
}

export async function logout() {
  signOut(auth).catch(console.error)
}

export async function onUserStateChanged(setUser) {
  onAuthStateChanged(auth, async (user) => {
    const updatedUser = user ? await formatUser(user) : null;
    setUser(updatedUser);
  })
}

async function formatUser(user) {
  return get(ref(database, 'admins'))
    .then((snapshot) => {
      const admins = snapshot.val();
      const isAdmin = admins.includes(user.uid)
      return {...user, isAdmin}
    })
}

export async function addNewProduct(product, imageURL) {
  const id = uuid();
  set(ref(database, `products/${id}`), {
    ...product,
    id,
    price: parseInt(product.price),
    image: imageURL,
    options: product.options ? product.options.split(',') : [],
  })
}

export async function getProducts(productId) {
  console.log('get')
  return get(ref(database, 'products')).then(snapshot => {
    if (snapshot.exists()) {
      return !productId ? 
        Object.values(snapshot.val()) : 
        Object.values(snapshot.val()).filter(product => product.id === productId)[0]
    }
    return null;
  })
}