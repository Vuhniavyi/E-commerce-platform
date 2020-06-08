import React, { lazy } from 'react';

export const privateRoutes = [
  {
    component: lazy(() => import('../page/MainPage/MainPage.js')),
    path: '/admin/main',
    exact: false,
  },
  {
    component: lazy(() => import('../containers/AdministratorSide/Cabinet/Cabinet')),
    path: '/admin/cabinet',
    exact: false,
  },
  {
    component: lazy(() => import('../containers/AdministratorSide/KnowledgeBase/KnowledgeBase')),
    path: '/admin/knowledge_base',
    exact: false,
  },
  {
    component: lazy(() => import('../containers/AdministratorSide/ProfileSettings/ProfileSettings')),
    path: '/admin/profile_settings',
    exact: false,
  },
  {
    component: lazy(() => import('../containers/AdministratorSide/CompanySettings/CompanySettings')),
    path: '/admin/company_settings',
    exact: false,
  },
  {
    component: lazy(() => import('../containers/AdministratorSide/Cart/Cart')),
    path: '/admin/cart',
    exact: false,
  },
  {
    component: lazy(() => import('../containers/AdministratorSide/AdditionalServices/AdditionalServices')),
    path: '/admin/additional_services',
    exact: false,
  },
  {
    component: lazy(() => import('../containers/AdministratorSide/Employees/Employees')),
    path: '/admin/employees',
    exact: false,
  },
  {
    component: lazy(() => import('../containers/AdministratorSide/MyProducts/MyProducts')),
    path: '/admin/my_products',
    exact: false,
  },
  {
    component: lazy(() => import('../containers/AdministratorSide/Finance/Finance')),
    path: '/admin/finance',
    exact: false,
  },
  {
    component: lazy(() => import('../containers/AdministratorSide/Store/Store')),
    path: '/admin/store',
    exact: false,
  },
  {
    component: lazy(() => import('../containers/AdministratorSide/Categories/Categories')),
    path: '/admin/categories',
    exact: false,
  },
  {
    component: lazy(() => import('../containers/AdministratorSide/LearningModule/LearningModule')),
    path: '/admin/learning',
    exact: false,
  },
  {
    component: lazy(() => import('../containers/AdministratorSide/Instruction/Instruction')),
    path: '/admin/instruction',
    exact: false,
  },
  {
    component: lazy(() => import('../containers/AdministratorSide/Orders/Orders')),
    path: '/admin/orders',
    exact: false,
  },
  {
    component: lazy(() => import('../containers/AdministratorSide/ContractorOrders/ContractorOrders')),
    path: '/admin/contractor_orders',
    exact: false,
  },
  {
    component: lazy(() => import('../containers/UserSide/ContactsForm2/ContactsForm')),
    path: '/admin/contacts-form',
    exact: false,
  },
  {
    component: lazy(() => import('../containers/AdministratorSide/ContractorProducts/ContractorProducts')),
    path: '/admin/products',
    exact: true,
  },
  {
    component: lazy(() => import('../containers/AdministratorSide/ContractorProducts/DownloadHistory')),
    path: '/admin/products/download_history',
    exact: false,
  }
];

export const publicRoutes = [
  {
    component: lazy(() => import('../containers/UserSide/ContactsForm2/ContactsForm')),
    path: '/contacts-form',
    exact: false,
  },
  {
    component: lazy(() => import('../containers/AdministratorSide/Login/Login')),
    path: '/auth/login',
    exact: false,
  },
  {
    component: lazy(() => import('../containers/AdministratorSide/Registration/Registration')),
    path: '/auth/registration',
    exact: false,
  },
  {
    component: lazy(() => import('../containers/AdministratorSide/ResetPassword/ResetPassword')),
    path: '/auth/reset_password',
    exact: false,
  },
  // {
  //   component: lazy(() => import('../containers/AdministratorSide/LandingFirstPage/LandingFirstPage')),
  //   path: '/',
  //   exact: true,
  // },
];