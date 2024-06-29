import { Router } from '@vaadin/router';

export const router = new Router(document.querySelector('#outlet'));

router.setRoutes(
  [
    {
      path: '/',
      component: 'home-page',
      action: async () => void (await import('../pages/page')),
    },
    {
      path: '/about',
      component: 'about-page',
      action: async () => void (await import('../pages/about/page')),
    },
  ],
  true
);
