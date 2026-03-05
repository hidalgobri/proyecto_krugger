import { Label } from 'src/components/label';
import { SvgColor } from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name: string) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} />;

export type NavItem = {
  title: string;
  path: string;
  icon: React.ReactNode;
  info?: React.ReactNode;
};

export const navData = [
  {
    title: 'Inicio',
    path: '/',
    icon: icon('ic-home'),
  },
  {
    title: 'Usuarios',
    path: '/user',
    icon: icon('ic-user'),
  },
  {
    title: 'Productos',
    path: '/products',
    icon: icon('ic-cart'),

  },

  {
    title: 'Crear orden',
    path: '/orders',
    icon: icon('ic-glass-buy'),
  },
/*
  {
    title: 'Sign in',
    path: '/sign-in',
    icon: icon('ic-lock'),
  },

  {
    title: 'Not found',
    path: '/404',
    icon: icon('ic-disabled'),
  },
*/
];
