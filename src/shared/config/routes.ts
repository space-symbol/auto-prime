export const DashboardRoutes = {
  details: {
    linkText: 'Товары',
    href: '/dashboard/details',
  },
  orders: {
    linkText: 'Заказы',
    href: '/dashboard/orders',
  },
};

export interface NavbarRoute {
  linkText: string;
  href: string;
  fullPath: string;
  sub?: Record<string, NavbarRoute>;
  parent?: NavbarRoute;
}

interface BaseRoute {
  linkText: string;
  href: string;
  parent?: Route;
}

interface MainSubRoutes {
  sale: NavbarRoute;
  new: NavbarRoute;
  popular: NavbarRoute;
  catalog: NavbarRoute;
}

export interface RawNavbarRoutes {
  [key: string]: NavbarRoute | (NavbarRoute & { sub: MainSubRoutes });
}

// Создаем типизированные NavbarRoutes

interface Route extends BaseRoute {
  sub?: Record<string, Route>;
}

// Функция для создания маршрутов с указанием родителя и полного пути
const rawNavbarRoutes: RawNavbarRoutes = {
  main: {
    linkText: 'Магазин',
    href: '/store/main',
    fullPath: '', // Это поле будет заполняться функцией createRoutes
    sub: {
      sale: {
        linkText: 'Акции и Скидки',
        href: '#sale',
        fullPath: '', // Это поле будет заполняться функцией createRoutes
      },
      new: {
        linkText: 'Новинки',
        href: '#new',
        fullPath: '', // Это поле будет заполняться функцией createRoutes
      },
      popular: {
        linkText: 'Популярное',
        href: '#popular',
        fullPath: '', // Это поле будет заполняться функцией createRoutes
      },
      catalog: {
        linkText: 'Каталог',
        href: '/catalog',
        fullPath: '', // Это поле будет заполняться функцией createRoutes
      },
    },
  },
  // about: {
  //   linkText: 'О нас',
  //   href: '/store/about',
  //   fullPath: '', // Это поле будет заполняться функцией createRoutes
  // },
  // contacts: {
  //   linkText: 'Контакты',
  //   href: '/store/contacts',
  //   fullPath: '', // Это поле будет заполняться функцией createRoutes
  // },
  home: {
    linkText: 'Главная',
    href: '/',
    fullPath: '', // Это поле будет заполняться функцией createRoutes
  },
};

// Функция для создания маршрутов с указанием родителя и полного пути
const createRoutes = <T extends Record<string, NavbarRoute>>(
  routes: T,
  parent: NavbarRoute | null = null,
  basePath: string = '',
): T => {
  const newRoutes = {} as T;

  for (const key in routes) {
    const route = { ...routes[key], parent };
    route.fullPath = basePath + route.href;
    newRoutes[key] = route;

    if (route.sub) {
      route.sub = createRoutes(route.sub, route, route.fullPath);
    }
  }

  return newRoutes;
};

const NavbarRoutes: RawNavbarRoutes = createRoutes(rawNavbarRoutes);

export const routes = {
  navbarRoutes: NavbarRoutes,
  rawNavbarRoutes: rawNavbarRoutes,
  redirectAfterSignInRoute: '/store/main',
  signInRoute: '/auth/sign-in',
  authRoutes: {
    signIn: '/auth/sign-in',
  },
  dashboardRoutes: DashboardRoutes,
  privateRoutes: [...Object.values(DashboardRoutes).map(({ href }) => href), '/store/profile'],
  apiAuthPrefix: '/api/auth',
};
