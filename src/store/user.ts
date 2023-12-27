import { resetRouter, router, routerFactory } from '@/router/router';
import { UserType } from '@/types';

class UserManager {
    roleList: Array<{ value: number; label: string }> = [{
        value: 1, label: '主人',
    }, {
        value: 2, label: '游客',
    }];
    applyActions: any[] = []; //（1）从后端获取更安全，（2）前端从工厂模式获取
    userInfo: UserType = {
        avatarImg: '@/assets/userTemp.jpeg',
        roleId: 0,
    };
    isAddRoutes = false;

    login(roleId: number) {
        resetRouter();
        sessionStorage.setItem('roleID', `${roleId}`);
        const routerObj = routerFactory(roleId);
        console.log('工厂',routerObj.route);
        this.isAddRoutes = true;
        if (routerObj.route.children) this.applyActions = routerObj.route.children;
        router.push({ name: routerObj.name });
    }

    logout() {
        sessionStorage.removeItem('roleID');
        router.push({ name: '' });
        resetRouter();
    }
}

export const userManager = new UserManager();