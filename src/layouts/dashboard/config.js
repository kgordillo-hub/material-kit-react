import ChartBarIcon from '@heroicons/react/24/solid/ChartBarIcon';
import CogIcon from '@heroicons/react/24/solid/CogIcon';

import UserIcon from '@heroicons/react/24/solid/UserIcon';
import BookOpenIcon from '@heroicons/react/24/solid/BookOpenIcon';
import CodeBracketIcon from '@heroicons/react/24/solid/CodeBracketIcon';
import BookmarkSquareIcon from '@heroicons/react/24/solid/BookmarkSquareIcon';

import UsersIcon from '@heroicons/react/24/solid/UsersIcon';
import XCircleIcon from '@heroicons/react/24/solid/XCircleIcon';
import { SvgIcon } from '@mui/material';

export const items = [
  {
    title: 'Panel principal',
    path: '/',
    icon: (
      <SvgIcon fontSize="small">
        <ChartBarIcon />
      </SvgIcon>
    )
  },
  {
    title: 'Vincular algoritmo',
    path: '/vinculacion',
    icon: (
      <SvgIcon fontSize="small">
        <CodeBracketIcon />
      </SvgIcon>
    )
  },
  {
    title: 'Catálogo general',
    path: '/catalogo',
    icon: (
      <SvgIcon fontSize="small">
        <BookOpenIcon />
      </SvgIcon>
    )
  },
  {
      title: 'Mi catálogo',
      path: '/micatalogo',
      icon: (
        <SvgIcon fontSize="small">
          <BookmarkSquareIcon />
        </SvgIcon>
      )
  },
  {
    title: 'Account',
    path: '/account',
    icon: (
      <SvgIcon fontSize="small">
        <UserIcon />
      </SvgIcon>
    )
  },
  {
    title: 'Settings',
    path: '/settings',
    icon: (
      <SvgIcon fontSize="small">
        <CogIcon />
      </SvgIcon>
    )
  }
];
