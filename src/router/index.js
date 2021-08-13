import Vue from 'vue'
import VueRouter from 'vue-router'
import BodyMassIndex from '../views/BodyMassIndex'
import DateDecree from '../views/DateDecree'
import GestationalAgeByUltrasound from '../views/GestationalAgeByUltrasound'
import GestationalAgeByMenstruation from '../views/GestationalAgeByMenstruation'
import DatesVisitingAntenatalClinic from '../views/DatesVisitingAntenatalClinic'
import EstimatedDateBirth from '../views/EstimatedDateBirth'
import UltrasoundScreening from '../views/UltrasoundScreening'
import LicenseExpiring from '../views/LicenseExpiring'
import Settings from '../views/Settings'

Vue.use(VueRouter)

const routes = [
  // {
  //   path: '/',
  //   name: 'Home',
  //   component: Home
  // },
  {
    path: '/BMI',
    name: 'BMI',
    component: BodyMassIndex
  },
  {
    path: '/DateDecree',
    name: 'DateDecree',
    component: DateDecree
  },
  {
    path: '/GestationalAgeByUltrasound',
    name: 'GestationalAgeByUltrasound',
    component: GestationalAgeByUltrasound
  },
  {
    path: '/GestationalAgeByMenstruation',
    name: 'GestationalAgeByMenstruation',
    component: GestationalAgeByMenstruation
  },
  {
    path: '/DatesVisitingAntenatalClinic',
    name: 'DatesVisitingAntenatalClinic',
    component: DatesVisitingAntenatalClinic
  },
  {
    path: '/EstimatedDateBirth',
    name: 'EstimatedDateBirth',
    component: EstimatedDateBirth
  },
  {
    path: '/UltrasoundScreening',
    name: 'UltrasoundScreening',
    component: UltrasoundScreening
  },
  {
    path: '/LicenseExpiring',
    name: 'LicenseExpiring',
    component: LicenseExpiring
  },
  {
    path: '/Settings',
    name: 'Settings',
    component: Settings
  }
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
