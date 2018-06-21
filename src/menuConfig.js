// 菜单配置
// headerMenuConfig：头部导航配置
// asideMenuConfig：侧边导航配置

const headerMenuConfig = [
  {
    name: '首页',
    path: '#',
    icon: 'home',
  },
  {
    name: '反馈',
    path: 'https://gitee.com/zzuisa/',
    external: true,
    newWindow: true,
    icon: 'message',
  },
  {
    name: '帮助',
    path: 'https://gitee.com/zzuisa/',
    external: true,
    newWindow: true,
    icon: 'bangzhu',
  },
];

const userMenuConfig = [
  {
    name: '首页',
    path: '/index',
    icon: 'home',
  },
  {
    name: '我的同事',
    path: '/employee/list',
    icon: 'shezhi',
  },
  {
    name: '修改个人信息',
    path: '/employee/edit',
    icon: 'shezhi',
  },
];

const adminMenuConfig = [
  {
    name: '首页',
    path: '/',
    icon: 'home',
  },
  {
    name: '用户管理',
    path: '/user',
    icon: 'yonghu',
  },
  {
    name: '员工管理',
    path: '/employee',
    icon: 'fans',
    children: [
      {
        name: '员工信息录入',
        path: '/employee/add',
      },
      {
        name: '员工信息查看',
        path: '/employee/list',
      },
    ],
  },
  {
    name: '部门管理',
    path: '/department',
    icon: 'cascades',
    children: [
      {
        name: '部门列表',
        path: '/department',
      },
    ],
  },
  {
    name: '薪金管理',
    path: '/salary',
    icon: 'rmb',
    children: [
      {
        name: '工资列表',
        path: '/salary',
      },
    ],
  },
  {
    name: '招聘管理',
    path: '/recruit',
    icon: 'quote2',
    children: [
      {
        name: '招聘信息管理',
        path: '/recruit',
      },
      {
        name: '面试列表',
        path: '/recruit/list',
      },
    ],
  },
];

export { headerMenuConfig, userMenuConfig, adminMenuConfig };
