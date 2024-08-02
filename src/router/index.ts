import { UrlObject } from 'url'


type routeType = {
    id: string,
    title: String,
    url: UrlObject
}

const navRoutes: routeType[] = [
    // {
    //     id: '99',
    //     title: 'home',
    //     url: {
    //         pathname: '/home',
    //         query: { name: 'test' },
    //       }
    // },
    {
        id: '1',
        title: '主页',
        url: {
            pathname: '/blog'
        }
    },
    {
        id: '2',
        title: '作品',
        url: {
            pathname: '/work',
        }
    },
    {
        id: '3',
        title: '关于',
        url: {
            pathname: '/my'
          }
    },
    
    // {
    //     id: '3',
    //     title: 'contact',
    //     url: {
    //         pathname: '/contact',
    //         query: { name: 'ygp' },
    //     }
    // },
    
]

export {
    navRoutes
}

export type {
    routeType
};