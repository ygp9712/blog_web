import { UrlObject } from 'url'


type routeType = {
    id: string,
    title: String,
    url: UrlObject
}

const navRoutes: routeType[] = [
    {
        id: '99',
        title: 'home',
        url: {
            pathname: '/home',
            query: { name: 'test' },
          }
    },
    {
        id: '1',
        title: 'my',
        url: {
            pathname: '/my',
            query: { name: 'test' },
          }
    },
    {
        id: '2',
        title: 'BLOG',
        url: {
            pathname: '/blog',
            query: { name: 'test' },
        }
    },
    {
        id: '3',
        title: 'contact',
        url: {
            pathname: '/contact',
            query: { name: 'ygp' },
        }
    },
    {
        id: '4',
        title: 'dashboard',
        url: {
            pathname: '/dashboard',
        }
    },
]

export {
    navRoutes
}

export type {
    routeType
};