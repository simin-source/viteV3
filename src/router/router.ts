import { createRouter, createWebHashHistory, createWebHistory, Router, RouteRecordRaw } from 'vue-router';

import AntDesign from '@/pages/antDesign/antDesign';
import VuexCase from '@/pages/bigfile/vuexCase.vue';
import Home from '@/pages/home/Home';
import HooksCase from '@/pages/hooksCase/hooksCase';
import Login from '@/pages/login/login';
import SetupCase from '@/pages/setupCase/setupCase';
import ToPackage from '@/pages/toPackage/toPackage';
import WatchCase from '@/pages/watchCase/watchCase';
import { userManager } from '@/store/user';

//一级菜单
export const routes = [{
    path: '/',
    redirect: '/login',
}, {
    path: '/login',
    name: 'login',
    component: Login,
    meta: { title: '登陆页' },
},
    // 404 page must be placed at the end !!! 
    // {
    //     path: '*',
    //     redirect: '/404',
    //     hidden: true,
    // }
];

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
        meta: { title: '自定义hook' },
    }, {
        path: '/bigfile',
        name: 'bigfile',
        component: VuexCase,
        meta: { title: '大文件' },
    }, {
        path: '/antd',
        name: 'antd',
        component: AntDesign,
        meta: { title: 'antd组件库' },
    } ],
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

export function routerFactory(role: number) {
    switch (role) {
        case 1:
            return {
                name: 'host',
                route: hostRoute,
            };
        case 2:
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

export let router = createRouter({
    history: createWebHashHistory(),
    // history: createWebHistory(),
    routes,
});

export function resetRouter() {
    /**
     * vue2中 router.matcher = newRouter.matcher可以实现路由还原效果
     * 但vue3中 删除 router.match 改为 router.resolve
     */
    // const newRouter: any = createRouter({
    //     history: createWebHashHistory(),
    //     routes,
    // });
    // router.matcher = newRouter.matcher;

    /**
     * vue3中 遍历删除 router.removeRoute('name')
     */
    router.getRoutes().forEach((route: any) => {
        if (route.name && route.name !== 'login') {
            router.removeRoute(route.name);
        }
    });
}

router.beforeEach((to, from, next) => {
    if (sessionStorage.getItem('roleID') && !userManager.isAddRoutes) {
        const routerObj = routerFactory(Number(sessionStorage.getItem('roleID')));
        router.addRoute(routerObj.route); //本质上调用了 matcher 的 addRoutes 方法
        if (routerObj.route.children) userManager.applyActions = routerObj.route.children;
        userManager.isAddRoutes = true;
        next({ ...to, replace: true }); //replace: true只是一个设置信息，告诉VUE本次操作后，不能通过浏览器后退按钮
    } else {
        next(); //表示当前导航守卫放行
    }
});