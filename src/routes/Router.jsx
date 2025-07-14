import React from 'react'
import { createBrowserRouter } from 'react-router'
import Home from '../pages/Home'
import Scholarships from '../pages/Scholarships'
import Auth from '../pages/Auth'
import AdminDashboard from '../pages/AdminDashboard'
import ModeratorDashboard from '../pages/ModeratorDashboard'
import UserDashboard from '../pages/UserDashboard'
import PaymentSuccess from '../pages/PaymentSuccess'
import ScholarshipDetails from '../pages/ScholarshipDetails'
import ApplyScholarship from '../pages/ApplyScholarship'
import NotFound from '../pages/NotFound'

const Router = createBrowserRouter([
    {
        path:'/',element:<Home/>
    }
    ,{
      path:"/scholarships", element:<Scholarships />
    },
    ,{
      path:"/auth", element:<Auth />
    },
    ,{
      path:"/admin/dashboard", element:<AdminDashboard />
    },
    ,{
      path:"/moderator/dashboard", element:<ModeratorDashboard />
    },
    ,{
      path:"/user/dashboard", element:<UserDashboard />
    },
    ,{
      path:"/payment-success", element:<PaymentSuccess />
    },
    ,{
      path:"/apply-scholarship/:id", element:<ApplyScholarship />
    },
    ,{
      path:"/scholarship/:id", element:<ScholarshipDetails />
    },
    ,{
      path:"*", element:<NotFound />
    }
])
  


export default Router
