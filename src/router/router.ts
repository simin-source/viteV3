import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';

import VuexCase from '@/pages/bigfile/vuexCase.vue';
import Home from '@/pages/home/Home';
import HooksCase from '@/pages/hooksCase/hooksCase';
import Login from '@/pages/login/login';
import SetupCase from '@/pages/setupCase/setupCase';
import ToPackage from '@/pages/toPackage/toPackage';
import WatchCase from '@/pages/watchCase/watchCase';

//一级菜单
const routes = [{
    path: '/',
    redirect: '/login',
}, {
    path: '/login',
    name: 'login',
    component: Login,
    meta: { title: '登陆页' },
},
];

export const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

const hostRoute = {
    path: '/host',
    name: 'host',
    component: Home,
    children: [{
        path: '/toPackage',
        name: 'toPackage',
        component: ToPackage,
        meta: { title: '打包' },
        children: [{
            path: '/fengxian',
            name: 'fengxian',
            component: ToPackage,
            meta: { title: '丰县' },
        }, {
            path: '/biovillage',
            name: 'biovillage',
            component: ToPackage,
            meta: { title: '康辉后台' },
        }],
    }, {
        path: '/setupCase',
        name: 'setupCase',
        component: SetupCase,
        meta: { title: '组合式开发' },
    }, {
        path: '/watchCase',
        name: 'watchCase',
        component: WatchCase,
        meta: { title: 'watch不同写法' },
    }, {
        path: '/hooks',
        name: 'hooks',
        component: HooksCase,
        meta: { title: 'hooks练习' },
    }, {
        path: '/bigfile',
        name: 'bigfile',
        component: VuexCase,
        meta: { title: '大文件' },
    }],
} as RouteRecordRaw;

const visitorRoute = {
    path: '/visitor',
    name: 'visitor',
    component: Home,
    children: [{
        path: '/toPackage',
        name: 'toPackage',
        component: ToPackage,
        meta: { title: '打包' },
        children: [{
            path: '/fengxian',
            name: 'fengxian',
            component: ToPackage,
            meta: { title: '丰县' },
        }, {
            path: '/biovillage',
            name: 'biovillage',
            component: ToPackage,
            meta: { title: '康辉后台' },
        }],
    }],
} as RouteRecordRaw;

export function routerFactory(role: string) {
    switch (role) {
        case '主人':
            return {
                name: 'host',
                route: hostRoute,
            };
        case '游客':
            return {
                name: 'visitor',
                route: visitorRoute,
            };
        default:
            return {
                name: '',
                route: hostRoute,
            };
    }
}