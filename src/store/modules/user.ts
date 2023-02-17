/*
 * @Author: June
 * @Description:
 * @Date: 2023-01-17 13:20:38
 * @LastEditors: June
 * @LastEditTime: 2023-02-17 21:01:56
 */
import { defineStore } from 'pinia';
import { userLogin, userRegister } from '@/apis/user';
import { ElMessage, ElNotification, ElLoading } from 'element-plus';
import router from '@/router';
import {
    setAuthToken,
    getAuthToken,
    setAuthUserInfo,
    getAuthUserInfo,
} from '@/utils/auth';

const useUser = defineStore({
    id: 'user', // id必填，且需要唯一
    state: () => {
        return {
            token: getAuthToken(),
            userInfo: getAuthUserInfo(),
        };
    },
    actions: {
        async doLogin(loginForm: any) {
            const loadingInstance = ElLoading.service({ fullscreen: true })
            try {
                const { status, message, userInfo, token } = await userLogin(
                    loginForm,
                );
                if (status === '10000') {
                    ElNotification({
                        title: '登陆成功',
                        message: '快去体验可视化给构建商城吧！',
                        type: 'success',
                    });
                    this.userInfo = userInfo;
                    this.token = token;
                    setAuthToken(token);
                    setAuthUserInfo(userInfo);
                    router.push({
                        path: '/home',
                    });
                } else {
                    return ElMessage.error(message);
                }
                loadingInstance.close()
            } catch (error) {
                loadingInstance.close()
            }
        },
        async doRegister(registerForm: any, cb: any) {
            const loadingInstance = ElLoading.service({ fullscreen: true })
            try {
                const { status, message } = await userRegister(registerForm);
                if (status === '10000') {
                    ElNotification({
                        title: '注册成功',
                        message: '账户已注册成功，快去登录使用吧',
                        type: 'success',
                    });
                    cb && typeof cb === 'function' && cb();
                } else {
                    return ElMessage.error(message);
                }
                loadingInstance.close()
            } catch (error) {
                loadingInstance.close()
            }
        },

        doLogout() {
            this.token = null;
            this.userInfo = null;
            sessionStorage.clear();
            localStorage.clear();
        },
    },
});

export default useUser;
