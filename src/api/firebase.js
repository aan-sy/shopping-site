import { initializeApp } from "firebase/app";
import { 
  getAuth,
  signInWithPopup,
  signOut,
  GoogleAuthProvider,
  onAuthStateChanged, 
} from "firebase/auth";
import { getDatabase, ref, get, set, remove } from "firebase/database";
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

// AUTH
export async function login() {
  signInWithPopup(auth, provider).catch(console.error);
}

export async function logout() {
  signOut(auth).catch(console.error)
}

export async function onUserStateChanged(setUser) {
  onAuthStateChanged(auth, async (user) => {
    console.log(user);
    const updatedUser = user ? await checkAdmin(user) : null;
    setUser(updatedUser);
  })
}

async function checkAdmin(user) {
  console.log('get admin user')
  return get(ref(database, 'admins'))
    .then((snapshot) => {
      const admins = snapshot.val();
      const isAdmin = admins.includes(user.uid)
      return {...user, isAdmin}
    })
}

// DB
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
  console.log('get products');
  return get(ref(database, 'products')).then(snapshot => {
    if(snapshot.exists()) {
      return !productId ? Object.values(snapshot.val()) : snapshot.val()[productId];
    }
    return null;
  })
}

export async function addOrUpdateToCart(uid, product) {
  console.log(product);
  set(ref(database, `carts/${uid}/${product.id + product.option}`), product)
}

export async function removeCartItem(uid, product) {
  remove(ref(database, `carts/${uid}/${product.id + product.option}`))
}

export async function getCart(uid) {
  console.log('get cart')
  return get(ref(database, `carts/${uid}`)).then(snapshot => {
    if(snapshot.exists()) {
      const items = snapshot.val() || {}
      return Object.entries(items);
    }
    return [];
  })
}