import { MenuItem } from 'primeng/api';

export const menuItems: MenuItem[] = [
  {
    label: 'What Would You Like To Do?',
    icon: 'pi pi-fw pi-file',
    items: [
      {
        label: 'Draw',
        icon: 'pi pi-fw pi-plus',
        routerLink: '/create-shape',
      },
      {
        label: 'View',
        icon: 'pi pi-fw pi-pencil',
        routerLink: '/draw-shape',
      },
    ],
  },
];
