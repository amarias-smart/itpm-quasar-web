
const routes = [
  {
    path: '/',
    name: 'login-page',
    component: () => import('pages/IndexPage.vue')
  },

  {
    path: '/projects/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: 'dashboard', name: 'projects-dashboard', component: () => import('pages/projects/DashboardPage.vue') },
      { path: 'inventory', name: 'projects-inventory', component: () => import('pages/projects/InventoryPage.vue') }
    ]
  },

  {
    path: '/reports/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: 'raw', name: 'reports-raw', component: () => import('pages/reports/RawPage.vue') }
    ]
  },

  {
    path: '/misc/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: 'about-us', name: 'about-us', component: () => import('pages/misc/AboutUsPage.vue') },
      { path: 'faqs', name: 'faqs', component: () => import('pages/misc/FaqsPage.vue') }
    ]
  },

  {
    path: '/settings/',
    component: () => import('layouts/SettingsLayout.vue'),
    children: [
      { path: 'projects', name: 'settings-projects', component: () => import('pages/settings/ProjectsPage.vue') },
      { path: 'users', name: 'settings-users', component: () => import('pages/settings/UsersPage.vue') },
      { path: 'users-profile', name: 'settings-users-profile', component: () => import('pages/settings/UsersProfilePage.vue') }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
