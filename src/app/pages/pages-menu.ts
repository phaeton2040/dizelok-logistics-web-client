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
        link: '#'
      },
      {
        title: 'Добавить менеджера',
        link: '#'
      },
      {
        title: 'Добавить водителя',
        link: '#'
      }
    ]
  },
  {
    title: 'Настройки',
    icon: 'nb-gear',
    children: [
      {
        title: 'Настройки организации',
        link: '#'
      },
      {
        title: 'Добавить точки погрузки',
        link: '#'
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
