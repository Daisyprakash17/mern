import {BrowserRouter , Routes,Route} from "react-router-dom"

// components 
import HeaderComponents from "./components/HeaderComponents";
import FooterComponents from "./components/FooterComponents";


// publicly available pages
import CartPage from "./pages/CartPage";
import ProtectedRoutesComponent from "./components/ProtectedRoutesComponent";
import Homepage from "./pages/Homepage";
import LoginPage from "./pages/LoginPage";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import ProductListpage from "./pages/ProductListPage";
import RegisterPage from "./pages/RegisterPage";


// protected user pages
import UserCartDetailsPage from "./pages/user/UserCartDetailsPage";
import UserOrderDetailsPage from "./pages/user/UserOrderDetailsPage";
import UserOrdersPage from "./pages/user/UserOrdersPage";
import UserProfilePage from "./pages/user/UserProfilePage";


// protected admin pages
import AdminUsersPage from "./pages/admin/AdminUsersPage"
import AdminProductsPage from "./pages/admin/AdminProductsPage"
import AdminOrdersPage from "./pages/admin/AdminOrdersPage"
import AdminOrderDetailsPage from "./pages/admin/AdminOrderDetailsPage"
import AdminEditUserPage from "./pages/admin/AdminEditUserPage"
import AdminEditProductPage from "./pages/admin/AdminEditProductPage"
import AdminCreateProductPage from "./pages/admin/AdminCreateProductPage"
import AdminChatsPage from "./pages/admin/AdminChatsPage"
import AdminAnalyticsPage from "./pages/admin/AdminAnalyticsPage"

import RoutesWithUserChatComponent from "./components/user/RoutesWithUserChatComponent";
import ScrollToTop from "./utils/ScrollToTop";
function App() {
  return ( 
    <>
     <BrowserRouter>
     <ScrollToTop/>
      <HeaderComponents/>


      <Routes>

        <Route element={<RoutesWithUserChatComponent/>}>
        <Route path="/"  element={<Homepage/>}/>
        
        // product list routes with pagination search and category 
        <Route path="/product-list" element={<ProductListpage />} />
        <Route path="/product-list/:pageNumParam" element={<ProductListpage />} />
        <Route path="/product-list/category/:categoryName" element={<ProductListpage />} />
        <Route path="/product-list/category/:categoryName/:pageNumParam" element={<ProductListpage />} />
        <Route path="/product-list/search/:searchQuery" element={<ProductListpage />} />
        <Route path="/product-list/search/:searchQuery/:pageNumParam" element={<ProductListpage />} />
        <Route path="/product-list/category/:categoryName/search/:searchQuery" element={<ProductListpage />} />
        <Route path="/product-list/category/:categoryName/search/:searchQuery/:pageNumParam" element={<ProductListpage />} />
        <Route path="/product-details/:id"  element={<ProductDetailsPage/>}/>
        <Route path="/cart"  element={<CartPage/>}/>
        <Route path="/login"  element={<LoginPage/>}/>
        <Route path="/register"  element={<RegisterPage/>}/>
        <Route path="*"  element="Page not exits 404!!"/>

        // following routes which require autorization to view the pages   
        <Route  element={<ProtectedRoutesComponent admin={false}/>} > 
        <Route path="/user"  element={<UserProfilePage/>}/>
        <Route path="/user/my-orders"  element={<UserOrdersPage/>}/>
        <Route path="/user/cart-details"  element={<UserCartDetailsPage/>}/>
        <Route path="/user/order-details/:id"  element={<UserOrderDetailsPage/>}/> 
        </Route>

        </Route>

        // following are admin protected Routes
        <Route element={<ProtectedRoutesComponent admin={true}/>}> 
        <Route path="/admin/users"  element={<AdminUsersPage/>}/>
        <Route path="/admin/edit-user/:id"  element={<AdminEditUserPage/>}/>
        <Route path="/admin/products"  element={<AdminProductsPage/>}/>
        <Route path="/admin/create-new-product"  element={<AdminCreateProductPage/>}/>
        <Route path="/admin/edit-product/:id"  element={<AdminEditProductPage/>}/>
        <Route path="/admin/orders"  element={<AdminOrdersPage/>}/>
        <Route path="/admin/chats"  element={<AdminChatsPage/>}/>
        <Route path="/admin/analytics"  element={<AdminAnalyticsPage/>}/> 
        <Route path="/admin/order-details/:id"  element={<AdminOrderDetailsPage/>}/> 
        </Route>


      </Routes>

      <FooterComponents/>
     </BrowserRouter> 
  </>
  );
}

export default App;
