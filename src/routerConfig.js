// 以下文件格式为描述路由的协议格式
// 你可以调整 routerConfig 里的内容
// 变量名 routerConfig 为 iceworks 检测关键字，请不要修改名称

import HeaderAsideFooterLayout from './layouts/HeaderAsideFooterLayout';
import HeaderAsideFooterResponsiveLayout from './layouts/HeaderAsideFooterResponsiveLayout';
import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import BlankLayout from './layouts/BlankLayout';
import NotFound from './pages/NotFound';
import DepartmentList from './pages/DepartmentList';
import EmployeeList from './pages/EmployeeList';
import EmployeeAdd from './pages/EmployeeAdd';
import UserAudit from './pages/UserAudit';
import UserList from './pages/UserList';
import EmployeeEdit from './pages/EmployeeEdit';
import SalaryList from './pages/SalaryList';
import AuditList from './pages/AuditList';
import Dashboard from './pages/Dashboard';
import ActiveSuccess from './pages/ActiveSuccess';
import Register from './pages/RegisterPage';

const routerConfig = [
  {
    path: '/',
    layout: HeaderAsideFooterResponsiveLayout,
    component: Dashboard,
  },
  {
    path: '/recruit',
    layout: HeaderAsideFooterResponsiveLayout,
    component: UserAudit,
  },
  {
    path: '/user',
    layout: HeaderAsideFooterResponsiveLayout,
    component: UserList,
  },
  {
    path: '/employee/list',
    layout: HeaderAsideFooterResponsiveLayout,
    component: EmployeeList,
  },
  {
    path: '/employee/add/:name/:email',
    layout: HeaderAsideFooterResponsiveLayout,
    component: EmployeeAdd,
  },
  {
    path: '/employee/add',
    layout: HeaderAsideFooterResponsiveLayout,
    component: EmployeeAdd,
  },
  {
    path: '/login',
    layout: BlankLayout,
    component: LoginPage,
  },
  {
    path: '/register',
    layout: BlankLayout,
    component: Register,
  },
  {
    path: '/user/info',
    layout: HeaderAsideFooterResponsiveLayout,
    component: DepartmentList,
  },
  {
    path: '/index',
    layout: HeaderAsideFooterResponsiveLayout,
    component: Home,
  },
  {
    path: '/recruit/list',
    layout: HeaderAsideFooterResponsiveLayout,
    component: AuditList,
  },
  {
    path: '/employee/edit',
    layout: HeaderAsideFooterResponsiveLayout,
    component: EmployeeEdit,
  },
  {
    path: '/salary',
    layout: HeaderAsideFooterResponsiveLayout,
    component: SalaryList,
  },
  {
    path: '/department',
    layout: HeaderAsideFooterResponsiveLayout,
    component: DepartmentList,
  },
  {
    path: '/success',
    layout: BlankLayout,
    component: ActiveSuccess,
  },
  {
    path: '*',
    layout: HeaderAsideFooterResponsiveLayout,
    component: NotFound,
  },
];

export default routerConfig;
