// 以下文件格式为描述路由的协议格式
// 你可以调整 routerConfig 里的内容
// 变量名 routerConfig 为 iceworks 检测关键字，请不要修改名称

import HeaderAsideFooterLayout from './layouts/HeaderAsideFooterLayout';
import HeaderAsideFooterResponsiveLayout from './layouts/HeaderAsideFooterResponsiveLayout'
import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import BlankLayout from './layouts/BlankLayout';
import NotFound from './pages/NotFound';
import SpecificationList from './pages/SpecificationList';
import SpecificationAdd from './pages/SpecificationAdd'

const routerConfig = [
  {
    path: '/',
    layout: BlankLayout,
    component: LoginPage,
  },
  {
    path: '/login',
    layout: BlankLayout,
    component: LoginPage,
  },
  {
    path: '/index', 
    layout: HeaderAsideFooterResponsiveLayout,
    component: Home,
  },
  {
    path: '/spec', 
    layout: BlankLayout,
    component: SpecificationList,
  },
  {
    path: '/spec/add', 
    layout: HeaderAsideFooterResponsiveLayout,
    component: SpecificationAdd,
  },

  {
    path: '*',
    layout: HeaderAsideFooterResponsiveLayout,
    component: NotFound,
  },
];

export default routerConfig;
