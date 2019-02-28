import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Главная',
    icon: 'nb-home',
    link: '/pages/dashboard',
    home: true,
  },
  {
    title: 'МЕНЮ',
    group: true,
  },
  {
    title: 'Рейсы',
    icon: 'fas fa-truck',
    children: [
      {
        title: 'Все рейсы',
        link: '#'
      },
      {
        title: 'Создать новый',
        link: '#'
      }
    ]
  },
  {
    title: 'Клиенты',
    icon: 'far fa-address-book',
    children: [
      {
        title: 'Все клиенты',
        link: '#'
      },
      {
        title: 'Добавить нового',
        link: '#'
      }
    ]
  },
  {
    title: 'Пользователи',
    icon: 'fas fa-users',
    children: [
      {
        title: 'Все пользователи',
        link: '/pages/users'
      },
      {
        title: 'Добавить пользователя',
        link: '/pages/users/add'
      }
    ]
  },
  {
    title: 'Настройки',
    icon: 'nb-gear',
    children: [
      {
        title: 'Настройки организации',
        link: '/pages/organisation/settings'
      },
      {
        title: 'Добавить точки погрузки',
        link: '/pages/organisation/loading-points'
      }
    ]
  },
  // {
  //   title: 'Auth',
  //   icon: 'nb-locked',
  //   children: [
  //     {
  //       title: 'Login',
  //       link: '/auth/login',
  //     },
  //     {
  //       title: 'Register',
  //       link: '/auth/register',
  //     },
  //     {
  //       title: 'Request Password',
  //       link: '/auth/request-password',
  //     },
  //     {
  //       title: 'Reset Password',
  //       link: '/auth/reset-password',
  //     },
  //   ],
  // },
];
